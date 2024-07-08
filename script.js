// create game board
const gameBoard = (function() {
    let board = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    function currentBoard() {
        return board
    }

    function placeToken(coordX, coordY, token) {
        board[coordX][coordY] = token;
    }

    function checkWin() {
        let gameResult;
        // check row
        if (!board[0].includes("")) {
            if (board[0][0] === board [0][1] && board[0][1] === board[0][2]) {
                gameResult = {win: true, token: board[0][0]}
            }
        } else if (!board[1].includes("")) {
            if (board[1][0] === board [1][1] && board[1][1] === board[1][2]) {
                gameResult = {win: true, token: board[1][0]}
            }
        } else if (!board[2].includes("")) {
            if (board[2][0] === board [2][1] && board[0][1] === board[2][2]) {
                gameResult = {win: true, token: board[2][0]}
            }
        // check column
        } else if (board[0][0] !== "" && board[1][0] !== "" && board[2][0] !== "") {
            if (board[0][0] === board [1][0] && board[1][0] === board[2][0]) {
                gameResult = {win: true, token: board[0][0]}
            }
        } else if (board[0][1] !== "" && board[1][1] !== "" && board[2][1] !== "") {
            if (board[0][1] === board [1][1] && board[1][1] === board[2][1]) {
                gameResult = {win: true, token: board[0][1]}
            }
        } else if (board[0][2] !== "" && board[1][2] !== "" && board[2][2] !== "") {
            if (board[0][2] === board [1][2] && board[1][0] === board[2][2]) {
                gameResult = {win: true, token: board[0][2]}
            }
        // check diagonal
        } else if (board[0][0] !== "" && board[1][1] !== "" && board[2][2] !== "") {
            if (board[0][0] === board [1][1] && board[1][1] === board[2][2]) {
                gameResult = {win: true, token: board[0][0]}
            }
        } else if (board[0][2] !== "" && board[1][1] !== "" && board[2][0] !== "") {
            if (board[0][2] === board [1][1] && board[1][1] === board[2][0]) {
                gameResult = {win: true, token: board[0][2]}
            }
        } else {
            gameResult = {win: false, token: ""}
        }

        return gameResult;
    }

    function reset() {
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]
    }

    return { currentBoard, placeToken, checkWin, reset }
})();


// Create a player object
function createPlayer(name, token) {
    let playerName = name;
    let playerToken = token;

    return { playerName, playerToken };
}

function playGame() {
    let playerOne = createPlayer(prompt("Player One: please enter your name"), "X");
    let playerTwo = createPlayer(prompt("Player Two: please enter your name"), "O");

    console.log({
        playerOne: playerOne.name,
        playerTwo: playerTwo.name
    })
};

// play game
console.log("This is a tic tac toe game on the console");
console.log("You win by ensuring that 3 of your tokens ('X' or 'O') lines up vertically, horizontally or diagonally");

// playGame();
