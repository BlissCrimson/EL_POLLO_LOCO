let dialogControlls;
let canvas;
let world;
let keyboard = new Keyboard();
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

function openDialog(type) {
    if (type === 'settings') {
        dialogRef = document.getElementById('settingsDialog')
    }
    if (type === 'controlls') {
        dialogRef = document.getElementById('controllsDialog')
    }
    dialogRef.showModal();

}
// to close dialog
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

function init() {
    document.getElementById('startScreen').classList.add('d_none');
    document.getElementById('canvas').classList.remove('d_none');
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {
    keyboard[keyMap[e.key]] = true;
});

window.addEventListener("keyup", (e) => {
    keyboard[keyMap[e.key]] = false;
});
