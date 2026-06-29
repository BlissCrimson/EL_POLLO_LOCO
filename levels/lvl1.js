const level1 = new Level(
    [   // enemies
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
        new ChickenBoss(),
    ],
    [   // clouds
        new Cloud()
    ],
    [
        new Bottle(200),
        new Bottle(235),
        new Bottle(375),
        new Bottle(200 * 2),
        new Bottle(455 * 2),
        new Bottle(375 * 3),
        new Bottle(650 * 3),
        new Bottle(700 * 3)
        // new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 200),
        // new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 235),
        // new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 375),
        // new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 200 * 2),
        // new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 455 * 2),
        // new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 375 * 3),
        // new Bottle('assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png', 650 * 3),
        // new Bottle('assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png', 700 * 3)
    ],
    [   // coins
        new Coin(245, 100 + Math.random() * 200),
        new Coin(300, 100 + Math.random() * 200),
        new Coin(458, 100 + Math.random() * 200),
        new Coin(245 * 2, 100 + Math.random() * 200),
        new Coin(300 * 2, 100 + Math.random() * 200),
        new Coin(458 * 2, 100 + Math.random() * 200),
        new Coin(245 * 3, 100 + Math.random() * 200),
        new Coin(300 * 3, 100 + Math.random() * 200),
        new Coin(458 * 3, 100 + Math.random() * 200),

    ],
    [   // backgroundObjects
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
