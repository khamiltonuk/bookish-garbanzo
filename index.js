let origBoard;
let pauseGame = false;
const huPlayer = "O";
const aiPlayer = "X";
const winCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [6, 4, 2]
];
const endGameOverlay = document.querySelector(".game-over");
const cells = document.querySelectorAll("td");
const gameBoard = document.querySelector(".game-board table");
gameBoard.addEventListener("click", turnClick, false);

function turnClick(e) {
  if (typeof origBoard[e.target.id] === "number") {
    if (!checkTie()) {
      turn(e.target.id, huPlayer);
      turn(bestSpot(), aiPlayer);
    }
  }
}

function checkTie() {
  if (emptySquares().length === 0) {
    gameBoard.classList.add("tie");
    pauseGame = true;
    declareWinner("Tie game");
  }
}

function declareWinner(message) {
  endGameOverlay.classList.remove("hidden");
  endGameOverlay.querySelector("h2").innerText = message;
}

function emptySquares() {
  return origBoard.filter(s => typeof s == "number");
}

function bestSpot() {
  return emptySquares()[0];
}

function turn(squareId, player) {
  if (pauseGame) {
    return;
  }
  origBoard[squareId] = player;
  document.getElementById(squareId).innerText = player;
  let gameWon = checkWin(origBoard, player);
  if (gameWon) gameOver(gameWon);
}

function checkWin(board, player) {
  let plays = board.reduce((acc, el, idx) => {
    return el === player ? acc.concat(idx) : acc;
  }, []);
  let gameWon = null;
  for (let [index, win] of winCombos.entries()) {
    if (win.every(elem => plays.indexOf(elem) > -1)) {
      gameWon = { index, player };
      break;
    }
  }
  return gameWon;
}

function startGame() {
  pauseGame = false;
  endGameOverlay.classList.add("hidden");
  origBoard = Array.from(Array(9).keys());
  for (var i = 0; i < cells.length; i++) {
    cells[i].innerText = "";
    cells[i].classList.remove("winning");
  }
}

function gameOver(gameWon) {
  declareWinner(`${gameWon.player === "O" ? "human" : "computer"} Wins`);
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).classList.add(`winning`);
    // document.getElementById(index).classList.add(`winning-${gameWon.player}`);
  }
  pauseGame = true;
  //endGameOverlay.classList.remove("hidden");
  //alert("gameover");
}

startGame();
