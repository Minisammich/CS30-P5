// Creating Fractals
// Jeffrey Hamilton
// 06/May/2024

function setup() {
  createCanvas(30,20);
  noFill();
}

function draw() {
  background(220);
  //cantor(width*0.1,height*0.3,width*0.8,9);
  circleFractal(width/2,height*0.65,width/2,12);
}


// Recursion Three - Circle Fractal.
function circleFractal(x,y,diameter,depth) {
  if(depth > 0) {
    circle(x,y,diameter);
    circleFractal(x-diameter/2,y,diameter/2,depth-1);
    circleFractal(x+diameter/2,y,diameter/2,depth-1);
    circleFractal(x,y-diameter/2,diameter/2,depth-1);
  }
}


// Recursion Two - Cantor.
function cantor(x,y,len,depth) {
  if(depth >= 0) {
    rect(x,y,len,10);
    y += 20; // drop down Y for next generation.
    cantor(x,y,len/3,depth-1)
    cantor(x+len*2/3,y,len/3,depth-1);
  }
}


// Recursion One - Concentric Circles.
function concentricCircle(diameter) {
  if(diameter > 10) {
    circle(width/2,height/2,diameter);
    concentricCircle(diameter-0.1);
  }
  // Implicit Base Case (diameter <= 1)
}