document.addEventListener('DOMContentLoaded', startGame)
const numOfRows = 5;
const numOfColums = 5;
const numOfMines = 1; // If it is 0, a random number is generated 

// Define your `board` object here!
var board = {
  cells:[],
}

function startGame() {
  // add event handlers
  // document.addEventListener('click', checkForWin);
  // document.addEventListener('contextmenu', checkForWin);
  addBoardEventListeners();
  document.getElementById("restartButton").addEventListener('click', restart);
  // create a new board
  createBoard();
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function addBoardEventListeners() {
  document.getElementById("board").addEventListener('click', checkForWin);
  document.getElementById("board").addEventListener('contextmenu', checkForWin);
}

function restart() {
  document.getElementById("resetSound").play();
  createBoard();
  addBoardEventListeners();
  lib.initBoard();
}

function createBoard() {
  // Initialized cells
  board.cells = [];
  // Decide which cell will be mined
  let minedCells = plantMines(numOfRows * numOfColums, numOfMines);
  // filling the board's cells
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColums; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: minedCells.includes(i * numOfRows + j) ? true : false,
        hidden: true,
        isMarked: false,
        surroundingMines: 0,
      });
    }
  }
  // Counting the Boom
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell);
  });
}

function plantMines(totalNum, mineNum) {
  let mineCounter = mineNum > 0 ? totalNum > mineNum ? mineNum: totalNum - 1 : Math.floor(Math.random()*(totalNum-1))+1;
  let arr = [];
  while (mineCounter > 0) {
    let rn = Math.floor(Math.random() * totalNum);
    if (!arr.includes(rn)) {
      arr.push(rn);
      mineCounter--;
    }
  } 
  return arr;
}

// Define this function to look for a win condition:
function checkForWin() {
  // 1. Are all of the cells that are NOT mines visible?
  if (allNonMinesVisible(board.cells) && allMinesMarked(board.cells)) {
    // You can use this function call to declare a winner (once you've
    // detected that they've won, that is!)
    document.getElementById("winSound").play();
    lib.displayMessage('You win!');
    lib.removeListeners ();
  }
}

function allNonMinesVisible(cells) {
  if (cells == undefined || cells.length == 0) {
    return false;
  }
  console.log('allNonMinesVisible');
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    console.log(cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
    if (!cell.isMine && cell.hidden) {
      console.log('FALSE:',cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
      return false;
    }
  }
  // cells.forEach(cell => {
    // });
    console.log('All non-mines are visible.')
    return true;
  }
  
function allMinesMarked(cells) {
  if (cells == undefined || cells.length == 0) {
    return false;
  }
  console.log('allMinesMarked');
  for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    console.log(cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
    if (cell.isMine && !cell.isMarked) {
      console.log('FALSE:', cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
      return false;
    }
  }
  // cells.forEach(cell => {
  // });
  console.log('All mines are marked.')
  return true;
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines(cell) {
  let cells = lib.getSurroundingCells(cell.row, cell.col);
  let mineCounter = 0;
  cells.forEach(cell => {
    if (cell.isMine) {
      mineCounter++;
    }
  });
  return mineCounter;
}

