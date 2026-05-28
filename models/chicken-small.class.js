class ChickenSmall extends MovableObject {
    y = 380;
    width = 45;
    height = 44;
    // TODO folgendes function musst add:
    // [ ] function walk()
    // [ ] function eat()

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        this.x = 400 + Math.random() * 400;
        this.y = 430 - this.height;
    }

    walk() {

    }
    eat() {

    }
}