const form = document.querySelector(".js-form");
const input = form.querySelector("input");
const greeting = document.querySelector(".js-greetings");

let y, x; // player
let cy, cx; // coin
let MY = 20,
  MX = 34; // field size
let score;
let keepMove;
let direction; // 0 1 2 3 상 하 좌 우
let speed;
let snakeQueue = new Array();
let snakeColor = "#A52A2A",
  tileColor = "#EEEEEE",
  wallColor = "#2E2E2E",
  coinColor = "#4476C6";

let givenName;

const SHOWING_CN = "showing";

/*
let rankObject = {
  score: 0,
  name: null,
};
*/

function gameOver() {
  console.log(localStorage.getItem(rankObject));
  alert("[Game Over]\nScore: " + score);
  if (isNewRecord()) saveNewRecord();
  init();
  location.reload();
}

function scoring() {
  document.getElementById("score").innerHTML = score;
}

function isCoin() {
  return y == cy && x == cx;
}

function setCoin() {
  do {
    let rand = Math.floor(Math.random() * ((MY - 2) * (MX - 2)));
    cy = Math.floor(rand / (MX - 2)) + 1;
    cx = (rand % (MX - 2)) + 1;
  } while (isInQueue(cy, cx));
  document.getElementById(
    String(cy) + " " + String(cx)
  ).style.background = coinColor;
  document.getElementById(String(cy) + " " + String(cx)).style.borderRadius =
    "6px";
}

function isInQueue(y, x) {
  let p = new Array(y, x);
  for (let i = 0; i < snakeQueue.length; i++)
    if (snakeQueue[i][0] === p[0] && snakeQueue[i][1] === p[1]) return true;
  return false;
}
//("");

function isCollapsed(y, x) {
  if (isInQueue(y, x)) return true;
  return false;
}

function isInvalidMove(y, x) {
  return y == 0 || y == MY - 1 || x == 0 || x == MX - 1 || isCollapsed(y, x);
}

function showPlus() {
  let plusedScore = 100 * (snakeQueue.length - 1);

  // showing + score
  document.getElementById("plus").innerHTML = "     +" + plusedScore;
  // remove the plused scored on the board
  setTimeout('document.getElementById("plus").innerHTML=""', 1000);
}

function meetCoin() {
  if (isCoin()) {
    score += 100 * (snakeQueue.length - 1);
    setCoin();
    showPlus();
    document.getElementById(String(y) + " " + String(x)).style.borderRadius =
      "3px";
  } else {
    removeSnake(y, x);
    score += snakeQueue.length;
  }
}

function move(direction) {
  switch (direction) {
    case 0:
      y -= 1;
      break;
    case 1:
      y += 1;
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
  if (isInvalidMove(y, x)) gameOver();
  setSnake(y, x);
  meetCoin();
  scoring();
}

function removeSnake() {
  let ty = snakeQueue[0][0];
  let tx = snakeQueue[0][1];
  snakeQueue.shift();
  document.getElementById(
    String(ty) + " " + String(tx)
  ).style.background = tileColor;
}

function setSnake(y, x) {
  snakeQueue.push(new Array(y, x));
  document.getElementById(
    String(y) + " " + String(x)
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
  if (e.keyCode == 38 && direction != 1) direction = 0;
  // up
  else if (e.keyCode == 40 && direction != 0) direction = 1;
  // down
  else if (e.keyCode == 37 && direction != 3) direction = 2;
  // left
  else if (e.keyCode == 39 && direction != 2) direction = 3; // right
}

function init() {
  drawBoard();
  drawWall();
  y = parseInt(MY / 2);
  x = parseInt(MX / 2);
  setSnake(y, x);
  setCoin();
  score = 0;
  direction = -1;
  speed = 100;
  keepMove = setInterval("move(direction)", speed);
}

init();
