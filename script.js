let board = [];
const height = 35;
const width = 30;

class Location {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

class Block {
    constructor(x, y) {
        this.location = new Location(x, y);
        this.active = false;
    }

    get blockUnderneath() {
        let locY = this.location.y + 1;

        if (locY > height) {
            return this;
        }

        for (let block of board) {
            if (block.location.y == locY && block.location.x == this.location.x) {
                return block;
            }
        }
    }

    get neighbors() {
        let neighbors = [];

        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }

                let x = this.location.x + i;
                let y = this.location.y + j;
                if (x < 0 || x > 20 || y < 0 || y > 20) {
                    continue;
                }

                neighbors.push(getBlockFromBoardByLocation(x, y));
            }
        }

        return neighbors;
    }
}

function getBlockFromBoardByLocation(x, y) {
    for (let i = 0; i < board.length; i++) {
        if (board[i].location.x == x && board[i].location.y == y) {
            return board[i];
        }
    }
}

function printSandCells() {
    for (let i = 0; i < board.length; i++) {
        let element = document.getElementById(board[i].location.x + "_" + board[i].location.y);
        element.style.backgroundColor = "white";

        if (board[i].active) {
            element.style.backgroundColor = "#f2d33c";
            //element.style.backgroundColor = "#" + colors[colorToPick];
        }
    }
}

function blockFall() {
    let newBoard = new Array();
    for (let i = 0; i < board.length; i++) {
        newBoard.push(new Block(board[i].location.x, board[i].location.y));
    }

    for (let i = 0; i < board.length; i++) {
        let blockFromBoard = board[i];
        let blockFromNewBoard = newBoard[i];


        if (blockFromBoard.active) {
            blockFromNewBoard.active = true;

            if (blockFromNewBoard.blockUnderneath != null && !blockFromNewBoard.blockUnderneath.active) {
                blockFromNewBoard.active = false;

                for (let j = 0; j < newBoard.length; j++) {
                    if (newBoard[j].location.x == newBoard[i].blockUnderneath.location.x && newBoard[j].location.y == newBoard[i].blockUnderneath.location.y) {
                        newBoard[j].active = true;
                    }
                }
            }
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
    let block = getBlockFromBoardByLocation(x, y);
    let blocks = block.neighbors;

    block.active = true;
    for (let i = 0; i < blocks.length; i++) {
        if (Math.random() < 0.35) {
            blocks[i].active = true;
        }
    }
}

function initBoard() {
    board = new Array();

    for (var i = 0; i <= width; i++) {
        for (var j = 0; j <= height; j++) {
            board.push(new Block(i, j));
        }
    }
}