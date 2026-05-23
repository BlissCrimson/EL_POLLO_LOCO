let canvas;
let ctx;
let character = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = '../assets/img/2_character_pepe/1_idle/idle/I-1.png';

    // TODO setTimeout ist later to change
    setTimeout(function () {
        ctx.drawImage(character, 20, 20, 50, 150)
    }, 1000);

}