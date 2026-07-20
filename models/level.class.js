/**
 * Holds all objects that make up one level: enemies, clouds, bottles,
 * coins and background layers.
 */
class Level {
    enemies;
    clouds;
    bottles;
    coins;
    backgroundObjects;
    level_end_x = 2000;

    /**
     * Creates a level from the given object collections.
     * @param {MovableObject[]} enemies - Enemies in this level.
     * @param {Cloud[]} clouds - Clouds in this level.
     * @param {Bottle[]} bottles - Collectible bottles in this level.
     * @param {Coin[]} coins - Collectible coins in this level.
     * @param {BackgroundObject[]} backgroundObjects - Background layers.
     */
    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.coins = coins;
        this.backgroundObjects = backgroundObjects;
    }
}