class MovableObject {
    img;
    x = 120;
    y = 320;
    width = 150;
    height = 100;
    imageCache = [];

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementBy ID('image') <img id="image">
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });

    }

    moveRight() {
        this.move;
        console.log('Moving right');
    }
    moveLeft() {

    }
}