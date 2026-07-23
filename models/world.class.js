/**
 * The game world: owns the character, level, status bars and the main
 * game loop (updates, collisions, drawing).
 */
class World {
    character = new Character();

    statusbar = [
        new StatusHealth(),
        new StatusBottles(),
        new StatusCoins()
    ];
    statusBoss = new StatusBoss();
    bossVisible = false;
    throwableObjects = [];
    bottles = 0;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    camera_y = 0;
    canThrow = true;

    /**
     * Sets up the canvas, keyboard and level, then starts drawing and
     * the game loop.
     * @param {HTMLCanvasElement} canvas - The game canvas.
     * @param {Keyboard} keyboard - The keyboard state object.
     * @param {Level} level - The level to play.
     */
    constructor(canvas, keyboard, level) {
        this.level = level;
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.totalBottles = this.level.bottles.length;
        this.totalCoins = this.level.coins.length;
        this.boss = this.level.enemies.find(e => e instanceof ChickenBoss);
    }

    /**
     * Gives the character and all enemies a reference back to this world,
     * then starts the character's animation.
     */
    setWorld() {
        this.character.world = this;
        this.character.animate();
        this.level.enemies.forEach(e => {
            e.world = this;
        })
    }

    /**
     * Starts the main game loop: collisions, throwing, boss visibility,
     * win/lose checks and bottle cleanup, 60 times per second.
     */
    run() {
        this.runInterval = setInterval(() => {
            if (this.paused) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBossVisible();
            this.checkGameOver();
            this.checkWin();
            this.cleanupBottles();
        }, 1000 / 60);
    }

    /**
     * Stops the game loop and all character animation intervals.
     */
    stopGame() {
        clearInterval(this.runInterval);
        clearInterval(this.character.animateInterval);
        clearInterval(this.character.renderInterval);
        this.stopped = true;
    }

    /**
     * Pauses the game (has no effect if the game is already stopped).
     */
    pauseGame() {
        if (this.stopped) return;
        this.paused = true;
    }

    /**
     * Resumes the game after a pause and restarts drawing.
     */
    resumeGame() {
        if (this.stopped) return;
        this.paused = false;
        this.draw();
    }

    /**
     * Draws one frame: background, status bars and foreground, then
     * schedules the next frame.
     */
    draw() {
        if (this.stopped || this.paused) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawBackgroundLayer();
        this.drawStatusBars();
        this.drawForegroundLayer();
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws the background layers and clouds, shifted by the camera.
     */
    drawBackgroundLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the fixed status bars and the boss bar, if visible.
     */
    drawStatusBars() {
        // Space for fixed objects.
        this.addObjectsToMap(this.statusbar);
        if (this.bossVisible) {
            this.addToMap(this.statusBoss);
        }
    }

    /**
     * Draws the character, bottles, coins, enemies and thrown objects,
     * shifted by the camera.
     */
    drawForegroundLayer() {
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws a list of objects onto the canvas.
     * @param {DrawableObject[]} objects - Objects to draw.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object, flipping it horizontally if it faces the
     * other direction.
     * @param {DrawableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the canvas horizontally around the given object, for drawing
     * it facing the other direction.
     * @param {MovableObject} mo - The object to flip around.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width, 0);
        this.ctx.scale(-1, 1);
    }

    /**
     * Restores the canvas state saved by flipImage.
     * @param {MovableObject} mo - The object that was flipped.
     */
    flipImageBack(mo) {
        this.ctx.restore();
    }

    /**
     * Runs all collision checks for this frame.
     */
    checkCollisions() {
        this.bottlesUsed();
        this.bottlesCollision();
        this.coinCollision();
        this.characterCollision();
    }

    /**
     * Checks collisions between the character and enemies that are
     * still alive.
     */
    characterCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDying || enemy.isDead()) return;
            if (this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
            }
        });
    }

    /**
     * Kills the enemy on a jump-kill, otherwise damages the character
     * (with a 1 second hit cooldown per enemy).
     * @param {MovableObject} enemy - The enemy the character collided with.
     */
    handleCharacterEnemyCollision(enemy) {
        const isJumpKill = this.character.speedY < 0 &&
            this.character.y + this.character.height < enemy.y + enemy.height * 0.7 &&
            !(enemy instanceof ChickenBoss);
        if (isJumpKill) {
            enemy.kill();
            this.character.speedY = 15;
        } else if (!enemy.lastHitCharacter || new Date().getTime() - enemy.lastHitCharacter > 1000) {
            this.character.hit();
            this.statusbar[0].setPercentage(this.character.energy);
            enemy.lastHitCharacter = new Date().getTime();
        }
    }

    /**
     * Checks collisions between thrown bottles and enemies: damages the
     * boss or kills a normal enemy outright, then splashes the bottle.
     */
    bottlesCollision() {
        this.throwableObjects.forEach((bottle) => {
            if (bottle.isSplashing) return;
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof ChickenBoss) {
                        enemy.hit();
                        this.statusBoss.setPercentage(enemy.energy);
                    } else if (!enemy.isDead() && !enemy.isDying) {
                        enemy.kill();
                    }
                    bottle.splash();
                }
            });
        });
    }

    /**
     * Removes thrown bottles whose splash animation has finished.
     */
    cleanupBottles() {
        this.throwableObjects = this.throwableObjects.filter(b => !b.splashDone);
    }

    /**
     * Checks whether the character picked up a bottle on the ground and
     * updates the bottle status bar.
     */
    bottlesUsed() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                this.bottles++;
                let percentage = (this.bottles / this.totalBottles) * 100;
                this.statusbar[1].setPercentage(percentage);
            }
        })
    }

    /**
     * Checks whether the character picked up a coin and updates the
     * coin status bar.
     */
    coinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                let percentage = ((this.totalCoins - this.level.coins.length) / this.totalCoins) * 100;
                this.statusbar[2].setPercentage(percentage);
            }
        })
    }

    /**
     * Throws a bottle when the throw key is pressed and bottles are
     * available, with a cooldown between throws.
     */
    checkThrowObjects() {
        if ((this.keyboard.Space || this.keyboard.S) && this.bottles > 0) {
            if (this.canThrow) {
                let bottle = new ThrowableObject(this.character.x, this.character.y);
                this.throwableObjects.push(bottle);
                this.bottles--;
                let percentage = (this.bottles / this.totalBottles) * 100;
                this.statusbar[1].setPercentage(percentage);
                this.canThrow = false;
                setTimeout(() => {
                    this.canThrow = true;
                }, 500);
            }
        }
    }

    /**
     * Makes the boss status bar visible once the boss has spotted the
     * character.
     */
    checkBossVisible() {
        if (this.boss && this.boss.hasSpottedCharacter) {
            this.bossVisible = true;
        }
    }

    /**
     * Shows the lose screen once the character has died.
     */
    checkGameOver() {
        if (this.character.isDead() && !this.gameOverTriggered) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                this.stopGame();
                showEndscreen('lose')
            }, 1500);
        }
    }

    /**
     * Shows the win screen once the boss has died.
     */
    checkWin() {
        if (this.boss.isDead() && !this.winTriggered) {
            this.winTriggered = true;
            setTimeout(() => {
                this.stopGame();
                showEndscreen('win');
            }, 1500);
        }
    }
}