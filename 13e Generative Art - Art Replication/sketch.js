// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let frequency = 10;

function setup() {
  createCanvas(windowWidth, windowHeight);
  drawSinusoidalCurve(height/2);
}

function draw() {
  background(220);
}

function drawSinusoidalCurve(y) {
  for(x = 0; x < width; i++) {
    point(x,asin(x));
  }
}
