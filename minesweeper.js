document.addEventListener('DOMContentLoaded', startGame)
const numOfRows = 6;
const numOfColums = 6;
const numOfMines = 9;

// Define your `board` object here!
var board = {
  cells:[],
}

function startGame() {
  // Decide which cell will be mined
  let minedCells = plantMines(numOfRows * numOfColums, numOfMines);
  // filling the board's cells
  for (let i = 0; i < numOfRows; i++) {
    for (let j = 0; j < numOfColums; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: minedCells.includes(i*numOfRows+j)?true:false,
        hidden: true,
        isMarked: false,
        surroundingMines: 0,
      })
    }
  }
  // Counting the Boom
  board.cells.forEach(cell => {
    cell.surroundingMines = countSurroundingMines(cell);
  });
  // add event handlers
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function plantMines(totalNum, mineNum) {
  let mineCounter = mineNum;
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
    lib.displayMessage('You win!');
  }

}

function allNonMinesVisible(cells) {
  console.log('allNonMinesVisible');
  cells.forEach(cell => {
    console.log(cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
    if (!cell.isMine && cell.hidden) {
      console.log('FALSE:',cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
      return false;
    }
  });
  console.log('All non-mines are visible.')
  return true;
}

function allMinesMarked(cells) {
  console.log('allMinesMarked');
  cells.forEach(cell => {
    console.log(cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
    if (cell.isMine && !cell.isMarked) {
      console.log('FALSE:', cell.row, cell.col, cell.isMine, cell.hidden, cell.isMarked);
      return false;
    }
  });
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

