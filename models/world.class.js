class World {
    character = new Character();
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new ChickenSmall(),
    ];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject('assets/img/5_background/layers/air.png'),
        new BackgroundObject('assets/img/5_background/layers/3_third_layer/1.png'),
        new BackgroundObject('assets/img/5_background/layers/2_second_layer/1.png'),
        new BackgroundObject('assets/img/5_background/layers/1_first_layer/1.png'),
        //    INFO 
        // new BackgroundObject('assets/img/5_background/layers/3_third_layer/2.png'),
        // new BackgroundObject('assets/img/5_background/layers/2_second_layer/2.png'),
        // new BackgroundObject('assets/img/5_background/layers/1_first_layer/2.png')
    ];
    statusbar = [
        new StatusBottles('assets/img/7_statusbars/3_icons/icon_salsa_bottle.png'),
        new StatusHealth('assets/img/7_statusbars/1_statusbar/2_statusbar_health/orange/100.png'),
        new StatusCoins('assets/img/7_statusbars/3_icons/icon_coin.png'),
    ];
    canvas;
    ctx;
    keyboard;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.setWorld();
        this.draw();

    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.statusbar)
        this.addObjectsToMap(this.enemies);
        this.addToMap(this.character);

        // wird in cloud.class.js über die funxtion animate() erledigt.
        // this.clouds.forEach(clouds => {
        //     clouds.moveCloud();
        // });

        let self = this;
        requestAnimationFrame(function () {
            self.draw();

        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}