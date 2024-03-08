// Noisy Numbers
// Jeffrey Hamilton
// March 7, 2024
// A look at randomness: uniform distribution vs perlin noise

//global variables
let segmentLength = 3;

let ballY = 200; let ySpeed;
let ballTime = 10; //start at any number...

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function segmentLine(){
  //using a loop, draw one line made up of many lines
  strokeWeight(15);
  let greyTime = 0;
  let x = 0;
  while (x < width){
    //option 1: random()
    let greyValue = random(0, 255);

    //option 2: perlin noise()
    greyValue = noise(greyTime);  //0 - 1
    greyValue = map(greyValue,0,1,0,255);
    greyTime += 0.1;

    stroke(greyValue);
    line(x, height/2, x+segmentLength, height/2 );
    x += segmentLength;
  }
}

function moveBall(){
  strokeWeight(1);  stroke(0);
  //option 1: random()
  ySpeed = random(-20,20);

  //option 2: perlin noise()
  ySpeed = noise(ballTime);   //0-1
  ySpeed = map(ySpeed,0,1,-10,10);
  ballTime += 0.03;

  ballY += ySpeed;
  circle(width*0.7, ballY, 30);
}

function draw() {
  background(220);
  segmentLine();
  moveBall();
}