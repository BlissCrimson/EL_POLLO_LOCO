/**
 * Status bar showing how many bottles the character has collected.
 * @extends StatusBar
 */
class StatusBottles extends StatusBar {
    y = 0;
    percentage = 0;
    BOTTLE_BAR = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    ];
    
    /**
     * Loads the bottle bar images and starts at 0%.
     */
    constructor() {
        super();
        this.loadImages(this.BOTTLE_BAR);
        this.setPercentage(0);
    }

    /**
     * Sets the current percentage and updates the displayed bottle bar image.
     * @param {number} percentage - New percentage value (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;

        let imageBottlePath = this.BOTTLE_BAR[this.resolveImageIndex()];

        this.img = this.imageCache[imageBottlePath]

    }
}