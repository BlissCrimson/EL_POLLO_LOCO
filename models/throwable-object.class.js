/**
 * A thrown salsa bottle. Flies in an arc, rotates mid-air and splashes
 * on impact with the ground or an enemy.
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    GROUND_Y = 380;
    IMAGES_BOTTLE_ROTATION = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ]
    IMAGES_BOTTLE_SPLASH = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    RANGE = 200;

    /**
     * Loads all images, registers the break sound and starts the throw.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.height = 50;
        this.width = 60;
        this.breakSound = soundManager.registerSound('assets/audio/bottle-break.mp3');
        this.throw(x, y);
    }

    /**
     * Sets the bottle's start position, applies gravity and starts the
     * horizontal flight and rotation animation.
     * @param {number} x - Starting x position.
     * @param {number} y - Starting y position.
     */
    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 16;
        const ticks = this.calculateFlightTicks(y);
        this.stepX = this.RANGE / ticks;
        this.applyGravity();
        this.startFlight();
        this.startRotationAnimation();
    }

    /**
     * Moves the bottle to the right each frame and triggers the splash
     * once it reaches ground level.
     */
    startFlight() {
        this.flightInterval = setInterval(() => {
            if (this.isSplashing) return;
            if (this.y >= this.GROUND_Y) {
                this.splash();
                return;
            }
            this.x += this.stepX;
        }, 40);
    }

    /**
     * Plays the bottle's rotation animation while it is flying.
     */
    startRotationAnimation() {
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 60);
    }

    /**
     * Plays the splash sound and animation, then marks the bottle as
     * done once it finishes.
     */
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.breakSound.play();
        this.stopThrow();
        this.currentImage = 0;
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            if (this.currentImage >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(this.splashInterval);
                this.splashDone = true;
            }
        }, 50);
    }

    /**
     * Stops all running intervals (flight, rotation, gravity) for this bottle.
     */
    stopThrow() {
        clearInterval(this.flightInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
    }

    /**
     * 
     * @param {*} startY 
     * @returns 
     */
    calculateFlightTicks(startY) {
        const a = this.acceleration;
        const v0 = this.speedY;
        const drop = this.GROUND_Y - startY;
        return (v0 + Math.sqrt(v0 * v0 + 2 * a * drop)) / a;
    }
}