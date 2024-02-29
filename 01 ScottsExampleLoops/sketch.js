// Drawing with Loops 1
// Mr. Scott
// February 27, 2024
// Using Loops + Arrays to create some visualizations

//Global Variables
let xPos, yPos;   //declaration only...
let color = 0;

function setup() {
  createCanvas(400 , 400);
  xPos = [];
  yPos = [];
  wallsLoop();
}

function draw() {
  background(220);
  trianglesLoop();
  circlesAndMouseLoop();
}

function flipColours(){
  if(color===0){
    fill(90,10,20);
    color=1;
  } else if(color===1){
    fill(10,100,15);
    color=2;
  } else if(color===2){
    fill(10,50,150);
    color=0;
  }
}

/*
function mousePressed(){
  //this calls automatically on a mousePress
  xPos.push(mouseX);
  yPos.push(mouseY);
}
*/

/*
function initWithLoops(){
  for(let x = 10; x < width; x+=20){
    xPos.push(x);
    yPos.push(height/2);
  }
}
*/

function wallsLoop(){
  for(let y = (height*0.05); y < height; y+=30){
    if(y===(height*0.05)||y===(height*0.95)){
      for(let x = (width*0.05); x < width; x+=30){
        xPos.push(x);
        yPos.push(y);
      }
    } else {
        yPos.push(y);
        xPos.push(width*0.05)
        yPos.push(y);
        xPos.push(width*0.95)
      }
  }
}

function circlesAndMouseLoop(){
  // a hopefully slightly more elegant version...
  let i = 0;
  while(i < xPos.length){
    let xCurr = xPos[i];
    let yCurr = yPos[i];
    /*
    if(i>=1){
      let yLast = yPos[i-1];
      let xLast = xPos[i-1];
      triangle(xCurr,yCurr,mouseX,mouseY,xLast,yLast);
    }*/
    circle(xCurr,yCurr,20);
    i++; 
  }
  circle(mouseX, mouseY, 20);
}

function trianglesLoop(){
  let i = 0;
  while(i < xPos.length){
    flipColours();
    let xCurr = xPos[i];
    let yCurr = yPos[i];
    let xLast = xPos[i-1];
    let yLast = yPos[i-1];
    let xNext = xPos[i+1];
    let yNext = yPos[i+1];
    if(yPos[i]===((height*0.05)+30) && xPos[i]===(width*0.05)){
      triangle(xCurr,yCurr,xPos[0],yPos[0],mouseX,mouseY);
    }
    if(yPos[i]>=(height*0.95)-30 && xPos[i]>=(width*0.95)){
      triangle(xCurr,yCurr,xCurr,(yCurr-((height*0.95)-30),mouseX,mouseY));
    }

    if((yPos[i]<=(height*0.05))){
      triangle(xCurr,yCurr,xLast,yLast,mouseX,mouseY);
    } else if (yPos[i]>=(height*0.95)) {
      triangle(xNext,yNext,xCurr,yCurr,mouseX,mouseY);
    } else if (i>=1){
      triangle(xNext,yNext,xLast,yLast,mouseX,mouseY);
    }
    i++
  }
}
