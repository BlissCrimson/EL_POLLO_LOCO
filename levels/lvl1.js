function createLevel1() {
    const chickenAt = (x, speed) => Object.assign(new Chicken(), { x, speed });
    const chickenSmallAt = (x, speed) => Object.assign(new ChickenSmall(), { x, speed });

    return new Level(
        [   // enemies 
            chickenAt(450, 0.15),
            chickenAt(700, 0.18),
            chickenAt(950, 0.20),
            chickenAt(1250, 0.20),
            chickenSmallAt(1500, 0.6),
            new ChickenBoss()
        ],
        [   // clouds
            new Cloud()
        ],
        [   // bottles (8)
            new Bottle(150),
            new Bottle(380),
            new Bottle(620),
            new Bottle(860),
            new Bottle(1100),
            new Bottle(1340),
            new Bottle(1580),
            new Bottle(1820)
        ],
        [   // coins 
            new Coin(200, 300), new Coin(265, 205), new Coin(330, 265),
            new Coin(480, 255), new Coin(545, 180),
            new Coin(695, 300), new Coin(760, 205), new Coin(825, 265),
            new Coin(975, 255), new Coin(1040, 180),
            new Coin(1190, 300), new Coin(1255, 205), new Coin(1320, 265),
            new Coin(1470, 255), new Coin(1535, 180),
        ],
        [   // background
            new BackgroundObject('assets/img/5_background/layers/air.png', -720),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', -720),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', -720),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', -720),

            new BackgroundObject('assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('assets/img/5_background/layers/air.png', 719),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('assets/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png', 719 * 3)
        ]
    );
}