class Chicken extends MovableObject {
    y = 380;
    width = 50;
    height = 50;
    // TODO folgendes function musst add:
    // [ ] function walk()
    // [ ] function eat()

    constructor() {
        super().loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 400 + Math.random() * 400;
    }

    walk() {

    }
    eat() {

    }
}