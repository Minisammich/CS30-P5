// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tiles = []; // 0: Grass, 1: Chicken, 2: Cow, 3: Star.
let level = [
  [0, 1, 0, 3, 0],
  [1, 0, 0, 1, 0],
  [0, 1, 1, 0, 0],
  [0, 1, 0, 0, 0],
  [0, 0, 1, 0, 0]
];

const COLS = 5, ROWS = 5, TILE_SIZE = 100;
let playerX = 3, playerY = 4;

function preload() {
  for(let i = 0; i < 4; i++) {
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(COLS*TILE_SIZE, ROWS*TILE_SIZE);
  level[playerY][playerX] = 2;
}

function draw() {
  background(220);
  renderBoard();
}

function keyPressed() {
    if(keyCode === UP_ARROW && playerY > 0) { // UP.

      if(level[playerY-1][playerX] === 0) { // Grass.
        swap(playerY,playerX,playerY-1,playerX);
        playerY--;
      } else if(level[playerY-1][playerX] === 1) { // Chicken.
        if(playerY-1 > 0 && level[playerY-2][playerX] === 0) {
          swap(playerY-1,playerX,playerY-2,playerX);
          swap(playerY,playerX,playerY-1,playerX);
          playerY--;
        }
      }

    } else if(keyCode === DOWN_ARROW && playerY < ROWS-1) { // DOWN.

      if(level[playerY+1][playerX] === 0) { // GRASS.
        swap(playerY,playerX,playerY+1,playerX);
        playerY++;
      } else if(level[playerY+1][playerX] === 1) { // Chicken.
        if(playerY+1 < ROWS-1 && level[playerY+2][playerX] === 0) {
          swap(playerY+1,playerX,playerY+2,playerX);
          swap(playerY,playerX,playerY+1,playerX);
          playerY++;
        }
      }

    } else if(keyCode === LEFT_ARROW && playerX > 0) { // LEFT.

      if(level[playerY][playerX-1] === 0) {
        swap(playerY,playerX,playerY,playerX-1);
        playerX--;
      } else if(level[playerY][playerX-1] === 1) { // Chicken.
        if(playerX-1 > 0 && level[playerY][playerX-2] === 0) {
          swap(playerY,playerX-1,playerY,playerX-2);
          swap(playerY,playerX,playerY,playerX-1);
          playerX--;
        }
      }

    } else if(keyCode === RIGHT_ARROW && playerX < COLS-1) { // RIGHT.

      if(level[playerY][playerX+1] === 0) {
        swap(playerY,playerX,playerY,playerX+1);
        playerX++;
      } else if(level[playerY][playerX+1] === 1) { // Chicken.
        if(playerX+1 < COLS-1 && level[playerY][playerX+2] === 0) {
          swap(playerY,playerX+1,playerY,playerX+2);
          swap(playerY,playerX,playerY,playerX+1);
          playerX++;
        }
      }

    }
}

function swap(y1,x1, y2,x2) {
  let obj1 = level[y1][x1];
  level[y1][x1] = level[y2][x2];
  level[y2][x2] = obj1;
}

function renderBoard() {
  for(let x = 0; x < COLS; x++) {
    for(let y = 0; y < ROWS; y++) {
      let type = level[y][x];
      let currentImage = tiles[type];
      image(currentImage,x*TILE_SIZE,y*TILE_SIZE);
    }
  }
}