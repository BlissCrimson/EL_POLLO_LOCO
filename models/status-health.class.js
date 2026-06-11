class StatusHealth extends StatusbarObjects {
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
    ]
    constructor(imagePath, energy) {
        super().loadImage(this.HEALTH_BAR[0]);
    }

    enegy(energy) {
        if (energy >= 90) {
            this.loadImage(this.HEALTH_BAR[5]);
        }
        if (energy <= 80) {
            this.loadImage(this.HEALTH_BAR[4]);
        }
        if (energy <= 60) {
            this.loadImage(this.HEALTH_BAR[3]);
        }
        if (energy <= 40) {
            this.loadImage(this.HEALTH_BAR[2]);
        }
        if (energy <= 20) {
            this.loadImage(this.HEALTH_BAR[1]);
        }
        if (energy == 0) {
            this.loadImage(this.HEALTH_BAR[0]);
        }
    }
}