class Cloud extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;
    IMAGES_CLOUDS = [
        'assets/img/5_background/layers/4_clouds/1.png',
        'assets/img/5_background/layers/4_clouds/2.png'
    ];
    currentImage = 0;
    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');
        this.loadImages(this.IMAGES_CLOUDS);
        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        this.playAnimation(this.IMAGES_CLOUDS);
    }
}