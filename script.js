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

/*
The current code has a few areas that could be optimized for better performance:

Avoiding unnecessary object creation: The blockFall function creates a new array of Block objects every time it's called. This is not only memory-intensive but also computationally expensive. Instead, you could modify the existing Block objects directly.
Optimizing the getBlockFromBoardByLocation function: This function iterates over the entire board every time it's called, which can be slow if the board is large. You could create a two-dimensional array where the first index is the x-coordinate and the second index is the y-coordinate, which would allow you to access blocks directly by their location.
Improving the neighbors getter: The current implementation iterates over the entire board to find the neighbors of a block. This can be optimized by only considering blocks that are adjacent in the x and y directions.
Optimizing the blockFall function: The current implementation checks if a block is active and then checks if the block underneath is not active. This can be optimized by only checking blocks that are active.
*/