class StatusCoins extends StatusBar {
    x = 200;
    y = 0;
    
    COIN_BAR = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];
    constructor() {
        super();
        this.loadImages(this.COIN_BAR);
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;

        let imageCoinPath = this.COIN_BAR[this.resolveImageIndex()];

        this.img = this.imageCache[imageCoinPath]
    }
}