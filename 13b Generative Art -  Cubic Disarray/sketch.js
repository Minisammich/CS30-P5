// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSpacing = 20;
let strokeEnabled = true;


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  angleMode(DEGREES)
  noFill();

  drawDisarray();
}

function mousePressed() {
  if(mouseButton===LEFT) {
    drawDisarray();
  } else if(mouseButton===CENTER) {
    if(strokeEnabled===true) {
      strokeEnabled = false;
    } else {
      strokeEnabled = true;
    }
    drawDisarray();
  } 
}

function draw() {
  //drawDisarray();
}

function drawDisarray() {
  background(220);
  if(strokeEnabled) {
    stroke(0);
  } else {
    noStroke();
  }
  for(let x=gridSpacing/2; x<width; x+=gridSpacing) {
    for(let y=gridSpacing/2; y<height; y+=gridSpacing) {
      push();
      translate(x,y);
      let rAmount = (map(y,0,height,0,45));
      let offset = map(y,0,height,0,15);
      rotate(random(-rAmount,rAmount));
      fill(random(0,255),random(0,255),random(0,255));
      square(random(-offset,offset),random(-offset,offset),gridSpacing);
      pop();
    }
  }
} 