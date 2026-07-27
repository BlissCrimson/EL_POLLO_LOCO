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
     * Continuously pulls the object down by gravity unless it is on the ground.
     */
    applyGravity() {
        this.gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (!(this instanceof ThrowableObject) && !this.isDying && this.y >= 215 && this.speedY <= 0) {
                    this.y = 215;
                    this.speedY = 0;
                }
            }
        }, 1000 / 25);
    }

    /**
     * Checks whether the object is currently airborne.
     * @returns {boolean} True if the object is above ground, dying or a thrown object.
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
     * Draws the collision hitbox outline for characters and enemies (debug only).
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context to draw on.
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
     * Checks whether this object's hitbox overlaps another's, accounting
     * for each object's offset.
     * @param {MovableObject} mo - The other movable object to check against.
     * @returns {boolean} True if the two hitboxes overlap.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    /**
     * Reduces energy by the given amount and records the hit time,
     * used to trigger the hurt animation.
     * @param {number} [amount=10] - How much energy to remove.
     */
    hit(amount = 10) {
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks whether the object's energy has reached zero.
     * @returns {boolean} True if energy is 0.
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks whether the object was hit within the last second.
     * @returns {boolean} True if less than 1 second passed since the last hit.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;
    }

    /**
     * Moves the object to the right by its speed.
     */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
     * Plays the next frame of a looping animation from the image cache.
     * @param {string[]} images - Image paths of the animation sequence.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the left by its speed.
     */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
     * Instantly sets energy to 0, killing the object immediately.
     */
    kill() {
        this.energy = 0;
    }
}