/**
 * The end boss. Walks into the frame when spotted, then attacks
 * in a fixed rhythm and dies after enough hits.
 * @extends MovableObject
 */
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
    IMAGES_ATTACK_START = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png'
    ];
    IMAGES_ATTACK_JUMP = [

        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png'
    ];
    IMAGES_ATTACK_BACK = [
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png'

    ];
    IMAGES_ATTACK_END = [
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
    attackInterval = 2000; 
    isAttacking = false;
    introWalking = false;
    introTargetX; 
    // Intro walk speed from boss:
    speed = 20; 
    offset = {
        top: 62,
        bottom: 14,
        left: 25,
        right: 9
    };

    /**
     * Loads all animation images and sounds and positions the boss
     * at the end of the level.
     */
    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ATTACK_START);
        this.loadImages(this.IMAGES_ATTACK_JUMP);
        this.loadImages(this.IMAGES_ATTACK_BACK);
        this.loadImages(this.IMAGES_ATTACK_END);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_ALERT);
        this.x = 900 + (719 * 2);
        this.animate();
        this.deadSound = soundManager.registerSound('assets/audio/boss-dead.mp3');
        this.alertSound = soundManager.registerSound('assets/audio/boss-alert.mp3');
        this.hurtSound = soundManager.registerSound('assets/audio/chickenHurt.mp3');
    }

    /**
     * Starts the render function for all animations.
     */
    animate() {
        this.renderImages();
    }

    /**
     * Plays the attack animation (start, jump, jump back, end).
     */
    attack() {
        this.isAttacking = true;
        const frameDuration = 6000 / 60;
        const jumpDistance = this.world.canvas.width * 0.4;
        const sequence = this.getAttackSequence();
        this.runAttackAnimation(sequence, frameDuration, jumpDistance);
    }

    /**
     * Builds the image sequence for the attack animation from the
     * individual phases.
     * @returns {string[]} The combined image sequence for the attack.
     */
    getAttackSequence() {
        return [
            ...this.IMAGES_ATTACK_START,
            ...this.IMAGES_ATTACK_JUMP,
            ...this.IMAGES_ATTACK_BACK,
            ...this.IMAGES_ATTACK_END
        ];
    }

    /**
     * Plays the given image sequence frame by frame and moves the boss
     * forward and back during the jump phase.
     * @param {string[]} sequence - Image sequence of the attack.
     * @param {number} frameDuration - Duration of one frame in ms.
     * @param {number} jumpDistance - Distance the boss moves during the jump.
     */
    runAttackAnimation(sequence, frameDuration, jumpDistance) {
        let step = 0;
        const attackAnimInterval = setInterval(() => {
            this.img = this.imageCache[sequence[step]];
            this.applyAttackJumpOffset(step, jumpDistance);
            step++;
            if (step >= sequence.length) {
                clearInterval(attackAnimInterval);
                this.isAttacking = false;
            }
        }, frameDuration);
    }

    /**
     * Shifts the boss by the given distance during the jump and
     * jump-back frames.
     * @param {number} step - Current frame index of the attack animation.
     * @param {number} jumpDistance - Distance the boss moves during the jump.
     */
    applyAttackJumpOffset(step, jumpDistance) {
        const jumpStart = this.IMAGES_ATTACK_START.length;
        const jumpEnd = jumpStart + this.IMAGES_ATTACK_JUMP.length;
        const backEnd = jumpEnd + this.IMAGES_ATTACK_BACK.length;
        if (step >= jumpStart && step < jumpEnd) {
            this.x -= jumpDistance / this.IMAGES_ATTACK_JUMP.length;
        }
        if (step >= jumpEnd && step < backEnd) {
            this.x += jumpDistance / this.IMAGES_ATTACK_BACK.length;
        }
    }

    /**
     * Starts the fixed interval at which the boss automatically attacks,
     * as long as it is not dead, dying or hurt.
     */
    startAttackTimer() {
        this.attackTimer = setInterval(() => {
            if (!this.isDead() && !this.isDying && !this.isHurt() && !this.isAttacking) {
                this.attack();
            }
        }, this.attackInterval);
    }

    /**
     * Checks whether the character is within attack range of the boss.
     * @returns {boolean} True if the character is close enough.
     */
    isCharacterInAttackRange() {
        return this.world.character.x >= this.x - 150;
    }

    /**
     * Moves the boss to the left (own implementation instead of
     * MovableObject.moveLeft, since the boss uses its own speed).
     */
    moveLeft() {
        this.otherDirection = false;
        this.x -= this.speed;
    }

    /**
     * Damages the boss and plays the hurt sound.
     */
    hit() {
        if (this.isHurt()) return;
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
            this.hurtSound.play();
        }
    }

    /**
     * Starts the render loop that picks the matching animation
     * based on the boss's state.
     */
    renderImages() {
        setInterval(() => {
            if (this.world?.paused || !this.world) return;
            this.updateBossState();
        }, 6000 / 60);
    }

    /**
     * Picks the matching animation based on state: dead, hurt, attacking,
     * walking in, alert, or spotting the character.
     */
    updateBossState() {
        if (this.isDead()) {
            this.handleDeadState();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isAttacking) {
            // Animation and motion run complettly in attack()
        } else if (this.introWalking) {
            this.handleIntroWalking();
        } else if (this.hasSpottedCharacter) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.world.character.x >= this.x - 700) {
            this.handleCharacterSpotted();
        }
    }

    /**
     * Plays the death animation, removes the boss from the level after
     * a short delay and stops the attack timer.
     */
    handleDeadState() {
        this.playAnimation(this.IMAGES_DEAD);
        if (this.isDying) return;
        this.isDying = true;
        this.deadSound.play();
        clearInterval(this.attackTimer);
        setTimeout(() => {
            let index = this.world.level.enemies.indexOf(this);
            this.world.level.enemies.splice(index, 1);
        }, 600);
    }

    /**
     * Walks the boss into the frame until the target position is reached,
     * then starts the attack timer.
     */
    handleIntroWalking() {
        if (this.x > this.introTargetX) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.introWalking = false;
            this.startAttackTimer();
        }
    }

    /**
         * Marks the character as spotted, plays the alert sound and starts
         * walking the boss into the frame.
         */
    handleCharacterSpotted() {
        this.hasSpottedCharacter = true;
        this.alertSound.play();
        this.introWalking = true;
        this.introTargetX = this.x - 400;

        const char = this.world.character;
        this.world.arenaLeftBound = char.x - 100;
        this.world.arenaRightBound = char.x - 100 + this.world.canvas.width - char.width;
    }
}