// Multi-Coloured Grid
// Jeffrey Hamilton
// 06/Mar/24
//
// Extra for Experts:
// - Creates a grid of random colours, takes inputs to change size and randomize colours.

let squareSize=40,columns,rows,xPos,yPos,colourList,rX,rY,squareColour;

function setup() {
  document.addEventListener("contextmenu", event => event.preventDefault())
  createCanvas(windowWidth, windowHeight);
  columns = windowWidth/squareSize;
  rows = windowHeight/squareSize;
  calculateGrid();
}

function mousePressed() {
  if(mouseButton===LEFT) {
    squareSize/=1.2;
  } else if(mouseButton===RIGHT) {
    squareSize*=1.2;
  }

  columns = windowWidth/squareSize;
  rows = windowHeight/squareSize;

  calculateGrid();
  console.log(colourList)
}

function calculateGrid() {
  xPos = []; yPos = []; colourList = [];
  for(let yCount=0; yCount<rows; yCount++) {
    for(let xCount=0; xCount<columns; xCount++) {
      if(xCount*squareSize<width&&yCount*squareSize<height){
        xPos.push(xCount*squareSize);
        yPos.push(yCount*squareSize);
        colourList.push([random(0,255),random(0,255),random(0,255)]);
      }
    }
    
  }
}

function drawGrid() { 
  for(let i=0; i < xPos.length; i++) {
    rX = xPos[i]; rY = yPos[i]; squareColour = colourList[i];
    fill(squareColour);
    rect(rX, rY, rX+squareSize, rY+squareSize);
  }
}

function draw() {
  frameRate(60);
  background(220);
  drawGrid();
}
