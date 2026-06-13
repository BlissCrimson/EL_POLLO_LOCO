class StatusHealth extends DrawableObject {
    //     x = 8;
    //     y = 34;
    //     width = 150;
    HEALTH_BAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor(imagePath, energy) {
        super();
        this.loadImage(this.HEALTH_BAR[0]);
    }

    setEnergy() {
        this.percentage = this.world.energy;
    }
}