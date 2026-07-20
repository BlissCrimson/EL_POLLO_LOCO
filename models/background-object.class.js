/**
 * A static background image that scrolls with the level (parallax layer).
 * @extends MovableObject
 */
class BackgroundObject extends MovableObject {
    // x = 0;
    // y = 0;
    width = 720;
    height = 480;

    /**
     * Creates a background segment at the given x position.
     * @param {string} imagePath - Path to the background image.
     * @param {number} x - X position of this background segment.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}