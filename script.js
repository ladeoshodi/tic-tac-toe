// create game board
const gameBoard = (function() {
    let board = [
        ["1", "2", ""],
        ["4", "5", "6"],
        ["7", "8", "9"]
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

    function getCell(coord1, coord2, coord3) {
        return [
            board[coord1[0]][coord1[1]],
            board[coord2[0]][coord2[1]],
            board[coord3[0]][coord3[1]]
        ]
    }

    function placeMarker(coordX, coordY, marker) {
        board[coordX][coordY] = marker;
    }

    function checkEmptyCells() {
        for (const coord of boardCoord) {
            let cells = getCell(coord[0], coord[1], coord[2]);
            if (cells.includes("")) {
                return true;
            }
        }
        return false;
    }

    function checkWin() {
        let gameResult = {win: false, marker: ""};
        // check row
        if (board[0][0] !== "" && board[0][1] !== "" && board[0][2] !== "") {
            if (board[0][0] === board[0][1] && board[0][1] === board[0][2]) {
                gameResult = {win: true, marker: board[0][0]}
            }
        } else if (board[1][0] !== "" && board[1][1] !== "" && board[1][2] !== "") {
            if (board[1][0] === board[1][1] && board[1][1] === board[1][2]) {
                gameResult = {win: true, marker: board[1][0]}
            }
        } else if (board[2][0] !== "" && board[2][1] !== "" && board[2][2] !== "") {
            if (board[2][0] === board[2][1] && board[2][1] === board[2][2]) {
                gameResult = {win: true, marker: board[2][0]}
            }
        }
        
        // check column
        if (board[0][0] !== "" && board[1][0] !== "" && board[2][0] !== "") {
            if (board[0][0] === board[1][0] && board[1][0] === board[2][0]) {
                gameResult = {win: true, marker: board[0][0]}
            }
        } else if (board[0][1] !== "" && board[1][1] !== "" && board[2][1] !== "") {
            if (board[0][1] === board[1][1] && board[1][1] === board[2][1]) {
                gameResult = {win: true, marker: board[0][1]}
            }
        } else if (board[0][2] !== "" && board[1][2] !== "" && board[2][2] !== "") {
            if (board[0][2] === board[1][2] && board[1][2] === board[2][2]) {
                gameResult = {win: true, marker: board[0][2]}
            }
        }

        // check diagonal
        if (board[0][0] !== "" && board[1][1] !== "" && board[2][2] !== "") {
            if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
                gameResult = {win: true, marker: board[0][0]}
            }
        } else if (board[0][2] !== "" && board[1][1] !== "" && board[2][0] !== "") {
            if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
                gameResult = {win: true, marker: board[0][2]}
            }
        } 

        return gameResult;
    }

    return { currentBoard, resetBoard, placeMarker, checkEmptyCells, checkWin }
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

    while (gameBoard.checkEmptyCells()) {
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

        if (gameBoard.checkWin().win) {
            break;
        }
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

// playGame();
