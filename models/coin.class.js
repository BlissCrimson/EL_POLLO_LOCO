class Coin extends MovableObject {
    y = 360;
    width = 100;
    height = 100;
    COIN_IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        let i = Math.round(Math.random());
        this.loadImage(this.COIN_IMAGES[i]);

    }
}