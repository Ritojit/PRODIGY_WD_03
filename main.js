var mode = 0;
var turn = 1; 
var gameFresh = true;
var gameWon = false;

document.getElementById("1v1").onclick = function() {
  if (gameFresh) {
    setMode(0);
    resetGame();
  }
}
document.getElementById("ai").onclick = function() {
  if (gameFresh) {
    setMode(1);
    resetGame();
  }
}
document.getElementById("reset").onclick = function() {
  resetGame();
}

for(let i = 0; i < 9; i++) {
  document.getElementById(i.toString()).onclick = function() { tileSelected(i.toString()); }
}

function resetGame() {
  for (let i = 0; i < 9; i++) {
    document.getElementById(i.toString()).setAttribute("src", "blank.jpg");
  }
  this.gameWon = false;
  this.turn = 1;
  this.gameFresh = true;
  if (mode == 0) {
    document.getElementById("gameprompt").innerHTML = "Multiplayer Mode ||  X's turn";
  } else {
    document.getElementById("gameprompt").innerHTML = "Singleplayer Mode ||  X's turn";
  }
}

function setMode(mode) {
  this.mode = mode;
}

function tileSelected(tiletag) {
  var tile = document.getElementById(tiletag);
  if (tile.getAttribute("src") == "blank.jpg" && gameWon == false) {
    if (this.turn == 1) {
      tile.setAttribute("src", "x.jpg");

      if (this.mode == 0) {
        this.turn = 2;
        document.getElementById("gameprompt").innerHTML = "O's turn";
      }
      else if (this.mode == 1) {
        document.getElementById("gameprompt").innerHTML = "X's turn";
        checkWin();
        aiSelect();
      }
    } else if (this.turn == 2 && this.mode == 0) {
        tile.setAttribute("src", "o.jpg");
        this.turn = 1;
        document.getElementById("gameprompt").innerHTML = "X's turn";

    }
  }
  this.gameFresh = false;
  checkWin();
}

function getCells() {
  let cells = [];
  for (let i = 0; i < 9; i++) {
    if (document.getElementById(i.toString()).getAttribute("src") == "x.jpg") {
      cells.push("X");
    } else if (document.getElementById(i.toString()).getAttribute("src") == "o.jpg") {
      cells.push("O");
    } else {
      cells.push("");
    }
  }

  return cells;
}

function checkWin() {
  let cells = getCells();

  for (let i = 0; i < 3; i++) {
    
    if ((cells[(3 * i)] == "X" && cells[(3 * i) + 1] == "X" && cells[(3 * i) + 2] == "X") || (cells[(3 * i)] == "O" && cells[(3 * i) + 1] == "O" && cells[(3 * i) + 2] == "O")) {
      playerWin(cells[(3 * i)]);
    }

    
    if ((cells[i] == "X" && cells[i + 3] == "X" && cells[i + 6] == "X") || (cells[i] == "O" && cells[i + 3] == "O" && cells[i + 6] == "O")) {
      playerWin(cells[i]);
    }
  }

  
  if ((cells[0] == "X" && cells[4] == "X" && cells[8] == "X") || (cells[0] == "O" && cells[4] == "O" && cells[8] == "O")
  || (cells[2] == "X" && cells[4] == "X" && cells[6] == "X") || (cells[2] == "O" && cells[4] == "O" && cells[6] == "O")) {
    playerWin(cells[4]);
  }

  
  checkDraw();

}


function playerWin(winner) {
  document.getElementById("gameprompt").innerHTML = winner + " has WON! You may change the mode, X's turn.";
  this.gameWon = true;
}


function checkDraw() {
  
  let usedCells = 0;
  for (cell in getCells()) {
    if (getCells()[cell] == "X" || getCells()[cell] == "O") {
      usedCells += 1;
    }
  }

  if (usedCells >= 9) {
    this.gameWon = true;
    document.getElementById("gameprompt").innerHTML = "It's a DRAW! You may change the mode, X's turn";
  }
}


function aiSelect() {
  let cells = getCells();


  
  for (let i = 0; i < 3; i++) {
    if ((cells[(3 * i)] == "X" && cells[(3 * i) + 1] == "X" && cells[(3 * i) + 2] == "") || (cells[(3 * i)] == "O" && cells[(3 * i) + 1] == "O" && cells[(3 * i) + 2] == "")) {
      document.getElementById(((3 * i) + 2).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[(3 * i) + 1] == "X" && cells[(3 * i) + 2] == "X" && cells[(3 * i)] == "") || (cells[(3 * i) + 1] == "O" && cells[(3 * i) + 2] == "O" && cells[(3 * i)] == "")) {
      document.getElementById((3 * i).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[(3 * i)] == "X" && cells[(3 * i) + 2] == "X" && cells[(3 * i) + 1] == "") || (cells[(3 * i)] == "O" && cells[(3 * i) + 2] == "O" && cells[(3 * i) + 1] == "")) {
      document.getElementById(((3 * i) + 1).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i] == "X" && cells[i + 3] == "X" && cells[i + 6] == "") || (cells[i] == "O" && cells[i + 3] == "O" && cells[i + 6] == "")) {
      document.getElementById((i + 6).toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i + 3] == "X" && cells[i + 6] == "X" && cells[i] == "") || (cells[i + 3] == "O" && cells[i + 6] == "O" && cells[i] == "")) {
      document.getElementById(i.toString()).setAttribute("src", "o.jpg"); return false;
    }
    if ((cells[i] == "X" && cells[i + 6] == "X" && cells[i + 3] == "") || (cells[i] == "O" && cells[i + 6] == "O" && cells[i + 3] == "")) {
      document.getElementById((i + 3).toString()).setAttribute("src", "o.jpg"); return false;
    }
  }

  if((cells[0] == "X" && cells[4] == "X" && cells[8] == "") || (cells[0] == "O" && cells[4] == "O" && cells[8] == "")) {
    document.getElementById("8").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[4] == "X" && cells[8] == "X" && cells[0] == "") || (cells[4] == "O" && cells[8] == "O" && cells[0] == "")) {
    document.getElementById("0").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[0] == "X" && cells[8] == "X" && cells[4] == "") || (cells[0] == "O" && cells[8] == "O" && cells[4] == "")) {
    document.getElementById("4").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[2] == "X" && cells[4] == "X" && cells[6] == "") || (cells[2] == "O" && cells[4] == "O" && cells[6] == "")) {
    document.getElementById("6").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[4] == "X" && cells[6] == "X" && cells[2] == "") || (cells[4] == "O" && cells[6] == "O" && cells[2] == "")) {
    document.getElementById("2").setAttribute("src", "o.jpg"); return false;
  }
  if((cells[2] == "X" && cells[6] == "X" && cells[4] == "") || (cells[2] == "O" && cells[6] == "O" && cells[4] == "")) {
    document.getElementById("4").setAttribute("src", "o.jpg"); return false;
  }

  checkDraw();
  for (let i = 0; i < 9; i++) {
    let choice = Math.floor(Math.random() * 9);
    if (cells[choice] != "X" && cells[choice] != "O") {
      document.getElementById(choice.toString()).setAttribute("src", "o.jpg"); return false;
    }
  }

  return true;
}
