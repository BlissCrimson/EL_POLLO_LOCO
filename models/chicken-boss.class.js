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
    // IMAGES_ATTACK = [
    //     'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
    //     'assets/img/4_enemie_boss_chicken/3_attack/G20.png'
    // ];
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
    attackInterval = 3000; // ms zwischen Angriffen, geschätzt – im Spiel testen
    isAttacking = false;
    introWalking = false;
    introTargetX; // Zielposition im Bild, Wert unten anpassen
    speed = 6; // eigene Einlauf-Geschwindigkeit, Wert im Spiel testen

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
        // this.y = 460 - this.height;
        this.animate();
        this.deadSound = soundManager.registerSound('assets/audio/boss-dead.mp3');
        this.alertSound = soundManager.registerSound('assets/audio/boss-alert.mp3');
        this.hurtSound = soundManager.registerSound('assets/audio/chickenHurt.mp3');
    }
    /**
     * Startet die render Funktonen aller animationen.
     */
    animate() {
        this.renderImages();
    }

    /**
     * Function für den Boss Angriff.
     */
    attack() {
        this.isAttacking = true;
        const frameDuration = 6000 / 60;
        const jumpDistance = 40;
        const sequence = [
            ...this.IMAGES_ATTACK_START,
            ...this.IMAGES_ATTACK_JUMP,
            ...this.IMAGES_ATTACK_BACK,
            ...this.IMAGES_ATTACK_END
        ];
        let step = 0;

        const attackAnimInterval = setInterval(() => {
            this.img = this.imageCache[sequence[step]];
            if (step === this.IMAGES_ATTACK_START.length) {
                this.x -= jumpDistance;
            }
            if (step === this.IMAGES_ATTACK_START.length + this.IMAGES_ATTACK_JUMP.length) {
                this.x += jumpDistance;
            }
            step++;
            if (step >= sequence.length) {
                clearInterval(attackAnimInterval);
                this.isAttacking = false;
            }
        }, frameDuration);
    }

    /**
     * Startet den festen Rythmus.
     */
    startAttackTimer() {
        this.attackTimer = setInterval(() => {
            if (!this.isDead() && !this.isDying && !this.isHurt() && !this.isAttacking) {
                this.attack();
            }
        }, this.attackInterval);
    }

    isCharacterInAttackRange() {
        return this.world.character.x >= this.x - 150;
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
            this.hurtSound.play();
        }
    }

    renderImages() {
        setInterval(() => {
            if (this.world?.paused) return;
            if (!this.world) {
                return;
            }
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.isDying) {
                    this.isDying = true;
                    this.deadSound.play();
                    clearInterval(this.attackTimer);
                    setTimeout(() => {
                        let index = this.world.level.enemies.indexOf(this);
                        this.world.level.enemies.splice(index, 1);
                    }, 600);
                }
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                // Animation and motion run complettly in attack()
            } else if (this.introWalking) {
                if (this.x > this.introTargetX) {
                    this.moveLeft();
                    this.playAnimation(this.IMAGES_WALKING);
                } else {
                    this.introWalking = false;
                    this.startAttackTimer();
                }
            } else if (this.hasSpottedCharacter) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.world.character.x >= this.x - 700) {
                this.hasSpottedCharacter = true;
                this.alertSound.play();
                this.introWalking = true;
                this.introTargetX = this.x - 400; // geschätzt, wie weit er ins Bild läuft
            }
        }, 6000 / 60);
    }
}