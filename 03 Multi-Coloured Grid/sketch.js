// Multi-Coloured Grid
// Jeffrey Hamilton
// 06/Mar/24
//
// Extra for Experts:
// - Creates a grid of random colours, takes inputs to change size and randomize colours.

let squareSize=10, columns, rows;

function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = windowWidth/squareSize;
  rows = columns = windowHeight/squareSize;
}

function mousePressed() {
  if(mouseButton===LEFT) {
    squareSize--;
  } else if(mouseButton===RIGHT) {
    squareSize++;
  }

  columns = windowWidth/squareSize;
  rows = columns = windowHeight/squareSize;
}

function grid() {
  for(i=0; i<=rows; i++) {
    for(i=0; i<=columns; i++) {
      //buh
    }
  }
  
}

function draw() {
  background(220);
}
