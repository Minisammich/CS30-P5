// Generative Art - Art Replication
// Jeffrey Hamilton
// 27/Mar/2024

// Various parameters of the sin(x^2) function.
let frequency = 0.000027
let amplitude = 40; // 
let phase = 2.75;

// Parameters for the horizontal and vertical spacing of points.
let horizRes = 5;
let vertSeparation = 5;

function setup() {
  createCanvas(950, 950);
  background(220);
  noLoop();
  strokeWeight(1);
}

function draw() {
  drawSinusoidalCurve();
}

function drawSinusoidalCurve() {
  let xPosList = [];
  let yPosList = [];
  for(x = (width*0.1); x < (width*0.9); x+=horizRes) { // x is between width*0.1 and width*0.9
    for((y=height*0.3); y<(height*0.7); y+=vertSeparation) { // y is between height*0.3 and height*0.7
      yPosList.push(((sin((sq(x)*frequency)+phase)*amplitude))+y); // Pushes sin(sq(x*frequency+phase))*amplitude+y to the y Position List.
      xPosList.push(x);
    }
  }
  for(i=0; i<xPosList.length; i++) {
    let listOffset = ceil((height*0.7-height*0.3)/vertSeparation); // Offset to get list position for the same row of the next column. (List is created column by column going down)
    let xCurr=xPosList[i],yCurr=yPosList[i],xNext=xPosList[i+listOffset],yNext=yPosList[i+listOffset];
    line(xCurr,yCurr,xNext,yNext);
  }
}
