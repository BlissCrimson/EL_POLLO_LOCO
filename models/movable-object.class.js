class MovableObject {
    x = 120;
    y = 250;
    img;
    height = 150;
    width = 100;

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