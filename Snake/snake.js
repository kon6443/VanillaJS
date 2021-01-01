let y, x; // player
let cy, cx; // coin
let MY = 20,
  MX = 34; // field size
let score;
let keepMove;
let direction; // 0 1 2 3 상 하 좌 우
let speed;
let snakeQueue = new Array();
let snakeColor = "#ED5B5B",
  tileColor = "#EEEEEE";
(wallColor = "#2E2E2E"), (coinColor = "#4476C6");

function move(direction) {
  switch (direction) {
    case 0:
      y += 1;
      break;
    case 1:
      y -= 1;
      break;
    case 2:
      x -= 1;
      break;
    case 3:
      x += 1;
      break;
    default:
      return;
  }
  if(isInvalidMove(x, y)) gameOver();
  setSnake(x, y);
  meetCoin();
  scoring();
}

/*
function removeSnake() {
    let ty = snakeQueue[0][];
    //let tx = snakeQueue[][];
}
*/

function setSnake(x, y) {
  snakeQueue.push(new Array(x, y));
  document.getElementById(
    String(x) + " " + String(y)
  ).style.background = snakeColor;
}

function drawWall() {
  let wallCell = new Array();
  for (let i = 0; i < MY; i++) wallCell.push(new Array(i, 0));
  for (let i = 0; i < MY; i++) wallCell.push(new Array(i, MX - 1));
  for (let i = 0; i < MX; i++) wallCell.push(new Array(0, i));
  for (let i = 0; i < MX; i++) wallCell.push(new Array(MY - 1, i));
  for (let i = 0; i < wallCell.length; i++) {
    let wy = wallCell[i][0];
    let wx = wallCell[i][1];
    document.getElementById(
      String(wy) + " " + String(wx)
    ).style.background = wallColor;
    document.getElementById(String(wy) + " " + String(wx)).style.borderRadius =
      "1.5px";
  }
}

function drawBoard() {
  let boardTag = "<table border=0>";
  for (let i = 0; i < MY; i++) {
    boardTag += "<tr>";
    for (let j = 0; j < MX; j++)
      boardTag += '<td id="' + String(i) + " " + String(j) + '"></td>';
    boardTag += "</tr>";
  }
  boardTag += "</table>";
  document.write(boardTag);
}

document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e) {
    if((e.keyCode === 38) && (direction !== 1)) direction = 0;
    else if((e.keyCode === 40) && (direction !== 0)) direction = 1;
    else if((e.keyCode === 37) && (direction !== 3)) direction = 2;
    else if((e.keyCode === 39) && (direction !== 2)) direction = 3;
}

function init() {
  drawBoard();
  drawWall();
  y = parseInt(MY / 2);
  x = parseInt(MX / 2);
  setSnake(x, y);
  setCoin();
  score = 0;
  direction = -1;
  speed = 75;
  keepMove = setInterval("move(direction)", speed);
}

init();
