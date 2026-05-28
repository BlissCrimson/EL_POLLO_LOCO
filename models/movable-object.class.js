class MovableObject {
    img;
    x = 120;
    y = 320;
    width = 150;
    height = 100;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementBy ID('image') <img id="image">
        this.img.src = path;
    }

    moveRight() {
        this.move;
        console.log('Moving right');
    }
    moveLeft() {

    }
}