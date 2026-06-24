class StatusBoss extends StatusBar {
    width = 200;
    BOSS_BAR = [
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'docs/img_pollo_locco/7_statusbars/2_statusbar_endboss/blue/blue100.png'
    ]
    constructor(imagePath) {
        super();
        this.loadImage(this.BOSS_BAR);
    }
}