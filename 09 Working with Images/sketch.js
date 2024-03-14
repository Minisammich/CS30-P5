// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let lionL, lionR;

function preLoad() { // Runs prior to setup, ends when all loading is complete.
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  image(lionL, mouseX, mouseY);
}
