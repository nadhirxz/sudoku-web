export function possible(board, x, y, n) {
    // checking if there's n in the row
    for (let i = 0; i < 9; i++) {
        if (board[x][i] == n) return false;
    }

    // checking if there's n in the column
    for (let i = 0; i < 9; i++) {
        if (board[i][y] == n) return false;
    }

    // checking if there's n in the square
    let a = Math.floor(x / 3) * 3; // getting the first indexes of the square of x y
    let b = Math.floor(y / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[a + i][b + j] == n) return false;
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
            if (j > 0 && j < 8 && (j + 1) % 3 == 0) a += " | ";
        }
        a += "\n";
        if (i > 0 && i < 8 && (i + 1) % 3 == 0) {
            for (let k = 0; k < 33; k++) {
                a += "-";
            }
            a += "\n";
        }
    }
    console.log(a);
}

export function solve(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] == 0) {
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