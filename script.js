let board = null;
const height = 35;
const width = 50;

class Block {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.active = false;
    }

    get blockUnderneath() {
        let locY = this.y + 1;

        if (locY > height + 1) {
            return this;
        }

        return board[this.x][locY];
    }

    get neighbors() {
        let neighbors = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }

                let x = this.x + i;
                let y = this.y + j;
                if (x < 0 || x > width || y < 0 || y > height) {
                    continue;
                }

                neighbors.push(board[x][y]);
            }
        }

        return neighbors;
    }
}

function printSandCells() {
    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            let element = document.getElementById(i + "_" + j);
            element.style.backgroundColor = "white";

            if (board[i][j].active) {
                element.style.backgroundColor = "#f2d33c";
                //element.style.backgroundColor = "#" + colors[colorToPick];
            }
        }
    }
}

function blockFall() {
    let newBoard = Array.from(Array(width + 1), () => new Array(height + 1));
    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            newBoard[i][j] = new Block(i, j);
        }
    }

    for (let i = 0; i <= width; i++) {
        for (let j = 0; j <= height; j++) {
            let block = board[i][j];

            if (!block.active) {
                continue;
            }

            if (block.blockUnderneath == null || block.blockUnderneath.active) {
                newBoard[i][j].active = true;
                continue;
            }

            newBoard[i][j].active = false;
            newBoard[i][j + 1].active = true;
        }
    }

    board = newBoard;
}

function start() {
    initBoard();
    printSandCells();
    setInterval(function() {
        printSandCells();
        blockFall();
    }, 25);
}

function blockSpawn(x, y) {
    let block = board[x][y];
    let blocks = block.neighbors;

    block.active = true;
    for (let i = 0; i < blocks.length; i++) {
        if (Math.random() < 0.5) {
            blocks[i].active = true;
        }
    }
}

function initBoard() {
    board = Array.from(Array(width + 1), () => new Array(height + 1));

    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            board[i][j] = new Block(i, j);
        }
    }
}