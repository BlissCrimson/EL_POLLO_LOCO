class MovableObject extends DrawableObject {
    speed = 1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;
    isDying = false;
    offset = {
        top: 5,
        bottom: 5,
        left: 5,
        right: 5
    };

    /**
     * 
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    /**
     * 
     * @returns 
     */
    isAboveGround() {
        if (this.isDying) {
            return true;
        } else {
            if ((this instanceof ThrowableObject)) {
                return true;
            } else {
                return this.y < 215;
            }
        }
    }

    /**
     * 
     * @param {*} ctx 
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof ChickenBoss) {
            ctx.beginPath();
            ctx.rect(this.otherDirection ? 0 : this.x, this.y, this.width, this.height);
            ctx.beginPath();
            ctx.rect(
                (this.otherDirection ? 0 : this.x) + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
        }
    }

    /**
     * 
     * @param {*} mo 
     * @returns 
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * 
     */
    hit() {
        this.energy -= 10
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * 
     * @returns 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * 
     * @returns 
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * 
     */
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

    /**
     * 
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * 
     * @param {*} images 
     */
    characterDead(images) {
        let i = this.currentImage % images.length
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * 
     */
    kill() {
        this.energy = 0;
    }
}