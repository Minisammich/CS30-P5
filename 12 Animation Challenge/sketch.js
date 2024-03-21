// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let wheelDiameter = 30;
let debugOutline = false;
let wheelSpeed = 175;
let dotSize = 12;
let dotCount = 6;
let dotSpacing = 30;
function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER);
  textSize(30);
  wheelSpeed = map(wheelSpeed,-255,255,-4,4);
}

function draw() {
  frameRate(60);
  background(50,125,200);
  loadingWheel();
  if(debugOutline===false){noStroke();}
}

function mouseWheel() {
  let scrollRes = 5;
  let rawVal = event.delta;
  if(wheelDiameter+(rawVal/scrollRes)>0&&wheelDiameter+(rawVal/scrollRes)<width){
    wheelDiameter += (rawVal/scrollRes);
  }
}

function loadingWheel() {
  fill(220);
  push();
  translate(width/2,height/1.5);
  text('Just a moment...',0,125);
  //noFill();
  if(debugOutline===true){circle(0,0,wheelDiameter);}
  for(let i=0; i<dotCount; i++) {
    push();
    rotate((frameCount*wheelSpeed)+(-i*dotSpacing));
    translate(0,wheelDiameter);
    if((frameCount*wheelSpeed)+(-i*dotSpacing)<=720&&(frameCount*wheelSpeed)+(-i*dotSpacing)>0) {
      circle(0,0,dotSize);
    }
    pop();
  }
  if(frameCount*wheelSpeed>=710) {
    if(frameCount*wheelSpeed>=1080) {
      frameCount = 0;
    }
    //rect((-wheelDiameter/2),0,wheelDiameter);
  }
  pop();
}
