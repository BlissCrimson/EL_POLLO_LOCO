class ChickenBoss extends MovableObject {
    y = 30;
    width = 275;
    height = 425;
    IMAGES_WALKING = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    currentImage = 0;
    hasSpottedCharacter = false;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 400 + (719 * 2);
        // this.y = 460 - this.height;
        this.animate();
        this.deadSound = soundManager.registerSound('assets/audio/boss-dead.mp3');
        this.alertSound = soundManager.registerSound('assets/audio/boss-alert.mp3');
    }

    animate() {

        this.renderImages();
    }

    attack() {

    }

    alert() {

    }

    moveLeft() {
        this.otherDirection = false;
        this.x -= this.speed;
    }

    hit() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    renderImages() {
        setInterval(() => {
            if (!this.world) {
                return;
            } if (this.isDying) {
                return;
            } if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.isDying = true;
                setTimeout(() => {
                    let index = this.world.level.enemies.indexOf(this);
                    this.world.level.enemies.splice(index, 1);
                }, 600);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.hasSpottedCharacter) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.world.character.x >= this.x - 350) {
                this.hasSpottedCharacter = true;
            } else if (this.world.character.x >= this.x - 500) {
                this.moveLeft();    // walk to this.y = 1838

                this.playAnimation(this.IMAGES_WALKING);
            }
            // else if (condition) {
            //     this.playAnimation(this.IMAGES_ATTACK)
            // } 
        }, 6000 / 60);
    }
}