// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let grid = 
// [ 
// [0,  50,  100,  150, 200],
// [0,    0,    0,   0,   0],
// [30,  40,  50,  60,   70],
// [255, 255, 255, 255, 255]
// ];

let grid = [];
let squareSize = 50;
const NUM_ROWS = 10; const NUM_COLS = 10;

let row, col;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);

  for(let i = 0; i < NUM_ROWS; i++) {
    grid.push([]);
    for(let j = 0; j < NUM_COLS; j++) {
      grid[i][j] = round(random(1)); 
    }
  }
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(220);
  drawGrid();
}

function mousePressed() {
  flip(col,row);
}

function flip(x,y) {
  if(grid[y][x] === 0) {
    grid[y][x] = 255;
  } else {
    grid[y][x] = 0;
  }
}

function getCurrentX() { // Determines current column of the mouse.
  let currCol = constrain(floor(mouseX/squareSize),0,NUM_COLS-1);
  return(currCol);
}

function getCurrentY() { // Determines current column of the mouse.
  let currRow = constrain(floor(mouseY/squareSize),0,NUM_ROWS-1);
  return(currRow);
}

function drawGrid() {
  for(let y = 0; y < NUM_ROWS; y++) {
    for(let x = 0; x < NUM_COLS; x++) {
      fill(map(grid[y][x],0,1,0,255));
      rect(x*squareSize,y*squareSize, squareSize);
    }
  }

}