class StatusHealth extends StatusBar {
    x = 8;
    y = 34;
    width = 150;
    HEALTH_BAR = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    constructor() {
        super();
        this.loadImages(this.HEALTH_BAR);
        this.setPercentage(100);
    }
    setPercentage(percentage) {
        this.percentage = percentage;

        let imageHealthPath = this.HEALTH_BAR[this.resolveImageIndex()];

        this.img = this.imageCache[imageHealthPath]
    }

    setEnergy() {
        this.percentage = this.world.energy;
    }
}