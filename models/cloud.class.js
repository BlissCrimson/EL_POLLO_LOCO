class Cloud extends MovableObject {
    x = 0;
    y = 0;
    width = 720;
    height = 480;

    constructor() {
        super().loadImage('assets/img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.x -= 1;
        }, 1000 / 60);
    }

    // wird übe animate gemacht.
    // moveCloud() {
    //     this.x = this.x - 1;
    // }
}