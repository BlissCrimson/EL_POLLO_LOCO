/**
 * The playable character. Handles movement, jumping, animations
 * and sounds based on keyboard input and game state.
 * @extends MovableObject
 */
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
    IMAGES_JUMPING_START = [
        // 'assets/img/2_character_pepe/3_jump/J-31.png',
        // 'assets/img/2_character_pepe/3_jump/J-32.png',
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
    ];
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
    ];
    currentImage = 0;
    world;
    offset = {
        top: 85,
        bottom: 0,
        left: 13,
        right: 13
    }

    /**
     * Loads all animations and sounds, then starts falling under gravity.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadAllImages();
        this.registerSounds();
        this.jumpSoundPlayed = false;
        this.hurtSoundPlayed = false;
        this.applyGravity();
        this.playAnimation(this.IMAGES_WALKING);
        this.lastMovementTime = new Date().getTime();
        this.jumpPhase = 'start';
    }

    /**
     * Loads every animation image sequence into the image cache.
     */
    loadAllImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING_START);
        this.loadImages(this.IMAGES_JUMPING_HIGH);
        this.loadImages(this.IMAGES_JUMPING_END);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    /**
     * Registers all character sounds and enables looping where needed.
     */
    registerSounds() {
        this.walkingSound = soundManager.registerSound('assets/audio/walking.mp3');
        this.jumpSound = soundManager.registerSound('assets/audio/jump.mp3');
        this.hurtSound = soundManager.registerSound('assets/audio/ouch.mp3');
        this.snoringSound = soundManager.registerSound('assets/audio/snoring.mp3');
        this.gameOverSound = soundManager.registerSound('assets/audio/game-over.mp3', 'sfx', 0.2);
        this.walkingSound.loop = true;
        this.snoringSound.loop = true;
    }

    /**
     * Starts the input loop and the animation-rendering loop.
     */
    animate() {
        this.animateInterval = setInterval(() => this.handleMovementLoop(), 1000 / 60);
        this.renderInterval = setInterval(() => this.handleAnimationLoop(), 6000 / 60);
    }

    /**
     * Reacts to keyboard input each frame: movement, jump and camera.
     */
    handleMovementLoop() {
        if (this.world.paused) return;
        if (this.isDead()) return this.stopWalkingSound();
        if (this.world.boss?.introWalking) {
            this.stopWalkingSound();
        } else {
            this.handleMovementInput();
            this.handleJumpInput();
        }
        this.updateCamera();
    }

    /**
     * Moves the character left/right based on pressed keys and updates
     * the walking sound accordingly.
     */
    handleMovementInput() {
        const kb = this.world.keyboard;
        const inArena = this.world.boss?.hasSpottedCharacter;
        const leftBound = inArena ? this.world.arenaLeftBound : 0;
        const rightBound = inArena ? this.world.arenaRightBound : this.world.level.level_end_x;
        this.movementRight(kb, rightBound);
        this.movementLeft(kb, leftBound);
        this.movementStop(kb);
    }

    /**
     * Moves the character right based on pressed keys and updates
     * the walking sound accordingly.
     */
    movementRight(kb, rightBound) {
        if ((kb.RIGHT || kb.D) && this.x < rightBound) {
            this.moveRight();
            this.walkingSound.play();
            this.lastMovementTime = new Date().getTime();
        }
    }

    /**
     * Moves the character left based on pressed keys and updates
     * the walking sound accordingly.
     */
    movementLeft(kb, leftBound) {
        if ((kb.LEFT || kb.A) && this.x > leftBound) {
            this.moveLeft();
            this.walkingSound.play();
            this.lastMovementTime = new Date().getTime();
        }
    }

    /**
     * Stopped the character based on pressed keys and updates
     * the walking sound accordingly.
     */
    movementStop(kb) {
        if (!kb.RIGHT && !kb.D && !kb.LEFT && !kb.A) {
            this.stopWalkingSound();
        }
    }
    /**
     * Triggers a jump when the jump key is pressed and the character
     * is standing on the ground.
     */
    handleJumpInput() {
        const kb = this.world.keyboard;
        if ((kb.UP || kb.SPACE || kb.W) && !this.isAboveGround()) {
            this.jump();
            this.lastMovementTime = new Date().getTime();
        }
    }

    /**
     * Moves the camera to follow the character, unless the boss fight
     * has already started.
     */
    updateCamera() {
        if (!this.world.boss?.hasSpottedCharacter) {
            this.world.camera_x = -this.x + 100;
        }
    }

    /**
     * Pauses the walking sound and resets it to the start.
     */
    stopWalkingSound() {
        this.walkingSound.pause();
        this.walkingSound.currentTime = 0;
    }

    /**
     * Picks the right animation for the current game state each frame.
     */
    handleAnimationLoop() {
        if (this.world.paused) return;
        if (this.isDead()) return this.handleDeathAnimation();
        if (this.isHurt()) return this.handleHurtAnimation();
        if (this.isAboveGround()) return this.handleJumpAnimation();
        this.handleGroundAnimation();
    }

    /**
     * Plays the death animation and triggers the lose screen once it
     * has finished.
     */
    handleDeathAnimation() {
        if (!this.isDying) {
            this.startDying();
            this.currentImage = 0;
        }
        this.playAnimation(this.IMAGES_DEAD);
        if (this.currentImage >= this.IMAGES_DEAD.length) {
            showEndscreen('lose');
        }
    }
    /**
     * Sets the falling state and plays the game-over sound once.
     */
    startDying() {
        this.speedY = 10;
        this.isDying = true;
        this.gameOverSound.play();
        this.stopSnoringSound();
    }

    /**
     * Pauses the snoring sound and resets it to the start.
     */
    stopSnoringSound() {
        this.snoringSound.pause();
        this.snoringSound.currentTime = 0;
    }

    /**
     * Plays the hurt animation and its sound.
     */
    handleHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        this.hurt();
    }

    /**
     * Updates the jump phase and plays the matching jump animation.
     */
    handleJumpAnimation() {
        this.updateJumpPhase();
        if (this.jumpPhase === 'start') {
            this.playJumpAnimation(this.IMAGES_JUMPING_START);
        } else if (this.jumpPhase === 'high') {
            this.playJumpAnimation(this.IMAGES_JUMPING_HIGH);
        } else {
            this.playJumpAnimation(this.IMAGES_JUMPING_END);
        }
    }

    /**
     * Determines whether the jump is starting, at its peak or ending,
     * based on the current vertical speed.
     */
    updateJumpPhase() {
        let newPhase = 'high';
        if (this.speedY > 2) newPhase = 'start';
        else if (this.speedY < -2) newPhase = 'end';
        if (newPhase !== this.jumpPhase) {
            this.jumpPhase = newPhase;
            this.currentImage = 0;
        }
    }

    /**
     * Plays walking or idle/sleep animation while the character is on
     * the ground and not hurt.
     */
    handleGroundAnimation() {
        this.hurtSoundPlayed = false;
        this.jumpSoundPlayed = false;
        const kb = this.world.keyboard;
        const isMoving = !this.world.boss?.introWalking && (kb.RIGHT || kb.D || kb.LEFT || kb.A);
        if (isMoving) {
            this.playAnimation(this.IMAGES_WALKING);
            this.stopSnoringSound();
        } else {
            this.handleIdleAnimation();
        }
    }

    /**
     * Plays the sleep animation once idle long enough, otherwise the
     * normal idle animation.
     */
    handleIdleAnimation() {
        if (this.isSleeping()) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            this.snoringSound.play();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
            this.stopSnoringSound();
        }
    }

    /**
     * Makes the character jump and plays the jump sound once per jump.
     */
    jump() {
        this.speedY = 30;
        this.jumpPhase = 'start';
        this.currentImage = 0;
        if (!this.jumpSoundPlayed) {
            this.jumpSound.play();
            this.jumpSoundPlayed = true;
        }
    }

    /**
     * Plays a jump animation sequence without looping; holds the last
     * frame once the sequence has finished.
     * @param {string[]} images - Image paths for the current jump phase.
     */
    playJumpAnimation(images) {
        if (this.currentImage < images.length) {
            this.img = this.imageCache[images[this.currentImage]];
            this.currentImage++;
        } else {
            this.img = this.imageCache[images[images.length - 1]];
        }
    }

    /**
     * Plays the hurt sound once per hit.
     */
    hurt() {
        if (!this.hurtSoundPlayed) {
            this.hurtSound.play();
            this.hurtSoundPlayed = true;
        }
    }

    /**
     * Checks whether the character has been idle long enough to fall asleep.
     * @returns {boolean} True if more than 15 seconds passed without movement.
     */
    isSleeping() {
        let timePassed = new Date().getTime() - this.lastMovementTime;
        return timePassed > 15000;
    }
}