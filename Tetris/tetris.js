const KEY = {
  ESC: 27,
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  P: 80,
};

let height = 34; // field size
let width = 20; // field size
let tileColor = "rgb(9,17,26)",
  tetrominoColor,
  wallColor = "#7D7D7D";
let currentColorIndex, nextColorIndex;
let currentRotateIndex = 0;
let currentTetromino, nextTetromino;
let tetrominoPoint;
let generatePoint = [1, Math.floor(width / 2) - 2];
let tetrominoCell;
let movingSpeed,
  initSpeed = 500;
let deltaSpeed = 40;
let fastSpeed = 25;
let score,
  level,
  levelStack = 0;

let TETROMINOES = [
  [
    // I
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // J
    [
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // L
    [
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 1],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 1],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // ㅁ
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // ㅗ
    [
      [0, 0, 1, 0],
      [0, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 0, 0],
      [0, 1, 1, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // ㄹ(1)
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 0, 0],
      [0, 1, 1, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
  [
    // ㄹ(2)
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 0, 1, 0],
      [0, 1, 1, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
    ],
    [
      [0, 1, 1, 0],
      [0, 0, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  ],
];

let tetrominoColorArray = [
  "rgb(199,82,82)",
  "rgb(233,174,43)",
  "rgb(105,155,55)",
  "rgb(53,135,145)",
  "rgb(49,95,151)",
  "rgb(102,86,167)",
];

function canRotate() {
  let tempTetromino = tetromino;
  for()i=0;i<tetromino.length;i++ {
    
  }
}

function rotateTetromino() {
  if (!canRotate()) return;
  removeTetromino();
  tetrominoCell = [];
  currentRotateIndex++;
  if (currentRotateIndex === 4) currentRotateIndex = 0;
  tetromino = TETROMINOES[currentTetromino][currentRotateIndex];
  console.log("tetromino: ", tetromino);
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino.length; j++) {
      if (tetromino[i][j] === 1) {
        let sy = tetrominoPoint[0] + j;
        let sx = tetrominoPoint[1] + i;
        shortCut(
          Math.floor(sy),
          Math.floor(sx)
        ).style.background = tetrominoColor;
        tetrominoCell.push([sy, sx]);
      }
    }
  }
}

function moveDown() {
  if (!canMove(1, 0)) {
    commitExist();
    checkLine();
    tetrominoCell = [];
    generateTetromino();
    return;
  }
  removeTetromino();
  for (let i = 0; i < tetrominoCell.length; i++) tetrominoCell[i][0]++;
  tetrominoPoint[0]++;
  showTetromino();
  movingThread = setTime("moveDown()", movingSpeed);
}

function initNextTable() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      shortCut(String(i), String(j)).style.background = "#7D7D7D";
    }
  }
}

function generateTetromino() {
  for (let i = 0; i < 2; i++) tetrominoPoint[i] = generatePoint[i];
  currentTetromino = nextTetromino;
  currentColorIndex = nextColorIndex;
  tetrominoColor = tetrominoColorArray[currentColorIndex];
  let tetromino = TETROMINOES[currentTetromino][0];
  pickingNextTetromino();
  pickingNextColor();
  displayNextTetromino();
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino.length; j++) {
      if (tetromino[i][j] === 1) {
        let sy = tetrominoPoint[0] + j;
        let sx = tetrominoPoint[1] + i;
        shortCut(
          Math.floor(sy),
          Math.floor(sx)
        ).style.background = tetrominoColor;
        tetrominoCell.push([sy, sx]);
      }
    }
  }
  levelStack++;
  //leveling();
  movingThread = setTimeout("moveDown()", movingSpeed);
}

function displayNextTetromino() {
  initNextTable();
  let tetromino = TETROMINOES[nextTetromino][0];
  let color = tetrominoColorArray[nextColorIndex];
  for (let i = 0; i < tetromino.length; i++) {
    for (let j = 0; j < tetromino.length; j++) {
      if (tetromino[i][j] === 1) shortCut(j, i).style.background = color;
    }
  }
}

function pickingNextColor() {
  if (++nextColorIndex === tetrominoColorArray.length) nextColorIndex = 0;
}

function pickingNextTetromino() {
  nextTetromino = Math.floor(Math.random() * TETROMINOES.length);
}

function setWall() {
  for (var i = 0; i < height; i++) {
    shortCut(i, 0).style.background = wallColor;
    shortCut(i, width - 1).style.background = wallColor;
    realField[i][0] = true;
    realField[i][width - 1] = true;
  }
  for (var i = 0; i < width; i++) {
    shortCut(0, i).style.background = wallColor;
    shortCut(height - 1, i).style.background = wallColor;
    realField[0][i] = true;
    realField[height - 1][i] = true;
  }
}

function shortCut(y, x) {
  var temp = document.getElementById(String(y) + " " + String(x));
  return temp;
}

//  generating a real field
function generateField() {
  //  making an a height length array
  realField = new Array(height);
  //    each element of the array is a width length array (which is a 2D array)
  for (let i = 0; i < height; i++) realField[i] = new Array(width);
  // every single array has false value to make sure that all the field are empty.
  for (let i = 0; i < height; i++)
    for (let j = 0; j < width; j++) realField[i][j] = false;
}

//  drawing a field visually
function drawField() {
  let fieldTag = '<table id="gameTable" border=0>';
  for (let i = 0; i < height; i++) {
    fieldTag += "<tr>";
    for (let j = 0; j < width; j++) {
      fieldTag += '<td id="' + String(i) + " " + String(j) + '"></td>';
    }
    fieldTag += "</tr>";
  }
  document.write(fieldTag);
}

document.onkeyup = keyUpEventHandler;
function keyUpEventHandler(e) {
  if (e.keyCode === KEY.DOWN) moveSlow();
}

document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
  switch (e.keyCode) {
    case KEY.LEFT:
      setTimeOut("moveLR(-1)", 0);
      break;
    case KEY.RIGHT:
      setTimeOut("moveLR(1)", 0);
      break;
    case KEY.SPACE:
      setTimeOut("rotateTetromino()", 0);
      break;
    case KEY.DOWN:
      moveFast();
      break;
    case KEY.P:
      pause();
      break;
  }
}

function init() {
  drawField();
  generateField();
  setWall();
  nextColorIndex = -1;
  movingSpeed = initSpeed;
  tetrominoCell = [];
  tetrominoPoint = [1, 1];
  score = 0;
  level = 1;
  pickingNextTetromino();
  pickingNextColor();
  generateTetromino();
}

init();
