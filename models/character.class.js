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
    IMAGES_JUMPING_START = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png'
    ];
    IMAGES_JUMPING_HIGH = [
        'assets/img/2_character_pepe/3_jump/J-35.png'
    ];
    IMAGES_JUMPING_END = [
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
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ]
    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]
    currentImage = 0;
    world;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_START);
        this.loadImages(this.IMAGES_JUMPING_HIGH);
        this.loadImages(this.IMAGES_JUMPING_END);
        // this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.applyGravity();
        this.playAnimation(this.IMAGES_WALKING);
        this.walkingSound = soundManager.registerSound('assets/audio/walking.mp3');
        this.jumpSound = soundManager.registerSound('assets/audio/jump.mp3');
        this.hurtSound = soundManager.registerSound('assets/audio/ouch.mp3');
        this.snoringSound = soundManager.registerSound('assets/audio/snoring.mp3');
        this.gameOverSound = soundManager.registerSound('assets/audio/game-over.mp3');
        this.jumpSoundPlayed = false;
        this.hurtSoundPlayed = false;
        this.walkingSound.loop = true;
        this.snoringSound.loop = true;
        this.lastMovementTime = new Date().getTime();
        this.jumpPhase = 'start';
    }

    animate() {

        this.animateInterval = setInterval(() => {
            if (this.world.paused) return;
            if (this.isDead()) {
                this.walkingSound.pause();
                this.walkingSound.currentTime = 0;
                return;
            } else {
                if (this.world.boss?.introWalking) {
                    this.walkingSound.pause();
                    this.walkingSound.currentTime = 0;
                } else {
                    if ((this.world.keyboard.RIGHT || this.world.keyboard.D) && this.x < this.world.level.level_end_x) {
                        this.moveRight();
                        this.walkingSound.play();
                        this.lastMovementTime = new Date().getTime();
                    }
                    if ((this.world.keyboard.LEFT || this.world.keyboard.A) && this.x > 0) {
                        this.moveLeft();
                        this.walkingSound.play();
                        this.lastMovementTime = new Date().getTime();
                    }
                    if (!this.world.keyboard.RIGHT && !this.world.keyboard.D && !this.world.keyboard.LEFT && !this.world.keyboard.A) {
                        this.walkingSound.pause();
                        this.walkingSound.currentTime = 0;
                    }
                    if ((this.world.keyboard.UP || this.world.keyboard.SPACE || this.world.keyboard.W) && !this.isAboveGround()) {
                        this.jump();
                        this.lastMovementTime = new Date().getTime();
                    }
                }
            }
            if (!this.world.boss?.hasSpottedCharacter) {
                this.world.camera_x = -this.x + 100;
            }
        }, 1000 / 60);

        this.renderInterval = setInterval(() => {
            if (this.world.paused) return;
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.isDying) {
                    this.speedY = 10;
                    this.isDying = true;
                    this.gameOverSound.play();
                    this.snoringSound.pause();
                    this.snoringSound.currentTime = 0;
                }
                if (this.currentImage >= this.IMAGES_DEAD.length) {
                    showEndscreen('lose');
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                this.hurt();
            } else if (this.isAboveGround()) {
                let newPhase;
                if (this.speedY > 2) {
                    newPhase = 'start';
                } else if (this.speedY < -2) {
                    newPhase = 'end';
                } else {
                    newPhase = 'high';
                }
                if (newPhase !== this.jumpPhase) {
                    this.jumpPhase = newPhase;
                    this.currentImage = 0;
                }
                if (this.jumpPhase === 'start') {
                    this.playJumpAnimation(this.IMAGES_JUMPING_START);
                } else if (this.jumpPhase === 'high') {
                    this.playJumpAnimation(this.IMAGES_JUMPING_HIGH);
                } else {
                    this.playJumpAnimation(this.IMAGES_JUMPING_END);
                }
            } else {
                this.hurtSoundPlayed = false;
                this.jumpSoundPlayed = false;
                if (!this.world.boss?.introWalking && (this.world.keyboard.RIGHT || this.world.keyboard.D || this.world.keyboard.LEFT || this.world.keyboard.A)) {
                    this.playAnimation(this.IMAGES_WALKING);
                    this.snoringSound.pause();
                    this.snoringSound.currentTime = 0;
                } else {
                    if (this.isSleeping()) {
                        this.playAnimation(this.IMAGES_LONG_IDLE);
                        this.snoringSound.play();
                    } else {
                        this.playAnimation(this.IMAGES_IDLE);
                        this.snoringSound.pause();
                        this.snoringSound.currentTime = 0;
                    }
                }
            }
        }, 6000 / 60)
    }

    jump() {
        this.speedY = 30;
        this.jumpPhase = 'start';
        this.currentImage = 0;
        if (!this.jumpSoundPlayed) {
            this.jumpSound.play();
            this.jumpSoundPlayed = true;
        }
    }

    playJumpAnimation(images) {
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            this.img = this.imageCache[images[images.length - 1]];
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