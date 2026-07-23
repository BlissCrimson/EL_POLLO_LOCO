/**
 * A collectible coin at a fixed position in the level.
 * @extends MovableObject
 */
class Coin extends MovableObject {
    y = 360;
    width = 100;
    height = 100;
    COIN_IMAGES = [
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png'
    ]
    offset = {
        top: 30,
        bottom: 30,
        left: 30,
        right: 30
    }

    /**
     * Creates a coin at the given position with a random coin image.
     * @param {number} x - X position of the coin.
     * @param {number} y - Y position of the coin.
     */
    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        let i = Math.round(Math.random());
        this.loadImage(this.COIN_IMAGES[i]);
    }
}