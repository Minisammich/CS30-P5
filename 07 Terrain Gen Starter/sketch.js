// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rectWidth = 1;
let terrainVariation = 4;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(30,40,100);
  rectMode(CENTER); //CHANGE THIS
  drawRectangles();
}

function drawRectangles() {
  fill(0,120,170);
  rect(width/2,height*0.75,width,height*0.50);
  let rectHeight;
  let rectNoise;
  fill(0);
  for(let x = 0; x < width; x += rectWidth) {
    rectNoise = (noise(map(x,0,width,0,terrainVariation)));
    rectHeight = map(rectNoise,0,1,height*0.05,height*0.8);
    rect(x, height/2, rectWidth, rectHeight);
  }
}

function draw() {
}
