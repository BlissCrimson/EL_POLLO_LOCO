let dialogRef;
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

function openDialog() {
    dialogRef = document.getElementById('controllsDialog')
    dialogRef.showModal();
    // footerDialogRef.innerHTML = dialogFooter();
    event.stopPropagation(event);
    return dialogRef.showModal();
}
// to close dialog
function closeDialog() {
    dialogRef.close();
}

function dialogClose() {
    dialogRef.close();
}

document.addEventListener('DOMContentLoaded', (e) => {
    document.getElementById('startGame').addEventListener('click', () => {
        init();
    });
    document.getElementById('controllsDialog').addEventListener('click', (e) => {
        if (e.target === document.getElementById('controllsDialog')) closeDialog();
    });
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
