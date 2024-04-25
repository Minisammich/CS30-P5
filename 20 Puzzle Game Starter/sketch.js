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
const NUM_ROWS = 5; const NUM_COLS = 5;

let winState = false;

let row, col;

function setup() {
  createCanvas(NUM_COLS * squareSize, NUM_ROWS * squareSize);
  textSize(50);
  textAlign(CENTER);

  randomizeGrid();
}

function draw() {
  row = getCurrentY();
  col = getCurrentX();
  background(220);
  drawGrid();
  drawSelected(col,row);
  if(winState) drawWinText();
}

function mousePressed() { // Flip grid squares when mouse is pressed
  if(mouseX < width && mouseY < height && mouseButton === LEFT && winState === false){
    if(keyIsPressed && keyCode === SHIFT) {
      flip(col,row); // Flip current square
    } else if(winState === false) {
      flip(col,row); // Flip current square

      if(col != NUM_COLS-1) flip(col+1,row); // Flip square to the RIGHT.

      if(col != 0) flip(col-1,row); // Flip square to the LEFT.

      if(row != NUM_ROWS-1) flip(col,row+1); // Flip square ABOVE.

      if(row != 0) flip(col,row-1); // Flip square BELOW.
    }

  }
}

function keyPressed() {
  if(keyCode === 32 && winState) {
    randomizeGrid();
    winState = false;
  }
}

function drawSelected(col,row) {
  fill(0,255,0,100);
  if(mouseX < width && mouseY < height) {
    if(keyIsPressed && keyCode === SHIFT && winState === false){
      rect(col*squareSize,row*squareSize,squareSize);
    } else if(winState === false) {
      rect(col*squareSize,row*squareSize,squareSize); // Over current square

        if(col != NUM_COLS-1) rect((col+1)*squareSize,row*squareSize,squareSize); // Over square to the RIGHT.

        if(col != 0) rect((col-1)*squareSize,row*squareSize,squareSize); // Over square to the LEFT.

        if(row != NUM_ROWS-1) rect(col*squareSize,(row+1)*squareSize,squareSize); // Over square ABOVE.

        if(row != 0) rect(col*squareSize,(row-1)*squareSize,squareSize); // Over square BELOW.
    }
  }
}

function drawWinText() {
  fill(0,255,0);
  textSize(((NUM_COLS+NUM_ROWS)*squareSize)/10); 
  text("You Win!",width*0.5,height*0.5);

  fill(0,255,255);
  textSize(((NUM_COLS+NUM_ROWS)*squareSize)/30);
  text("Press SPACE to Reset",width*0.5,height*0.8);
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

function randomizeGrid() {
  for(let i = 0; i < NUM_ROWS; i++) {
    grid.push([]);
    for(let j = 0; j < NUM_COLS; j++) {
      grid[i][j] = round(random(1)); 
    }
  }
}

function drawGrid() {
  let maxSquare = 0, minSquare = 255;
  for(let y = 0; y < NUM_ROWS; y++) {
    for(let x = 0; x < NUM_COLS; x++) {
      let currSquare = grid[y][x];
      if(currSquare > maxSquare) {
        maxSquare = currSquare;
      }
      if(currSquare < minSquare) {
        minSquare = currSquare;
      }
      fill(map(grid[y][x],0,1,0,255));
      rect(x*squareSize,y*squareSize, squareSize);

      if(minSquare === maxSquare) {
        winState = true;
      } else { winState = false; }
    }
  }

}