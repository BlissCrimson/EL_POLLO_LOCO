function createLevel3() {
    const chickenAt = (x, speed) => Object.assign(new Chicken(), { x, speed });
    const chickenSmallAt = (x, speed) => Object.assign(new ChickenSmall(), { x, speed });

    return new Level(
        [   // enemies
            chickenAt(350, 0.25),
            chickenAt(550, 0.28),
            chickenAt(750, 0.30),
            chickenAt(950, 0.30),
            chickenAt(1150, 0.32),
            chickenAt(1350, 0.32),
            chickenSmallAt(500, 1.0),
            chickenSmallAt(1000, 1.0),
            chickenSmallAt(1600, 1.0),
            new ChickenBoss()
        ],
        [   // clouds
            new Cloud()
        ],
        [   // bottles (10)
            new Bottle(150),
            new Bottle(320),
            new Bottle(490),
            new Bottle(660),
            new Bottle(830),
            new Bottle(1000),
            new Bottle(1170),
            new Bottle(1340),
            new Bottle(1580),
            new Bottle(1820)
        ],
        [   // coins 
            new Coin(150, 300),
            new Coin(205, 205),
            new Coin(260, 265),
            new Coin(370, 255),
            new Coin(425, 180),
            new Coin(535, 300),
            new Coin(590, 205),
            new Coin(645, 265),
            new Coin(755, 255),
            new Coin(810, 180),
            new Coin(920, 300),
            new Coin(975, 205),
            new Coin(1030, 265),
            new Coin(1140, 255),
            new Coin(1195, 180),
            new Coin(1305, 300),
            new Coin(1360, 205),
            new Coin(1415, 265),
            new Coin(1525, 255),
            new Coin(1580, 180),
            new Coin(1690, 300),
            new Coin(1745, 205),
            new Coin(1800, 265),
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