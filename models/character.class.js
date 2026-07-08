class Character extends MovableObject {
    x = 64;
    y = 80;
    width = 112;
    height = 220;
    speed = 5;
    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_IDLE = [
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-1.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-2.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-3.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-4.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-5.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-6.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-7.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-8.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-9.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/idle/I-10.png'
    ]
    IMAGES_LONG_IDLE = [
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-11.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-12.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-13.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-14.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-15.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-16.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-17.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-18.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-19.png',
        'docs/img_pollo_locco/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    currentImage = 0;
    world;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.playAnimation(this.IMAGES_WALKING);
        this.walkingSound = soundManager.registerSound('assets/audio/walking.mp3');
        this.jumpSound = soundManager.registerSound('assets/audio/jump.mp3');
        this.hurtSound = soundManager.registerSound('assets/audio/ouch.mp3');
        this.gameOverSound = soundManager.registerSound('assets/audio/game-over.mp3');
        this.jumpSoundPlayed = false;
        this.hurtSoundPlayed = false;
        this.walkingSound.loop = true;
        this.lastMovementTime = new Date().getTime();
    }

    animate() {

        this.animateInterval = setInterval(() => {
            if (this.isDead()) {
                this.walkingSound.pause();
                this.walkingSound.currentTime = 0;
                return;
            } else {
                if (this.world.keyboard.RIGHT || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.walkingSound.play();
                    this.lastMovementTime = new Date().getTime();
                }
                if (this.world.keyboard.LEFT || this.world.keyboard.A && this.x > 0) {
                    this.moveLeft();
                    this.walkingSound.play();
                    this.lastMovementTime = new Date().getTime();
                }
                if (!this.world.keyboard.RIGHT && !this.world.keyboard.D && !this.world.keyboard.LEFT && !this.world.keyboard.A) {
                    this.walkingSound.pause();
                    this.walkingSound.currentTime = 0;
                }
                if (this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.W && !this.isAboveGround()) {
                    this.jump();
                    this.lastMovementTime = new Date().getTime();
                }
            }
            // this.attack();

            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        this.renderInterval = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);

                if (!this.isDying) {
                    // TODO: speedY vielleicht erhöhen
                    this.speedY = 10;
                    this.isDying = true;
                    this.gameOverSound.play();
                }
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    showEndscreen('lose');
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurt();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {
                this.hurtSoundPlayed = false;
                this.jumpSoundPlayed = false;
                if (this.world.keyboard.RIGHT || this.world.keyboard.D || this.world.keyboard.LEFT || this.world.keyboard.A) {
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    if (this.isSleeping()) {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                    }
                }
            }
        }, 6000 / 60)
    }

    jump() {
        this.speedY = 30;
        if (!this.jumpSoundPlayed) {
            this.jumpSound.play();
            this.jumpSoundPlayed = true;
        }
    }

    hurt() {
        if (!this.hurtSoundPlayed) {
            this.hurtSound.play();
            this.hurtSoundPlayed = true;
        }
    }

    isSleeping() {
        let timepassed = new Date().getTime() - this.lastMovementTime;
        return timepassed > 15000;

    }
}