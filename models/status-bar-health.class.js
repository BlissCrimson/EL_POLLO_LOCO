/**
 * Status bar showing the character's health.
 * @extends StatusBar
 */
class StatusHealth extends StatusBar {
    y = 34;

    HEALTH_BAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Loads the health bar images and starts at 100%.
     */
    constructor() {
        super();
        this.images = this.HEALTH_BAR;
        this.loadImages(this.HEALTH_BAR);
        this.setPercentage(100);
    }

    /**
     * Not currently called; would set the percentage from world.energy.
     */
    setEnergy() {
        this.percentage = this.world.energy;
    }
}