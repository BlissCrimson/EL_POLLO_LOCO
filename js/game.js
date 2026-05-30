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

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);
}

window.addEventListener("keydown", (e) => {
    keyboard[keyMap[e.key]] = true;
    console.log(keyMap[e.key]);
    console.log(keyboard);

});

window.addEventListener("keyup", (e) => {
    keyboard[keyMap[e.key]] = false;
});
