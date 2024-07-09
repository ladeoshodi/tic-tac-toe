const playerInputForm = document.querySelector(".player-input-form");
const resetButton = document.querySelector(".reset-button");


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

    return { currentBoard, resetBoard, placeMarker, checkEmptyCells, checkWin, checkBoardComplete }
})();

const displayController = (function(){    

    function displayTurn(PlayerName) {
        const playerTurn = document.querySelector(".player-turn-display");
        playerTurn.textContent = `${PlayerName}'s turn to play`;
    }

    function displayMarker(element, marker) {
        element.target.textContent = marker;
    }

    function displayWinner() {
        const playerWinDisplay = document.querySelector(".player-win-display");

    }

    return { displayTurn, displayMarker, displayWinner }

})();

// Create a player object
function createPlayer(name, marker) {
    let playerName = name;
    let playerMarker = marker;

    function play(coordX, coordY, element) {
        gameBoard.placeMarker(coordX, coordY, playerMarker);
        // display marker on the board
        displayController.displayMarker(element, playerMarker);
    }

    return { playerName, playerMarker, play };
}

function playGame(e) {
    e.preventDefault();

    const playerOneInput = document.querySelector("#player-one");
    const playerTwoInput = document.querySelector("#player-two");

    let playerOne = createPlayer(playerOneInput.value, "X");
    let playerTwo = createPlayer(playerTwoInput.value, "O");

    let player = playerOne.playerName;

    // Display the active player
    displayController.displayTurn(player);

    function onCellClick(e) {
        // get the coord of the cell that was clicked
        let cellCoord = e.target.getAttribute("data-coord");

        let coordX, coordY;
        [coordX, coordY] = cellCoord.split(",");

        if (player === playerOne.playerName) {
            playerOne.play(coordX, coordY, e);
            player = playerTwo.playerName;
        } else {
            playerTwo.play(coordX, coordY, e);
            player = playerOne.playerName;
        }

        // Display the active player
        displayController.displayTurn(player);
    }

    // Add event listener to the game board after the game has started
    const gameBoardCells = document.querySelectorAll(".game-board-cell");
    for (let cell of gameBoardCells) {
        // add event listener
        cell.addEventListener("click", onCellClick, {once: true});
    }

    // while (!gameBoard.checkBoardComplete()) {
    //     // break loop if we have a win condition
    //     if (gameBoard.checkWin().win) {
    //         break;
    //     }

    //     

    //     // place the marker on the board
    //     if (player === playerOne.playerName) {
    //         // playerOne.play();
    //         player = playerTwo.playerName;
    //     } else {
    //         // playerTwo.play();
    //         player = playerOne.playerName;
    //     }

    //     // display board after each play
    //     console.log(gameBoard.currentBoard());

    //     break;
    // }

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

// Listen for form submission
playerInputForm.addEventListener("submit", playGame);
