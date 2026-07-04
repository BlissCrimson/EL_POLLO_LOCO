class World {
    character = new Character();

    level = level1;

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
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.totalBottles = this.level.bottles.length;
        this.totalCoins = this.level.coins.length;
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
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBossVisible();
            this.checkGameOver();  // neu
        }, 1000 / 60);
    }
    // run() {
    //     setInterval(() => {
    //         this.checkCollisions();
    //         this.checkThrowObjects();
    //         this.checkBossVisible();
    //     }, 1000 / 60)
    // }
    stopGame() {
        clearInterval(this.runInterval);
        clearInterval(this.character.animateInterval);
        clearInterval(this.character.renderInterval);
        this.stopped = true;
    }

    draw() {
        if (this.stopped) return;
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
        for (let i = this.throwableObjects.length - 1; i >= 0; i--) {
            const bottle = this.throwableObjects[i];
            this.level.enemies.forEach((enemy) => {
                if (bottle.isColliding(enemy)) {
                    console.log('Flasche x:', bottle.x, 'Boss x:', enemy.x);
                    console.log('Treffer!', enemy);
                    if (enemy instanceof ChickenBoss) {
                        enemy.hit(20);
                        this.statusBoss.setPercentage(enemy.energy);
                    } else {
                        enemy.hit(100);
                    }
                    this.throwableObjects.splice(i, 1);
                }
            })
        }
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(index, 1);
                let percentage = ((this.totalBottles - this.level.bottles.length) / this.totalBottles) * 100;
                this.statusbar[1].setPercentage(percentage);
            }
        })
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin)) {
                this.level.coins.splice(index, 1);
                let percentage = ((this.totalCoins - this.level.coins.length) / this.totalCoins) * 100;
                this.statusbar[2].setPercentage(percentage);
            }
        })
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (!enemy.isCollidingWithCharacter) {
                    this.character.hit();
                    this.statusbar[0].setPercentage(this.character.energy);
                    this.isCollidingWithCharacter = true;
                }
            } else {
                enemy.isCollidingWithCharacter = false;
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
        const boss = this.level.enemies.find(e => e instanceof ChickenBoss);
        if (boss && boss.hasSpottedCharacter) {
            this.bossVisible = true;
        }
    }

    checkGameOver() {
        if (this.character.isDead()) {
            this.stopGame();
            setTimeout(() => showEndscreen(), 1500);  // nach Todanimation
        }
    }
}