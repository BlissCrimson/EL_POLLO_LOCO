/**
 * Status bar showing the end boss's health.
 * @extends StatusBar
 */
class StatusBoss extends StatusBar {
    width = 200;
    y = 10;
    x = 500;
    BOSS_BAR = [
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]
    
    /**
     * Loads the boss bar images and starts at 100%.
     */
    constructor() {
        super();
        this.images = this.BOSS_BAR;
        this.loadImages(this.BOSS_BAR);
        this.setPercentage(100);
    }

    /**
     * Not currently called; would set the percentage from world.energy.
     */
    setEnergy() {
        this.percentage = this.world.energy;
    }
}