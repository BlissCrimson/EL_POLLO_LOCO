class ThrowableObject extends MovableObject {

    constructor(x, y) {
        super();
        this.loadImage('assets/img/6_salsa_bottle/salsa_bottle.png');
        this.x = 100;
        this.y = 100;
        this.height = 50;
        this.width = 60;
        this.throw(x, y);
    }

    throw(x, y) {
        // [ ] Animation nach oben oder im bogen
        // [ ] bewegung nach rechts bzw. im bogen nach rechts
        this.x = x;
        this.y = y;
        // this.x = this.world.character.x;
        // this.y = this.world.character.y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        }, 35); // Range of Attack
        this.speedX = 20;
    }

}