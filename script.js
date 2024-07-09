const playerInputForm = document.querySelector(".player-input-form");

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
        // reset board internal memory
        board = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]

        // reset board display
        const gameBoardCells = document.querySelectorAll(".game-board-cell");

        gameBoardCells.forEach((cell) => {
            cell.textContent = "";
        });

        const playerWinDisplay = document.querySelector(".player-win-display");
        playerWinDisplay.textContent = "";

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

    function displayPlayerTurn(playerName, playerMarker) {
        const playerTurnDisplay = document.querySelector(".player-turn-display");
        playerTurnDisplay.textContent = `${playerName}'s turn to play [${playerMarker}]`;
    }

    function displayBoardMarker(element, marker) {
        element.target.textContent = marker;
    }

    function displayWinner(playerName, playerDraw=false) {
        const playerWinDisplay = document.querySelector(".player-win-display");
        if (playerDraw) {
            playerWinDisplay.textContent = "It's a draw!";
            alert("It's a draw!");
        } else {
            playerWinDisplay.textContent = `${playerName} wins!`;
            alert(`${playerName} wins!`);
        }
    }

    return { displayPlayerTurn, displayBoardMarker, displayWinner }

})();

// Create a player object
function createPlayer(name, marker) {
    let playerName = name;
    let playerMarker = marker;

    function play(coordX, coordY, element) {
        gameBoard.placeMarker(Number(coordX), Number(coordY), playerMarker);
        // display marker on the board
        displayController.displayBoardMarker(element, playerMarker);
    }

    return { playerName, playerMarker, play };
}

// play game
function playGame(e) {
    e.preventDefault();

    // reset the board
    gameBoard.resetBoard();

    const playerOneInput = document.querySelector("#player-one");
    const playerTwoInput = document.querySelector("#player-two");
    const playerOneInfoDisplay = document.querySelector(".player-one-info");
    const playerTwoInfoDisplay = document.querySelector(".player-two-info");

    let playerOne = createPlayer(playerOneInput.value, "X");
    let playerTwo = createPlayer(playerTwoInput.value, "O");

    // Display the players on the main board
    playerOneInfoDisplay.textContent = playerOne.playerName;
    playerTwoInfoDisplay.textContent = playerTwo.playerName;
   
    // clear the input just before the game starts
    playerOneInput.value = "";
    playerTwoInput.value = "";

    let player = playerOne.playerName;
    let playerMarker = playerOne.playerMarker;

    // Display the active player
    displayController.displayPlayerTurn(player, playerMarker);

    function onCellClick(e) {
        // get the coord of the cell that was clicked
        let cellCoord = e.target.getAttribute("data-coord");

        let coordX, coordY;
        [coordX, coordY] = cellCoord.split(",");

        if (player === playerOne.playerName) {
            playerOne.play(coordX, coordY, e);
            player = playerTwo.playerName;
            playerMarker = playerTwo.playerMarker;
        } else {
            playerTwo.play(coordX, coordY, e);
            player = playerOne.playerName;
            playerMarker = playerOne.playerMarker;
        }

        // Display the active player
        displayController.displayPlayerTurn(player, playerMarker);

        if (gameBoard.checkWin().win) {
            if (gameBoard.checkWin().marker === playerOne.playerMarker) {
                displayController.displayWinner(playerOne.playerName);
            } else {
                displayController.displayWinner(playerTwo.playerName);
            }
        } else if (gameBoard.checkBoardComplete() && !gameBoard.checkWin().win) {
            displayController.displayWinner(player, playerDraw=true);
        }
    }

    // Add event listener to the game board after the game has started
    const gameBoardCells = document.querySelectorAll(".game-board-cell");
    for (let cell of gameBoardCells) {
        // add event listener
        cell.addEventListener("click", onCellClick, {once: true});
    }
};

// start game
playerInputForm.addEventListener("submit", playGame);
