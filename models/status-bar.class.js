class StatusBar extends DrawableObject {

    // HEALTH_BAR = [
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
    //     'assets/img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    // ]
    // BOTTLE_BAR = [
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
    //     'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png'
    // ]
    // COIN_BAR = [
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    //     'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    // ]

    percentage = 100;

    constructor() {
        super();
        // this.loadImages(this.HEALTH_BAR);
        // this.loadImages(this.BOTTLE_BAR);
        // this.loadImages(this.COIN_BAR);
        this.x = 0;
        this.y = 0;
        this.height = 48;
        // this.setPercentage(100);
    }

    // setPercentage(percentage) {
    //     this.percentage = percentage;

    //     let imageHealthPath = this.HEALTH_BAR[this.resolveImageIndex()];
    //     let imageBottlePath = this.BOTTLE_BAR[this.resolveImageIndex()];
    //     let imageCoinPath = this.COIN_BAR[this.resolveImageIndex()];

    //     this.img = this.imageCache[imageHealthPath]
    //     this.img = this.imageCache[imageBottlePath]
    //     this.img = this.imageCache[imageCoinPath]
    // }

    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}