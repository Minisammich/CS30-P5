// Terrain Generation
// Jeffrey Hamilton
// 12/Mar/24
//
// Extra for Experts:
// - Terrain Generation using Perlin Noise.
//
// --------------------
// ----- CONTROLS -----
// --------------------
// Right/Left Arrows: Increase/Decrease Rectangle Width.
// Up/Down Arrows:    Increase/Decrease Terrain Variation.
// Shift/Control:     Increase/Decrease Speed.

let rectWidth = 5, initialTerrainVariation = 50, initialSpeed = 70; // User Adjustable Variables.

let x = 0;
let time = 0;
let heightList = [];
let totalHeight = 0;
let iAtMaxHeight=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  fill(0);
  terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
}

function keyPressed() {

  if(keyCode===RIGHT_ARROW&&rectWidth<width) { // Increase width of rectangle when Right Arrow is pressed.
    rectWidth++;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25); // Speed Compensation.

  } else if(keyCode===LEFT_ARROW&&rectWidth>1) { // Decrease width of rectangle when Left Arrow is pressed.
    rectWidth--;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25); // Speed Compensation.
  }

  if(keyCode===UP_ARROW){
    initialTerrainVariation++;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  } else if(keyCode===DOWN_ARROW&&initialTerrainVariation>1) {
    initialTerrainVariation--;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  }

  if(keyCode===SHIFT&&initialSpeed<1024) {
    initialSpeed+=20;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  } else if(keyCode===CONTROL&&initialSpeed>20) {
    initialSpeed-=20;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  }
}

function avgLine() {
  let avgHeight = (totalHeight/(width/rectWidth));
  stroke(255,50,100);
  line(0,avgHeight,width,avgHeight);
  totalHeight=0;
}

function flag() {
  let xFlag = iAtMaxHeight;
  let yFlag = min(heightList);
  stroke(0);
  line(xFlag,yFlag,xFlag,yFlag-50);
  fill(70,255,90);
  stroke(70,255,90);
  triangle(xFlag,yFlag-30,xFlag,yFlag-50,xFlag+20,yFlag-40);
}

function drawRectangles() {
  let rectHeight, terrainNoise;
  x=time;
  heightList=[];
  for(let i=0; i<width; i+=rectWidth) {
    x+=terrainVariation;
    terrainNoise = noise(x);
    rectHeight = map(terrainNoise,0,1,0,height*0.8);
    rectColour = map(terrainNoise,0,1,0,255);
    heightList.push(rectHeight);

    totalHeight += rectHeight;
    if(rectHeight===min(heightList)) {
      iAtMaxHeight = i;
    }

    fill(rectColour);
    stroke(rectColour);
    rect(i, height, i+rectWidth, rectHeight);
  }
}

function draw() {
  frameRate(40);
  background(220);
  drawRectangles();
  avgLine();
  flag();
  time+=speed;
}
