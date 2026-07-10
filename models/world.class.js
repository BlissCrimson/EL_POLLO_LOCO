class World {
    character = new Character();

    statusbar = [
        new StatusHealth(),
        new StatusBottles(),
        new StatusCoins()
    ];
    statusBoss = new StatusBoss();
    bossVisible = false;
    throwableObjects = [new ThrowableObject(this.character.x, this.character.y)]
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    camera_y = 0;
    canThrow = true;
    isCollidingWithCharacter = false;
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

    setWorld() {
        this.character.world = this;
        this.character.animate();
        this.level.enemies.forEach(e => {
            e.world = this;
        })
    }

    run() {
        this.runInterval = setInterval(() => {
            if (this.paused) return;
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBossVisible();
            this.checkGameOver();  // neu
            this.checkWin();
        }, 1000 / 60);
    }

    stopGame() {
        clearInterval(this.runInterval);
        clearInterval(this.character.animateInterval);
        clearInterval(this.character.renderInterval);
        this.stopped = true;
    }

    pauseGame() {
        if (this.stopped) return;
        this.paused = true;
    }

    resumeGame() {
        if (this.stopped) return;
        this.paused = false;
        this.draw();
    }

    draw() {
        if (this.stopped || this.paused) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects.
        this.addObjectsToMap(this.statusbar)
        if (this.bossVisible) {
            this.addToMap(this.statusBoss);
        }
        this.ctx.translate(this.camera_x, 0);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects)

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();

        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

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

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.x + mo.width, 0);
        this.ctx.scale(-1, 1);
    }

    flipImageBack(mo) {
        this.ctx.restore();
    }

    checkCollisions() {
        this.bottlesCollision();
        this.coinCollision();
        this.characterCollision();

    }

    characterCollision() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDying) return;
            if (this.character.isColliding(enemy)) {
                // Jump-Kill
                if (this.character.y + this.character.height < enemy.y + enemy.height / 2 &&
                    !(enemy instanceof ChickenBoss)) {
                    enemy.jumpHit();
                    this.character.speedY = 15;
                }
                // Schaden pro Gegner
                else if (!enemy.lastHitCharacter || new Date().getTime() - enemy.lastHitCharacter > 1000) {
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                    enemy.lastHitCharacter = new Date().getTime();
                }
            }
        });
    }

    bottlesCollision() {
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            const bottle = this.throwableObjects[i];
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    if (enemy instanceof ChickenBoss) {
                        enemy.hit(20);
                        this.statusBoss.setPercentage(enemy.energy);
                    }
                    this.throwableObjects.splice(i, 1);
                }
            })
        }
        this.bottlesUsed();
    }

    bottlesUsed() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                let percentage = ((this.totalBottles - this.level.bottles.length) / this.totalBottles) * 100;
                this.statusbar[1].setPercentage(percentage);
            }
        })
    }

    coinCollision() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                let percentage = ((this.totalCoins - this.level.coins.length) / this.totalCoins) * 100;
                this.statusbar[2].setPercentage(percentage);
            }
        })
    }

    checkThrowObjects() {
        if (this.keyboard.Space || this.keyboard.S) {
            if (this.canThrow) {
                let bottle = new ThrowableObject(this.character.x, this.character.y)
                this.throwableObjects.push(bottle);
                this.canThrow = false;
                setTimeout(() => {
                    this.canThrow = true;
                }, 500);
            }
        }
    }

    checkBossVisible() {
        if (this.boss && this.boss.hasSpottedCharacter) {
            this.bossVisible = true;
        }
    }

    checkGameOver() {
        if (this.character.isDead() && !this.gameOverTriggered) {
            this.gameOverTriggered = true;
            setTimeout(() => {
                this.stopGame();
                showEndscreen('lose')
            }, 1500);  // nach Todanimation
        }
    }

    checkWin() {
        if (this.boss.isDead()) {
            this.stopGame();
            setTimeout(() => showEndscreen('win'), 1500);  // nach Sieganimation
        }
    }
}