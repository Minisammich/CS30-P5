// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let wheelDiameter = 60;
let debugOutline = false;
let initialWheelSpeed = 175, wheelSpeed;
let dotSize = 12;
let dotCount = 6;
let dotSpacing = 30;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES);
  textAlign(CENTER);
  textSize(35);
  textFont('arial')
  wheelSpeed = map(wheelSpeed,-255,255,-4,4);
}

function draw() {
  wheelSpeed = map(initialWheelSpeed,-255,255,-4,4);
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
  translate(width/2,height/2);
  text('Just a moment...',0,150);
  //noFill();
  if(debugOutline===true){circle(0,0,wheelDiameter);}
  for(let i=0; i<dotCount; i++) {
    let rotationVal = ((frameCount*wheelSpeed)+(-i*dotSpacing));
    push();
    fill(220);
    rotate(rotationVal);
    translate(0,(wheelDiameter/2));
    if(rotationVal<=720&&rotationVal>0) {
      circle(0,0,dotSize);
    }
    pop();
  }
  if(frameCount*wheelSpeed>=710) {
    if(frameCount*wheelSpeed>=1080) {
      frameCount = 0;
    }
  }
  pop();
}
