/**
 * Base class for all objects drawn on the canvas. Handles image loading and drawing.
 */
class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 320;
    width = 150;
    height = 100;

    /**
     * Loads a single image and sets it as the current image.
     * @param {string} path - Path to the image file.
     */
    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementBy ID('image') <img id="image">
        this.img.src = path;
    }

    /**
     * Draws the current image onto the canvas at this object's position.
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context to draw on.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.otherDirection ? 0 : this.x, this.y, this.width, this.height);
    }

    /**
     * Draws a debug outline around characters and enemies (for hitbox testing).
     * @param {CanvasRenderingContext2D} ctx - Canvas 2D context to draw on.
     */
    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof ChickenSmall || this instanceof ChickenBoss) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.otherDirection ? 0 : this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    /**
     * Preloads a set of images into the image cache so they're ready
     * for animation without reloading each frame.
     * @param {string[]} arr - Image paths, e.g. ['img/image1.png', 'img/image2.png'].
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}