let dialogControlls;
let canvas;
let world;
let keyboard = new Keyboard();
let currentLevel = 0;
let soundManager = new SoundManager();
let skipResumeOnClose = false;
const orientationQuery = window.matchMedia('(orientation: portrait) and (max-width: 933px)');
const keyMap = {
    'ArrowLeft': 'LEFT',
    'ArrowRight': 'RIGHT',
    'ArrowUp': 'UP',
    'ArrowDown': 'DOWN',
    ' ': 'SPACE',
    'w': 'W',
    'a': 'A',
    's': 'S',
    'd': 'D'
};
const levelFactories = [
    createLevel1
    // createLevel2,
    // createLevel3
]

/**
 * Change Which level to start.
 * @param {number} index 
 */
function startLevel(index) {
    if (world) world.stopGame();
    world = new World(canvas, keyboard, levelFactories[index]())
}

/**
 * Opens the dialog with the requested content and pauses the game
 * if it is currently running.
 * @param {string} type - Dialog type: 'settings', 'controlls' or 'impressum'.
 */
function openDialog(type) {
    const title = document.getElementById('dialogTitle');
    const content = document.getElementById('dialogMain')
    dialogTypes(type);
    dialogRef = document.getElementById('dialogContent');
    dialogRef.showModal();
    if (world && !world.stopped) {
        world.pauseGame();
    }
}

/**
 * Fills the dialog title and content based on the given type.
 * @param {string} type - Dialog type: 'settings', 'controlls' or 'impressum'.
 */
function dialogTypest(type) {
    if (type === 'settings') {
        title.textContent = 'SETTINGS';
        content.innerHTML = getSettingsDialogTemplate();
    }
    if (type === 'controlls') {
        title.textContent = 'CONTROLLS';
        content.innerHTML = getControllsDialogTemplate();
    }
    if (type === 'impressum') {
        title.textContent = 'IMPRESSUM';
        content.innerHTML = getImpressumsDialogTemplate();
    }
}

/**
 * Function to close dialog.
 */
function closeDialog() {
    dialogRef.close();
}

/**
 * Initializes sound, the start button, dialog close behavior and
 * mobile control buttons once the DOM is ready.
 * @param {Event} e - DOMContentLoaded event.
 */
document.addEventListener('DOMContentLoaded', (e) => {
    soundManager.loadMuteState();
    const backgroundMusic = soundManager.registerSound('assets/audio/background.mp3', 'music');
    backgroundMusic.loop = true;
    backgroundMusic.play();
    document.getElementById('startGame').addEventListener('click', () => {
        init();
    });
    document.getElementById('dialogContent').addEventListener('click', (e) => {
        if (e.target === document.getElementById('dialogContent')) closeDialog();
    });
    document.getElementById('dialogContent').addEventListener('close', () => {
        if (skipResumeOnClose) {
            skipResumeOnClose = false;
            return;
        }
        if (world && !world.stopped) {
            world.resumeGame();
        }
    });
    document.querySelectorAll('.button__mobile').forEach(btn => {
        btn.addEventListener('touchstart', () => {
            keyboard[btn.dataset.key] = true;
        });
        btn.addEventListener('touchend', () => {
            keyboard[btn.dataset.key] = false;
        });
        btn.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        })
    });
});

/**
 * By click on start, the startscreen is closed and the canvas is running.
 */
function init() {
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    document.getElementById('fullscreenBtnGame').classList.remove('d_none');
    document.getElementById('settingsBtnGame').classList.remove('d_none');
    canvas = document.getElementById('canvas');
    toggleMobileButtons(true);
    startLevel(currentLevel);
}

/**
 * Sets the pressed key to true in the keyboard state.
 * @param {KeyboardEvent} e - Keydown event.
 */
window.addEventListener("keydown", (e) => {
    keyboard[keyMap[e.key]] = true;
});

/**
 * Sets the released key to false in the keyboard state.
 * @param {KeyboardEvent} e - Keyup event.
 */
window.addEventListener("keyup", (e) => {
    keyboard[keyMap[e.key]] = false;
});

/**
 * Restart game over button in settings dialog.
 */
function restartGame() {
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    document.getElementById('fullscreenBtnGame').classList.remove('d_none');
    document.getElementById('settingsBtnGame').classList.remove('d_none');
    toggleMobileButtons(true);
    startLevel(currentLevel);
}

/**
 * To show endscreen by win or lose.
 * @param {string} win - for load WinScreen
 */
function showEndscreen(win) {
    document.getElementById('canvas').classList.add('d_none');
    toggleMobileButtons(false);
    document.getElementById('endScreen').classList.remove('d_none');
    if (win === "win") {
        document.getElementById('endScreenImg').src = '../assets/img/5_background/background_win.png';
        document.getElementById('resultImg').src = '../assets/img/You won, you lost/You Win A.png';
    } else {
        document.getElementById('endScreenImg').src = '../assets/img/5_background/background_lose.png';
        document.getElementById('resultImg').src = '../assets/img/You won, you lost/Game Over.png';
    }
}

/**
 * To go back to Homescreen by stop the game.
 */
function showHomeScreen() {
    if (world) world.stopGame();
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('startScreen').classList.remove('d_none');
    document.getElementById('fullscreenBtnGame').classList.add('d_none');
    document.getElementById('settingsBtnGame').classList.add('d_none');
    toggleMobileButtons(false);
}

/**
 * To switch sound, on and off.
 */
function toggleMute() {
    soundManager.toggleMute();
}

/**
 * Shows or hides the mobile control buttons.
 * @param {boolean} show - True to show the buttons, false to hide them.
 */
function toggleMobileButtons(show) {
    document.querySelectorAll('.button__mobile').forEach(btn => {
        btn.classList.toggle('d_none', !show);
    });
}

/**
 * For switch to Fullscreen or window.
 */
function toggleFullscreen() {
    let wrapper = document.querySelector('.game-wrapper');
    if (!document.fullscreenElement) {
        wrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/**
 * Reacts to orientation changes on mobile devices.
 * Pauses the game in portrait mode, resumes it in landscape mode.
 * @param {MediaQueryListEvent} e - Change event of the orientation media query.
 */
function handleOrientationChange(e) {
    if (!world) return;
    if (e.matches) {
        world.pauseGame();
    } else {
        world.resumeGame();
    }
}

orientationQuery.addEventListener('change', handleOrientationChange);

/**
 * Scales the game wrapper to fit the screen in mobile landscape mode.
 * Resets the scale outside of that mode or when in fullscreen.
 */
function scaleGame() {
    const wrapper = document.querySelector('.game-wrapper');
    const isMobileLandscape = window.matchMedia('(orientation: landscape) and (max-width: 933px)').matches;
    if (!isMobileLandscape || document.fullscreenElement) {
        wrapper.style.transform = '';
        return;
    }
    const scale = Math.min(window.innerWidth / 720, window.innerHeight / 480);
    wrapper.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', scaleGame);
window.addEventListener('orientationchange', scaleGame);
document.addEventListener('fullscreenchange', scaleGame);
scaleGame();

/**
 * Restarts the game from the settings dialog, without resuming
 * the paused game in between.
 */
function restartFromSettings() {
    skipResumeOnClose = true;
    closeDialog();
    restartGame();
}

/**
 * Function to go back to Homescreen from settings dialog.
 */
function goHomeFromSettings() {
    skipResumeOnClose = true;
    closeDialog();
    showHomeScreen();
}