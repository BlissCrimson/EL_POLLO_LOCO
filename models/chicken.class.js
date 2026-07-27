/**
 * A normal chicken enemy that walks left and dies when hit from above.
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    y = 380;
    width = 70;
    height = 69;
    IMAGES_WALKING = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentImage = 0;

    /**
     * Spawns the chicken at a random x position with a random speed
     * and starts its animation.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 400 + Math.random() * 400;
        this.y = 430 - this.height;
        this.speed = 0.15 + Math.random() * 0.25;
        this.animate();
        this.deadSound = soundManager.registerSound('assets/audio/chicken-dead.mp3');
    }

    /**
     * Starts the movement loop and the animation render loop.
     */
    animate() {
        this.walk();
        this.renderImages();
    }

    /**
     * Moves the chicken to the left as long as it is not dying.
     */
    walk() {
        setInterval(() => {
            if (this.world?.paused) return;
            if (this.isDying) {
                return;
            } this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    /**
     * Plays the death animation once dead, otherwise the walking animation.
     */
    renderImages() {
        setInterval(() => {
            if (this.world?.paused || this.isDying) return;
            if (this.isDead()) {
                this.handleDeath();
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 6000 / 60);
    }

    /**
     * Plays the death sound and removes the chicken from the level
     * shortly after the death animation starts.
     */
    handleDeath() {
        this.playAnimation(this.IMAGES_DEAD);
        this.isDying = true;
        this.deadSound.play();
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            this.world.level.enemies.splice(index, 1);
        }, 600);
    }
}