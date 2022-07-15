

const body = document.querySelector('body');
const range = document.querySelector('input');
const numberRow = document.querySelector('.numberRow');
const board = document.querySelector('.board');
const button = document.querySelector('a');
const menu = document.querySelector('.menu');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
var onPlay = false;
var movement = 'right';
var length = range.value;

var head = {};
var tail = [];
lengthSnake = 1;

const element1 = '#0075FF';
const text1 = '#011627';
const background = '#C1B7AE';
const circle = '#D7DEDC';

function createBoard(lenght) {

    /* delete all the element in board */
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    /* create the board */
    for (var i = 0; i < lenght; i++) {

        /* create the row */
        var row = document.createElement('div');
        row.className = 'line';

        /* create the cases */
        for (var j = 0; j < lenght; j++) {
            var div = document.createElement('div');
            div.className = 'case';
            div.id = i + "." + j;
            if (window.innerHeight > window.innerWidth) {
                var size = window.innerWidth *0.7 / lenght;
            }
            else {
                var size = window.innerHeight *0.6 / lenght;
            }
            div.style.width = size + 'px';
            div.style.height = size + 'px';
            div.style.margin = size * 0.1 + 'px';
            row.appendChild(div);
        }
        board.appendChild(row);
    }
  
};


/* when the range is changed */
range.addEventListener('change', (event) => {
    length = range.value;
    createBoard(length);
  });


function move(direction) {
    tail.push([head]);
    switch (direction) {
        case 'right':
            head[1]++;
            break;
        case 'left':
            head[1]--;
            break;
        case 'up':
            head[0]--;
            break;
        case 'down':
            head[0]++;
            break;
    }
}

function redreaw() {
    createBoard(length);
    var div = document.getElementById(head[0] + "." + head[1]);
    div.style.backgroundColor = element1;
    /*for (var i = 0; i < tail.length; i++) {
        var div = document.getElementById(tail[i][0] + "" + tail[i][1]);
        div.style.backgroundColor = 'black';

    }*/

};


/* start the game */
function game(lenght) {
    var milieu = ( lenght - ( lenght % 2 ) ) / 2;
    head = [milieu, milieu];
    var x = setInterval(function () {
        if (onPlay && head[0] >= 0 && head[0] < lenght && head[1] >= 0 && head[1] < lenght) {
            move(movement)
            redreaw();
        }
        else {
            stop();
            clearInterval(x);
        }
    },500);

};

function stop() {
    onPlay = false;
    button.innerHTML = 'Play';
    numberRow.style.display = 'flex';
    score.style.display = 'none';
}

button.addEventListener('click', () => {
    createBoard(length);
    if (!onPlay) {
        onPlay = true;
        button.innerHTML = 'Stop';
        game(length);
        numberRow.style.display = 'none';
        score.innerHTML = 'Score : 0';
        score.style.display = 'flex';
        highScore.style.display = 'flex';
    }
    else {
        stop();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        movement = 'left';
    }
    else if (event.keyCode == 38) {
        movement = 'up';
    }
    else if (event.keyCode == 39) {
        movement = 'right';
    }
    else if (event.keyCode == 40) {
        movement = 'down';
    }

});

/* main fuction */
function main() {
    lenght = range.value;
    createBoard(length);
};

main();

menu.style.width = board.offsetWidth + 'px';

