import Board from './components/Board';
import ReactDOMServer from 'react-dom/server';

export function possible(board, x, y, n) {
    // checking if there's n in the row
    for (let i = 0; i < 9; i++) {
        if (i != y && board[x][i] === n) return false;
    }

    // checking if there's n in the column
    for (let i = 0; i < 9; i++) {
        if (i != x && board[i][y] === n) return false;
    }

    // checking if there's n in the square
    let a = Math.floor(x / 3) * 3; // getting the first indexes of the square of x y
    let b = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if ((a + i) != x && (b + j) != y && board[a + i][b + j] === n) return false;
        }
    }

    // if every test is passed
    return true;
}

export function print(board) {
    let a = "";
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            a += " " + board[i][j] + " ";
            if (j > 0 && j < 8 && (j + 1) % 3 === 0) a += " | ";
        }
        a += "\n";
        if (i > 0 && i < 8 && (i + 1) % 3 === 0) {
            for (let k = 0; k < 33; k++) {
                a += "-";
            }
            a += "\n";
        }
    }
    console.log(a);
}

function solved(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0 || !possible(board, i, j, board[i][j])) return false;
        }
    }
    return true;
}

export function solve(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) {
                let possibleNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
                let rand = randomInteger(0, possibleNumbers.length);
                let n = possibleNumbers[rand];
                possibleNumbers.splice(rand, 1)
                while (true) {
                    if (possible(board, i, j, n)) {
                        board[i][j] = n;
                        if (solve(board)) return true;
                        board[i][j] = 0;
                    }
                    if (possibleNumbers.length) {
                        let rand = randomInteger(0, possibleNumbers.length);
                        n = possibleNumbers[rand];
                        possibleNumbers.splice(rand, 1)
                    }
                    else break;
                }
                return false;
            }
        }
    }
    return true;
}

export function generateBoard(number) { // the higher the number the more blanks there are
    // let board = [
    //     [0, 3, 4, 6, 7, 8, 9, 1, 2],
    //     [6, 7, 2, 1, 9, 5, 3, 4, 8],
    //     [1, 9, 8, 3, 4, 2, 5, 6, 7],

    //     [8, 5, 9, 7, 6, 1, 4, 2, 3],
    //     [4, 2, 6, 8, 5, 3, 7, 9, 1],
    //     [7, 1, 3, 9, 2, 4, 8, 5, 6],

    //     [9, 6, 1, 5, 3, 7, 2, 8, 4],
    //     [2, 8, 7, 4, 1, 9, 6, 3, 5],
    //     [3, 4, 5, 2, 8, 6, 1, 7, 9],
    // ]
    let board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];

    if (number > 8) number = 8;
    if (number < 1) number = 1;

    // we solve the board
    solve(board);

    // and then make some squares blank
    let a = [];
    for (let i = 0; i < 9; i++) {
        a[i] = [];
        for (let j = 0; j < randomInteger(Math.max(0, (number - 2)), Math.min(8, (number + 2))); j++) {
            let b = randomInteger(0, 9); // the index of the column we want to fill
            while (a[i].includes(b)) b = randomInteger(0, 9);
            a[i].push(b);
        }

        for (let j = 0; j < a[i].length; j++) {
            board[i][a[i][j]] = 0;
        }
    }

    return board;
}

function randomInteger(min, max) {
    max--;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function setCells(board) {
    cells = Array.from(document.getElementsByClassName('cell'));
    var clickedCell = false;
    cells.forEach(cell => {
        cell.addEventListener('click', () => {
            if (cell.classList.contains('clicked')) {
                cell.classList.remove('clicked');
                clickedCell = false;
                document.onkeypress = null;
            } else if (!cell.classList.contains('locked')) {
                cell.classList.add('clicked');
                if (clickedCell) clickedCell.classList.remove('clicked');
                clickedCell = cell;
                document.onkeypress = (e) => keyPress(parseInt(e.key), cell, board);
            }
        });
    });
    return cells;
}

export async function showCells(c) {
    let cells = [];
    while (c.length) cells.push(c.splice(0, 9));
    for (const row of cells) {
        await new Promise((resolve) => {
            setTimeout(async () => {
                for (const cell of row) {
                    await new Promise((resolve) => {
                        setTimeout(() => {
                            cell.getElementsByClassName('inner-cell')[0].style.opacity = 1;
                            resolve();
                        }, 70);
                    });
                    resolve();
                }
            }, 70)
        });
    }
}

function keyPress(key, cell, board) {
    let cellNum = cell.id.split('-').map(e => parseInt(e)), x = cellNum[0], y = cellNum[1];
    if (key == 0) {
        board[x][y] = 0;
        cell.children[0].innerHTML = "";
        cell.classList.remove('possible');
        cell.classList.remove('not-possible');
        cell.classList.add('clicked');
    } else if (key != board[x][y] && !isNaN(key) && key < 10) {
        cell.children[0].innerHTML = key;
        cell.classList.remove('possible');
        cell.classList.remove('not-possible');
        if (possible(board, x, y, key)) {
            cell.classList.add('possible');
        } else {
            cell.classList.add('not-possible');
        }
        board[x][y] = key;
    }
    if (solved(board)) boardIsSolved(cell);
}

function boardIsSolved(lastCell) {
    lastCell.classList.remove('clicked');
    document.onkeypress = (e) => e.stopPropagation();
    clearInterval(timer);

    document.getElementById('board-button-div').innerHTML = `<button id="board-button" class="btn">New Game</button>`;

    document.getElementById('board-message').style.opacity = 1;
    document.getElementById('board-button').style.opacity = 1;
    document.getElementById('board-button').addEventListener('click', () => newGame());
}


export function newGame() {
    let container = document.getElementById('container');

    board = generateBoard(difficulty);

    container.innerHTML = ReactDOMServer.renderToString(<Board board={board} />);
    setTimeout(() => startTimer(1000, 'timer'), 200);
    container.style.opacity = 1;

    document.getElementsByTagName('svg')[0].addEventListener('click', newGame);

    document.getElementById('diff-plus').addEventListener('click', () => {
        if (difficulty < 8) {
            difficulty++;
            setDifficulty();
        }
    });
    document.getElementById('diff-minus').addEventListener('click', () => {
        if (difficulty > 1) {
            difficulty--;
            setDifficulty();
        }
    });

    let cells = setCells(board);
    showCells(cells);
}

function setDifficulty() {
    document.getElementById('difficulty').innerHTML = 'Difficulty: ' + difficulty;
    document.getElementById('diff-bar').style.width = `${(difficulty/8)*100}%`;
    newGame();
}

export function startTimer(waitingTime, id) {
    let seconds = 0;
    let timerDiv = document.getElementById(id);
    timerDiv.style.opacity = 1;
    setTimeout(() => {
        timerDiv.style.opacity = 1;
        timer = setInterval(() => {
            seconds++;
            timerDiv.innerHTML = `${pad(parseInt(seconds / 60))}:${pad(seconds % 60)}`;
        }, 1000);
    }, waitingTime);
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) return "0" + valString;
    return valString;
}

var cells;
export var difficulty = 5;
export var board = generateBoard(1);
export var timer;