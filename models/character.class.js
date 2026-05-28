class Character extends MovableObject {
    x = 24;
    y = 280;
    width = 112;
    height = 220;
    constructor() {
        super().loadImage('assets/img/2_character_pepe/2_walk/W-21.png')
        this.y = 430 - this.height
    }

    jump() {

    }
}