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




// Rotate the board
function rotate(reps) {
  while(reps--) {
    let temp = Array(Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0),Array(0,0,0,0));
    for(let i=0;i<4;i++) {
      for(let j=0;j<4;j++) {
        temp[i][j] = board[i][j];
      }
    }
    for(let i=0;i<4;i++) {
      for(let j=0;j<4;j++) {
        board[i][j] = temp[3-j][i];
      }
    }
  }
}

// Rotate the board n times depends on the direction
function moveDir(opt){
  switch(opt){
      case 0: move(); break; //up
      case 1: rotate(2); move(); rotate(2); break; //down
      case 2: rotate(1); move(); rotate(3); break; //left
      case 3: rotate(3); move(); rotate(1); break; //right
  }
  update();
}


document.onkeydown = keyDownEventHandler;
function keyDownEventHandler(e){
    switch(e.keyCode){
        case 38: moveDir(0); break; //up
        case 40: moveDir(1); break; //down
        case 37: moveDir(2); break; //left
        case 39: moveDir(3); break; //right
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
      cell.innerHTML = borad[i][j] === 0 ? "" : board[i][j];
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
