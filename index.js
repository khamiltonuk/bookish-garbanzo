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
  console.log();
  turn(e.target.id, huPlayer);
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
      gameWon = { index: index, player: player };
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
  for (let index of winCombos[gameWon.index]) {
    document.getElementById(index).classList.add(`winning`);
    // document.getElementById(index).classList.add(`winning-${gameWon.player}`);
  }
  pauseGame = true;
  //endGameOverlay.classList.remove("hidden");
  //alert("gameover");
}

startGame();
