let board = Array(
  Array(0, 0, 0, 0),
  Array(0, 0, 0, 0),
  Array(0, 0, 0, 0),
  Array(0, 0, 0, 0)
);

let tableID = Array(
  Array("00", "01", "02", "03"),
  Array("10", "11", "12", "13"),
  Array("20", "21", "22", "23"),
  Array("30", "31", "32", "33")
);

let score;

function gameOver() {
  alert("[Game Over]\nMax: "+getMaxNum()+"\nScore"+score);
  init();
}

function checkGameOver() {
  for (let i = 0; i < 4; i++) {
    let colCheck = board[i][0];
    if(colCheck === 0) return;
    for(let j=1;j<4;j++) {
      if((colCheck === board[i][j]) || (board[i][j] === 0)) return;
      else colCheck = board[i][j];
    }
  }
  for(let i=0;i<4;i++) {
    let rowCheck = board[0][i];
    if(rowCheck === 0) return;
    for(let j=1;j<4;j++) {
      if((rowCheck === board[j][i]) || (board[j][i] === 0)) return;
      else rowCheck = board[j][i];
    }
  }
  gameOver();
}

function getMaxNum() {
  let temp = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] > temp) temp = board[i][j];
    }
  }
  return temp;
}

function getNewNum() {
  let rand = Math.floor(Math.random() * 10); // 0~10
  return rand === 0 ? 4 : 2;
}

function generate() {
  let numZero = 0;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) if (board[i][j] === 0) numZero++;
  while (true) {
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 4; j++)
        if (board[i][j] === 0) {
          let rand = Math.floor(Math.random() * numZero); // 0~numZero
          if (rand === 0) {
            board[i][j] = getNewNum();
            return;
          }
        }
  }
}

// Moving up all the tiles
function move() {
  let isMoved = false;
  let isPlused = Array(
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0),
    Array(0, 0, 0, 0)
  );
  for (let i = 1; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (board[i][j] === 0) continue;
      let tempY = i - 1;
      while (tempY > 0 && board[tempY][j] === 0) tempY--; // if a tile can go up one unit more
      if (board[tempY][j] === 0) {
        // when there is space to go further above
        board[tempY][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else if (board[tempY][j] !== board[i][j]) {
        // when tempY and i tile is different so can't go above further
        if (tempY === i) continue; // exception: when tempY and i tiles are actually the same tiles
        board[tempY + 1][j] = board[i][j];
        board[i][j] = 0;
        isMoved = true;
      } else {
        // adding
        if (isPlused[tempY][j] === 0) {
          board[tempY][j] *= 2;
          score += board[tempY][j];
          board[i][j] = 0;
          isPlused[tempY][j] = 1;
          isMoved = true;
        } else {
          board[tempY + 1][j] = board[i][j];
          board[i][j] = 0;
          isMoved = true;
        }
      }
    }
  }
  if (isMoved) generate();
  else checkGameOver();
}

// Rotate the board
function rotate(reps) {
  while (reps--) {
    let temp = Array(
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0),
      Array(0, 0, 0, 0)
    );
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        temp[i][j] = board[i][j];
      }
    }
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {
        board[i][j] = temp[3 - j][i];
      }
    }
  }
}

// Rotate the board n times depends on the direction
function moveDir(opt) {
  switch (opt) {
    case 0:
      move();
      break; //up
    case 1:
      rotate(2);
      move();
      rotate(2);
      break; //down
    case 2:
      rotate(1);
      move();
      rotate(3);
      break; //left
    case 3:
      rotate(3);
      move();
      rotate(1);
      break; //right
  }
  update();
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

function painting(cell) {
  let cellNum = parseInt(cell.innerHTML);
  switch (cellNum) {
    case 0:
    case 2:
      cell.style.color = "#684A23";
      cell.style.background = "#FBEDDC";
      break;
    case 4:
      cell.style.color = "#684A23";
      cell.style.background = "#F9E2C7";
      break;
    case 8:
      cell.style.color = "#684A23";
      cell.style.background = "#F6D5AB";
      break;
    case 16:
      cell.style.color = "#684A23";
      cell.style.background = "#F2C185";
      break;
    case 32:
      cell.style.color = "#684A23";
      cell.style.background = "#EFB46D";
      break;
    case 64:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#EBA24A";
      break;
    case 128:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E78F24";
      break;
    case 256:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E87032";
      break;
    case 512:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E85532";
      break;
    case 1024:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E84532";
      break;
    case 2048:
      cell.style.color = "#FFFFFF";
      cell.style.background = "#E83232";
      break;
    default:
      if (cellNum > 2048) {
        cell.style.color = "#FFFFFF";
        cell.style.background = "#E51A1A";
      } else {
        cell.style.color = "#684A23";
        cell.style.background = "#FBEDDC";
      }
      break;
  }
}

function update() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let cell = document.getElementById(tableID[i][j]);
      cell.innerHTML = board[i][j] === 0 ? "" : board[i][j];
      painting(cell);
    }
  }
  document.getElementById("score").innerHTML = score;
}

function init() {
  score = 0;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      board[i][j] = 0;
    }
  }
  for (let i = 0; i < 2; i++) {
    let rand = Math.floor(Math.random() * 16); // 0~15
    let y = Math.floor(Math.random() * 4); // 0~3
    let x = Math.floor(Math.random() * 4); // 0~3
    if (board[x][y] === 0) {
      board[x][y] = getNewNum();
    } else {
      i--;
    }
  }
  update();
}

init();
