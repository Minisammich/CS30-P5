// 15 Generative Art - Repitition
// Jeffrey Hamilton
// 25/Mar/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(200);
  angleMode(DEGREES);
  stroke(0,80);
  //noLoop();
}

function randomElement(currLen) {
  stroke(170,255,231);
  push(); // Isolate coordinate transformations.
  rotate(random(0,360));

  while(currLen > 5) {
    rotate(random(-60,60));
    line(0,0,0,currLen);
    translate(0,currLen);
    currLen*=0.75;
  }

  pop();
}

function randomElement_2(currLen) {
  push();
  translate(random(0,width),random(0,height));

  while(currLen > 5) {
    rotate(random(0,360));
    line(0,0,0,currLen);
    translate(0,currLen);
    currLen*=(random(0.10,0.75));
  }

  pop();
}

function draw() {
  frameRate(8);
  //translate(width/2,height/2);
  background(200);
  for(let i=0; i<5000; i++) {
    randomElement_2(random(75,175));
  }
}
