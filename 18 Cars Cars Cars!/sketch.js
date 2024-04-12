// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
}

function draw() {
  background(90);
  fill(0);
  rect(0,height*0.2,width,height*0.8);
  for(i = 0; i < width; i += 100) {
    fill(200,200,50);
    rect(i,(height/2 + 5), i+50, (height/2 - 5));
  }
}
