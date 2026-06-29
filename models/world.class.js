class World {
    character = new Character();

    level = level1;

    statusbar = [
        new StatusHealth(),
        new StatusBottles(),
        new StatusCoins()
    ];
    throwableObjects = [new ThrowableObject(this.character.x, this.character.y)]
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    camera_y = 0;
    canThrow = true;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
        this.character.animate();
        this.level.enemies.forEach(e => {
            e.world = this;
        })
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
        }, 1000 / 60)
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // Space for fixed objects.
        this.addObjectsToMap(this.statusbar)
        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
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
                    } else {
                        enemy.hit(100);
                    }
                    this.throwableObjects.splice(i, 1);
                }
            })
        }

        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.statusbar[0].setPercentage(this.character.energy);
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
}