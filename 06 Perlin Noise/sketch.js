// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time=0;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function partitions() {
  fill(220);
  rect(0,0,width/2,height/2);
  rect(width/2,0, width, height/2);
  rect(0,height/2, width, height);
  fill(255);
}

function donut() {
  donutWidth = 15;
  diameter = map(noise(time),0,1,0,100);
  circle(width/4,height/4,diameter);
  fill(220);
  circle(width/4,height/4,(diameter-donutWidth));
}

function draw() {
  partitions();
  donut();
  time+=0.025;
}
