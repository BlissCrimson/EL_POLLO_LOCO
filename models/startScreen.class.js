/**
 * The static start screen image shown before the game begins.
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {

    /**
     * Loads the start screen image.
     */
    constructor() {
        super();
        this.loadImage('assets/img/9_intro_outro_screens/start/startscreen_1.png')
    }
}