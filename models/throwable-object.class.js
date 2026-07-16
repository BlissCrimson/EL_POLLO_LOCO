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
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_BOTTLE_ROTATION[0]);
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = 100;
        this.y = 100;
        this.height = 50;
        this.width = 60;
        this.throw(x, y);
    }

    throw(x, y) {
        this.x = x;
        this.y = y;
        this.speedY = 10;
        this.applyGravity();
        this.flightInterval = setInterval(() => {
            if (this.isSplashing) return;
            if (this.y >= this.GROUND_Y) {
                this.splash();
                return;
            }
            this.x += 17;
        }, 40);
        this.animationInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 60);
    }

    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
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

    stopThrow() {
        clearInterval(this.flightInterval);
        clearInterval(this.animationInterval);
        clearInterval(this.gravityInterval);
    }
}