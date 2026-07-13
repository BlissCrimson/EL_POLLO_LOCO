let dialogControlls;
let canvas;
let world;
let keyboard = new Keyboard();
let currentLevel = 0;
let soundManager = new SoundManager();
const orientationQuery = window.matchMedia('(orientation: portrait) and (max-width: 933px)');
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
    const title = document.getElementById('dialogTitle');
    const content = document.getElementById('dialogMain')
    if (type === 'settings') {
        // dialogRef = document.getElementById('settingsDialog')
        title.textContent = 'SETTINGS';
        content.innerHTML = getSettingsDialogTemplate();
    }
    if (type === 'controlls') {
        // dialogRef = document.getElementById('controllsDialog')
        title.textContent = 'CONTROLLS';
        content.innerHTML = getControllsDialogTemplate();
    }
    if (type === 'impressum') {
        title.textContent = 'IMPRESSUM';
        content.innerHTML = getImpressumsDialogTemplate();
    }
    dialogRef = document.getElementById('dialogContent');
    dialogRef.showModal();

}

/**
 * Function to close dialog.
 */
function closeDialog() {
    dialogRef.close();
}

document.addEventListener('DOMContentLoaded', (e) => {
    soundManager.loadMuteState();
    const backgroundMusic = soundManager.registerSound('assets/audio/background.mp3');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.5;
    backgroundMusic.play();
    document.getElementById('startGame').addEventListener('click', () => {
        init();
    });
    document.getElementById('dialogContent').addEventListener('click', (e) => {
        if (e.target === document.getElementById('dialogContent')) closeDialog();
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
    soundManager.loadMuteState();
    soundManager.toggleMuteIcon();
});

/**
 * By click on start, the startscreen is closed and the canvas is running.
 */
function init() {
    document.getElementById('endScreen').classList.add('d_none');
    document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    canvas = document.getElementById('canvas');
    toggleMobileButtons(true);
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
    toggleMobileButtons(true);
    startLevel(currentLevel);
}

/**
 * 
 * @param {string} win - for load WinScreen
 */
function showEndscreen(win) {
    document.getElementById('canvas').classList.add('d_none');
    toggleMobileButtons(false);
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
    document.getElementById('startScreen').classList.remove('d_none');
    toggleMobileButtons(false);
}

function toggleMute() {
    soundManager.toggleMute();
}

function toggleMobileButtons(show) {
    document.querySelectorAll('.button__mobile').forEach(btn => {
        btn.classList.toggle('d_none', !show);
    });
}

function toggleFullscreen() {
    let wrapper = document.querySelector('.game-wrapper');
    if (!document.fullscreenElement) {
        wrapper.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

function handleOrientationChange(e) {
    if (!world) return;
    if (e.matches) {
        world.pauseGame();
    } else {
        world.resumeGame();
    }
}

orientationQuery.addEventListener('change', handleOrientationChange);

function scaleGame() {
    const wrapper = document.querySelector('.game-wrapper');
    const isMobileLandscape = window.matchMedia('(orientation: landscape) and (max-width: 933px)').matches;
    if (!isMobileLandscape || document.fullscreenElement) {
        wrapper.style.transform = '';
        return;
    }
    const scale = Math.min(window.innerWidth / 720, window.innerHeight / 480);
    wrapper.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener('resize', scaleGame);
window.addEventListener('orientationchange', scaleGame);
document.addEventListener('fullscreenchange', scaleGame);
scaleGame();