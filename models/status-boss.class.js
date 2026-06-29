class StatusBoss extends StatusBar {
    width = 200;
    y = 10;
    x = 500;
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
        this.images = this.BOSS_BAR;
        this.loadImages(this.BOSS_BAR);
        this.setPercentage(100);
    }
    
    setEnergy() {
        this.percentage = this.world.energy;
    }
}