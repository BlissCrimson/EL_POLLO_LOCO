class StatusbarObjects {
    img;
    x = 0;
    y = 0;
    height = 48;

    loadImage(path) {
        this.img = new Image(); // this.img = document.getElementBy ID('image') <img id="image">
        this.img.src = path;
    }
}