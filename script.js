// Create a player object
function createPlayer (name) {

    return {name};
}




function playGame() {
    let playerOne = createPlayer(prompt("Player One: please enter your name"));
    let playerTwo = createPlayer(prompt("Player Two: please enter your name"));

    console.log({
        playerOne: playerOne.name,
        playerTwo: playerTwo.name
    })
};





// play game
console.log("This is a tic tac toe game on the console");
console.log("You win by ensuring that 3 of your tokens ('X' or 'O') lines up vertically, horizontally or diagonally");

playGame();
