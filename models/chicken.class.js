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
    // TODO folgendes function musst add:
    // [ ] function walk()
    // [ ] function eat()

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

    animate() {
        this.walk();
        this.renderImages();
    }

    walk() {
        setInterval(() => {
            if (this.world?.paused) return;
            if (this.isDying) {
                return;
            } this.moveLeft();
            this.otherDirection = false;
        }, 1000 / 60);
    }

    eat() {

    }

    renderImages() {
        setInterval(() => {
            if (this.world?.paused) return;
            if (this.isDying) {
                return;
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.isDying = true;
                this.deadSound.play();
                setTimeout(() => {
                    let index = this.world.level.enemies.indexOf(this);
                    this.world.level.enemies.splice(index, 1);
                }, 600);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 6000 / 60);
    }
}