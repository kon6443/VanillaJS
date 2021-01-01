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

function drawWall() {
  let wallCell = new Array();
  for(let i=0;i<MY;i++) wallCell.push(new Array(i, 0));
  for(let i=0;i<MY;i++) wallCell.push(new Array(i, MX-1));
  for(let i=0;i<MX;i++) wallCell.push(new Array(0, i));
  for(let i=0;i<MX;i++) wallCell.push(new Array(MY-1, i));
  for(let i=0;i<wallCell.length;i++) {
    console.log(wallCell[i][1]);
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
  switch (e.keyCode) {
    case 38:
      moveDir(0);
      break; //up
    case 40:
      moveDir(1);
      break; //down
    case 37:
      moveDir(2);
      break; //left
    case 39:
      moveDir(3);
      break; //right
  }
}

function init() {
  drawBoard();
  drawWall();
}

init();
