// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSpacing;
let tempSeed;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  tempSeed = random(0,1000000000);
  gridSpacing = map((width+height),0,(width+height),40,10);
  console.log(gridSpacing);
  strokeWeight(1);
}

function draw() {
  randomSeed(tempSeed);
  background(220);
  drawLines();
}

function drawLines() {
  for(let x=0; x<width; x+=gridSpacing){
    for(let y=0; y<height; y+=gridSpacing) {
      let choice = int(random(2));
      if(choice===1) {
        diagAsc(x,y,gridSpacing);
      } else if(choice===0) {
        diagDesc(x,y,gridSpacing);
      }
    }
  }
}

function diagAsc(x,y,s) {
  line(x-s/2, y+s/2, x+s/2, y-s/2);
}

function diagDesc(x,y,s) {
  line(x+s/2, y+s/2, x-s/2, y-s/2);
}
