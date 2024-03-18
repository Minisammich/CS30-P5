// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  drawClock();
}

function drawClock() {
  // Main Outline.
  strokeWeight(7);
  circle(width/2,height/2,500);

  // Lines.
  strokeWeight(12);
  push();
  translate(width/2, height/2);

  // Hour Lines.
  // for(let i=1; i<=12; i++) {
  //   push();
  //   rotate((30*i));
  //   line(0, 175, 0, 225);
  //   pop();
  // }

  // Small Lines.
  strokeWeight(4);
  for(let i=1; i<=48; i++) {
    //if(tohiadnothiu)
    push();
    rotate((6*i));
    line(0,200,0,225);
    pop();
  }
  pop();
}
