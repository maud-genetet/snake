/* variable */
const body = document.querySelector('body');
const range = document.querySelector('input');
const numberRow = document.querySelector('.numberRow');
const board = document.querySelector('.board');
const button = document.querySelector('a');
const menu = document.querySelector('.menu');
const score = document.querySelector('.score');
const highScore = document.querySelector('.highScore');
const rules = document.querySelector('.rules');
const arrow = document.querySelector('.arrow');
const downArrow = document.getElementById('downArrow');
const topArrow = document.getElementById('topArrow');
const leftArrow = document.getElementById('leftArrow');
const rightArrow = document.getElementById('rightArrow');
var onPlay = false;
var movement = 'right';
var length = range.value;

var head = {};
var tailX = [];
var tailY = [];
var lengthTail = 3;
var highScoreNumber = 0;
var fruit = {};
var time = 200;

/* color in css */
const element1 = '#0075FF';
const text1 = '#011627';
const background = '#C1B7AE';
const circle = '#D7DEDC';
const fruitColor = '#e63952';

/* create the board */
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

/* move head's snake */
function moveHead(direction) {
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

/* move tailX's snake */
function moveTail() {
    if (tailX.length < lengthTail) {
        tailX.push(head[0]);
        tailY.push(head[1]);
    }
    else {
        var x = tailX.shift();
        var y = tailY.shift();
        var div = document.getElementById(x + "." + y);
        div.style.backgroundColor = circle;
        tailX.push(head[0]);
        tailY.push(head[1]);
    }
    var headDiv = document.getElementById(head[0] + "." + head[1]);
    headDiv.style.backgroundColor = element1;
}

/* view if the snake go to an obsatcle */
function isOnObstacle() {
    var div = document.getElementById(head[0] + "." + head[1]);
    for (var i = 0; i < tailX.length; i++) {
        var div2 = document.getElementById(tailX[i] + "." + tailY[i]);
        if (div == div2) {
            stop();
        }
    }
    if (head[0] == fruit[0] && head[1] == fruit[1]) {
        console.log('fruit');
        lengthTail++;
        score.innerHTML = "Score : " + (lengthTail-3);
        div.style.backgroundColor = element1;
        putFruit();
    }
    if (highScoreNumber < lengthTail-3) {
        highScoreNumber = lengthTail-3;
    }
    highScore.innerHTML = "HighScore : " + highScoreNumber;
};

/* put a random fruit */
function putFruit() {
    fruit[0] = Math.floor(Math.random() * length);
    fruit[1] = Math.floor(Math.random() * length);
    var div = document.getElementById(fruit[0] + "." + fruit[1]);
    if (div.style.backgroundColor == element1) {
        putFruit();
    }
    else {
        div.style.backgroundColor = fruitColor;
    }
}

/* start the game */
function game(lenght) {
    var milieu = ( lenght - ( lenght % 2 ) ) / 2;
    head = [milieu, milieu];
    putFruit();
    var x = setInterval(function () {
        if (onPlay && head[0] >= 0 && head[0] < lenght && head[1] >= 0 && head[1] < lenght) {
            moveTail();
            moveHead(movement)
            isOnObstacle();
        }
        else {
            stop();
            clearInterval(x);
        }
    },time);
};

/* element stop */
function stop() {
    onPlay = false;
    button.innerHTML = 'Play';
    numberRow.style.display = 'flex';
    score.style.display = 'none';
    score.innerHTML = 'Score : 0';
    while (tailX.length > 0) {
        tailX.pop();
        tailY.pop();
    }
    lengthTail = 3;
    createBoard(length);
};

/* start or stop the game */
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

/* move the snake */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 37) {
        if (movement != 'right') {
            movement = 'left';
        }
    }
    else if (event.keyCode == 38) {
        if (movement != 'down') {
            movement = 'up';
        }
    }
    else if (event.keyCode == 39) {
        if (movement != 'left') {
            movement = 'right';
        }
    }
    else if (event.keyCode == 40) {
        if (movement != 'up') {
            movement = 'down';
        }
    }

});

rules.addEventListener('click', () => {
    rules.remove();
});

topArrow.addEventListener('click', () => {
    if (movement != 'down') {
        movement = 'up';
    }
});

downArrow.addEventListener('click', () => {
    if (movement != 'up') {
        movement = 'down';
    }
});

leftArrow.addEventListener('click', () => {
    if (movement != 'right') {
        movement = 'left';
    }
});

rightArrow.addEventListener('click', () => {
    if (movement != 'left') {
        movement = 'right';
    }
});

/* main function */
function main() {
    lenght = range.value;
    createBoard(length);
    menu.style.width = board.offsetWidth + 'px';
    if (window.innerHeight > window.innerWidth) {
        rules.remove();
    }
    else {
        arrow.remove();
    }
};

main();