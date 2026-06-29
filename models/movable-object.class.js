class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isDying = false;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if ((this instanceof ThrowableObject)) {
            return true;
        } else {
            return this.y < 215;
        }
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof ChickenBoss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.otherDirection ? 0 : this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
                return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }

    hit() {
        this.energy -= 10
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isDead() {
        return this.energy == 0;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Differenz in ms
        timepassed = timepassed / 1000; //Differenz in s
        return timepassed < 1;
    }

    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * 
     * @param {string} images 
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }
    characterDead(images) {
        let i = this.currentImage % images.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }
}