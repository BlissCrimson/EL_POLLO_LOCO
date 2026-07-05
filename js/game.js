let dialogControlls;
let canvas;
let world;
let keyboard = new Keyboard();
let currentLevel = 0;
let soundManager = new SoundManager();
soundManager.loadMuteState();
soundManager.toggleMuteIcon();
const keyMap = {
    'ArrowLeft': 'LEFT',
    'ArrowRight': 'RIGHT',
    'ArrowUp': 'UP',
    'ArrowDown': 'DOWN',
    ' ': 'Space',
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

function startLevel(index) {
    if (world) world.stopGame();
    world = new World(canvas, keyboard, levelFactories[index]())
}

/**
 * For open dialog settings or controlls.
 * 
 * @param {type} -settings 
 * @param {type} - controlls
 */
function openDialog(type) {
    if (type === 'settings') {
        dialogRef = document.getElementById('settingsDialog')
    }
    if (type === 'controlls') {
        dialogRef = document.getElementById('controllsDialog')
    }
    dialogRef.showModal();

}

/**
 * Function to close dialog.
 */
function closeDialog() {
    dialogRef.close();
}

document.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('startGame').addEventListener('click', () => {
        init();
    });
    document.getElementById('controllsDialog').addEventListener('click', (e) => {
        if (e.target === document.getElementById('controllsDialog')) closeDialog();
    });
    document.getElementById('settingsDialog').addEventListener('click', (e) => {
        if (e.target === document.getElementById('settingsDialog')) closeDialog();
    })
});

/**
 * By click on start, the startscreen is closed and the canvas is running.
 */
function init() {
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    canvas = document.getElementById('canvas');
    startLevel(currentLevel);
}

window.addEventListener("keydown", (e) => {
    keyboard[keyMap[e.key]] = true;
});

window.addEventListener("keyup", (e) => {
    keyboard[keyMap[e.key]] = false;
});

function restartGame() {
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    startLevel(currentLevel);
}

/**
 * 
 * @param {string} win - for load WinScreen
 */
function showEndscreen(win) {
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('endScreen').classList.remove('d_none');
    if (win === "win") {
        document.getElementById('endScreenImg').src = './assets/img/5_background/background_win.png';
        document.getElementById('resultImg').src = './assets/img/You won, you lost/You Win A.png';
    } else {
        document.getElementById('endScreenImg').src = './assets/img/5_background/background_lose.png';
        document.getElementById('resultImg').src = './assets/img/You won, you lost/Game Over.png';
    }
}

function showHomeScreen() {
    if (world) world.stopGame();
    document.getElementById('canvas').classList.add('d_none');
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('startScreen').classList.remove('d_none');  // fehlt!
}

function toggleMute() {
    soundManager.toggleMute();
}