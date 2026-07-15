function createLevel2() {
    const chickenAt = (x, speed) => Object.assign(new Chicken(), { x, speed });
    const chickenSmallAt = (x, speed) => Object.assign(new ChickenSmall(), { x, speed });

    return new Level(
        [   // enemies 
            chickenAt(400, 0.20),
            chickenAt(650, 0.22),
            chickenAt(900, 0.25),
            chickenAt(1150, 0.25),
            chickenAt(1400, 0.28),
            chickenSmallAt(800, 0.8),
            chickenSmallAt(1600, 0.8),
            new ChickenBoss()
        ],
        [   // clouds
            new Cloud()
        ],
        [   // bottles (9)
            new Bottle(150),
            new Bottle(350),
            new Bottle(550),
            new Bottle(750),
            new Bottle(950),
            new Bottle(1150),
            new Bottle(1350),
            new Bottle(1580),
            new Bottle(1820)
        ],
        [   // coins 
            new Coin(180, 300), new Coin(245, 205), new Coin(310, 265),
            new Coin(450, 255), new Coin(515, 180),
            new Coin(655, 300), new Coin(720, 205), new Coin(785, 265),
            new Coin(925, 255), new Coin(990, 180),
            new Coin(1130, 300), new Coin(1195, 205), new Coin(1260, 265),
            new Coin(1400, 255), new Coin(1465, 180),
            new Coin(1605, 300), new Coin(1670, 205), new Coin(1735, 265),
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