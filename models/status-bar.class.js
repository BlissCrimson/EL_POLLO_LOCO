/**
 * Base class for all status bars (health, bottles, coins, boss).
 * Picks the right bar image based on a percentage value.
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    x = 36;
    percentage = 100;

    /**
     * Sets the height of the status bar.
     */
    constructor() {
        super();
        this.height = 48;
    }

    /**
     * Sets the current percentage and updates the displayed image.
     * @param {number} percentage - New percentage value (0–100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.images[this.resolveImageIndex()];
        this.img = this.imageCache[path]
    }

    /**
     * Maps the current percentage to an image index (0 = empty, 5 = full).
     * @returns {number} Index into the status bar's image array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) return 5;
        else if (this.percentage >= 80) return 4;
        else if (this.percentage >= 60) return 3;
        else if (this.percentage >= 40) return 2;
        else if (this.percentage >= 20) return 1;
        else return 0;
    }
}