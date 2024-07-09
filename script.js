// create game board
const gameBoard = (function() {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    let boardCoord = [
        // row coordinates
        [[0, 0], [0, 1], [0, 2]],
        [[1, 0], [1, 1], [1, 2]],
        [[2, 0], [2, 1], [2, 2]],
        // column coordinates
        [[0, 0], [1, 0], [2, 0]],
        [[0, 1], [1, 1], [2, 1]],
        [[0, 2], [1, 2], [2, 2]],
        // diagonals
        [[0, 0], [1, 1], [2, 2]],
        [[0, 2], [1, 1], [2, 0]]
    ]

    function currentBoard() {
        return board
    }

    function resetBoard() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }

    function placeMarker(coordX, coordY, marker) {
        board[coordX][coordY] = marker;
    }

    function getCell(coord1, coord2, coord3) {
        return [
            board[coord1[0]][coord1[1]],
            board[coord2[0]][coord2[1]],
            board[coord3[0]][coord3[1]]
        ]
    }

    function checkEmptyCells(coord1, coord2, coord3) {
        let cells = getCell(coord1, coord2, coord3);
        if (cells.includes("")) {
            return true;
        }
        return false;
    }

    function checkEqualCells(coord1, coord2, coord3) {
        let cells = getCell(coord1, coord2, coord3);
        return {
            win: cells[0] === cells[1] && cells[1] === cells[2],
            marker: cells[0]
        };
    }

    function checkWin() {
        let gameResult = {win: false, marker: ""};
        for (const coord of boardCoord) {
            if (!checkEmptyCells(coord[0], coord[1], coord[2])) {
                gameResult = checkEqualCells(coord[0], coord[1], coord[2]);
                if (gameResult.win) {
                    return gameResult;
                }
            }
        }
        return gameResult
    }

    function checkBoardComplete() {
        for (const coord of boardCoord) {
            if (checkEmptyCells(coord[0], coord[1], coord[2])) {
                return false;
            }
        }
        return true;
    }

    return { currentBoard, resetBoard, placeMarker, checkEmptyCells, checkWin, checkBoardComplete}
})();


// Create a player object
function createPlayer(name, marker) {
    let playerName = name;
    let playerMarker = marker;

    function play() {
        let coordX = prompt(`${playerName}: please enter a row`);
        let coordY = prompt(`${playerName}: please enter a column`);
        gameBoard.placeMarker(coordX, coordY, playerMarker);
    }

    return { playerName, playerMarker, play };
}

function playGame() {
    let playerOne = createPlayer(prompt("Player One: please enter your name"), "X");
    let playerTwo = createPlayer(prompt("Player Two: please enter your name"), "O");
    let player = playerOne.playerName;

    while (!gameBoard.checkBoardComplete()) {
        // break loop if we have a win condition
        if (gameBoard.checkWin().win) {
            break;
        }

        console.log(`it's ${player}'s turn`);

        // place the marker on the board
        if (player === playerOne.playerName) {
            playerOne.play();
            player = playerTwo.playerName;
        } else {
            playerTwo.play();
            player = playerOne.playerName;
        }

        // display board after each play
        console.log(gameBoard.currentBoard());
    }

    if (gameBoard.checkWin().win) {
        if (gameBoard.checkWin().marker === playerOne.playerMarker) {
            console.log(`${playerOne.playerName} wins!!!`)
        } else {
            console.log(`${playerTwo.playerName} wins!!!`)
        }
    } else {
        console.log("It's a draw!")
    }
};

// play game
console.log("This is a tic tac toe game on the console");
console.log("You win by ensuring that 3 of your markers ('X' or 'O') lines up vertically, horizontally or diagonally");

playGame();
