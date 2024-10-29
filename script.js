document.addEventListener('DOMContentLoaded', () => {
let statusMessage = document.getElementById('statusMessage');
let restartButton = document.getElementById('restartButton');
let cells = Array.from(document.getElementsByClassName('cell'));

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let gameState = Array(9).fill(null);
let gameActive = true;

const canvas = document.querySelector('#spookyConfetti');
const jsConfetti = new JSConfetti();

function cellClicks(event) {
    const id = event.target.id;

    if(!gameActive){
        return;
    }

    if(!gameState[id]){
        gameState[id] = currentPlayer;
        event.target.textContent = currentPlayer;

        const winningCells = checkWinner();
        if(winningCells){
            statusMessage.textContent = "Player " + currentPlayer + " has won!!!";
            gameActive = false;
            jsConfetti.addConfetti({
                emojis: ['🎃','👻','💀','🦇','🐈‍⬛']
            });
            return;
        }else if (!gameState.includes(null)){
            statusMessage.textContent = "It's a draw!!!";
            gameActive = false;
        }else{
            currentPlayer = currentPlayer === X_TEXT ? O_TEXT: X_TEXT;
            statusMessage.textContent = "Player " + currentPlayer + "'s turn";
            return;
        }
    }
}

const winPattern = [
    [0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]
];

function checkWinner(){
    for (const condition of winPattern) {
        let [a, b, c] = condition;
        if(gameState[a] && (gameState[a] == gameState[b] && gameState[a] == gameState[c]))
            return [a,b,c];
    }
    return false;
}

function resetGame(){
    gameState.fill(null);
    currentPlayer = X_TEXT;
    gameActive = true;

    cells.forEach(cell => cell.textContent = "");
    statusMessage.textContent = "Player " + currentPlayer + "'s turn";
}

cells.forEach(cell => cell.addEventListener('click', cellClicks));
restartButton.addEventListener('click', resetGame);
});

/* const statusMessage = document.getElementById("statusMessage");
const restartButton = document.getElementById("restartButton");

const cells = Array.from(document.querySelectorAll(".cell"));

let currentPlayer = "X";
let gameState = ["","","","","","","","",""];
let gameActive = true;

function handleCellClicks(event){
    const clickedCell = event.target.id;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== " " || !gameActive){
        return;
    }

    if (!gameState[clickedCellIndex]){
    gameState[clickedCellIndex] = currentPlayer;
    event.target.innerText = currentPlayer;
    }

    function checkWinner(){
        return gameState[0] === currentPlayer && gameState[1] === currentPlayer && gameState[2] === currentPlayer;
    }

    if (checkWinner()){
        statusMessage.textContent = "Player ", currentPlayer, " Wins!";
        gameActive = false;
    } else if (!gameState.includes("")){
        statusMessage.textContent = "It's a draw!";
        gameActive = false;
    } else { 
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusMessage.textContent = "Player ", currentPlayer, "'s Turn";
    }

    function resetGame(){
        gameState = ["","","","","","","","",""];
        gameActive = true;
        currentPlayer = "X";
        statusMessage.textContent = "Player ", currentPlayer, "'s Turn";

        cells.forEach(cell => cell.textContent = "");
    }

}
cells.forEach(cell => cell.addEventListener("click", handleCellClicks())); */