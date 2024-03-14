// Multi-Coloured Grid
// Jeffrey Hamilton
// 06/Mar/24
//
// Extra for Experts:
// - Creates a grid of random colours, takes inputs to change size and randomize colours.
//
//-----------
// CONTROLS:
//-----------
//
// L-Click - Zooms in
// R-Click - Zooms Out
// SHIFT   - Randomizes Colours
// CTRL    - Switches Between Colour Modes

let squareSize = 40,columns,rows,xPos,yPos,colourList,rX,rY,squareColour,colourState=0;

function setup() {
  document.addEventListener("contextmenu", event => event.preventDefault())
  createCanvas(windowWidth, windowHeight);
  columns = windowWidth/squareSize;
  rows = windowHeight/squareSize;
  calculateGrid();
}

function mousePressed() {
  if(mouseButton===LEFT&&squareSize>=2) {
    squareSize/=1.2;
  } else if(mouseButton===RIGHT&&squareSize<=300) {
    squareSize*=1.2;
  }

  columns = windowWidth/squareSize;
  rows = windowHeight/squareSize;
  background(220);
  calculateGrid();
}

function keyPressed() {
  if(keyCode===SHIFT) {
    calculateGrid();
  }

  if(keyCode===CONTROL) {
    if(colourState===0) {
      colourState=1;
    } else if(colourState===1){
      colourState=2;
    } else {
      colourState=0;
    }
    calculateGrid();
  }

  return(false);
}

function calculateGrid() {
  xPos = []; yPos = []; colourList = [];
  for(let yCount=0; yCount<rows; yCount++) {
    for(let xCount=0; xCount<columns; xCount++) {
      if((xCount*squareSize)+squareSize<=width&&(yCount*squareSize)+squareSize<=height){
        xPos.push(xCount*squareSize);
        yPos.push(yCount*squareSize);
        if(colourState===0) {
          colourList.push([random(0,255),random(0,255),random(0,255)]); //Full Random
        } else if(colourState===1) {
          colourList.push([random(70,150),random(30,70),random(70,255)]); //Random Purple
        } else {
          colourList.push(random(0,255)); //Random Greyscale
        }
      }
    }
    
  }
  drawGrid();
}

function drawGrid() { 
  for(let i=0; i < xPos.length; i++) {
    rX = xPos[i]; rY = yPos[i]; squareColour = colourList[i];
    fill(squareColour);
    rect(rX, rY, squareSize, squareSize);
  }
}

function draw() {
}
