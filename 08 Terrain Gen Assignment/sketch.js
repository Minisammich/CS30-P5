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
// Space:             Randomize Colours.
// R:                 Reset Time Variables.
// + (=):             Set time to progress forwards "Positive"
// - :                Set time to progress backwards "Negative"

let rectWidth = 2, initialTerrainVariation = 25, initialSpeed = 150; // User Adjustable Variables.
let drawStats = true; // Draws above variables on the top left of the canvas.


let x = 0;
let initialTime1, initialTime2, initialTime3;
let time1, time2, time3;
let direction = 'Positive';
let heightList = [];
let totalHeight = 0;
let iAtMaxHeight=0;

let zColourRandomizer = [];
let rColList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  fill(0);
  terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  initialTime1 = random(0,1000000), initialTime2 = random(0,1000000), initialTime3 = random(0,1000000);
  time1 = initialTime1, time2 = initialTime2, time3 = initialTime3;
  randomizeColours();
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
    initialTerrainVariation+=5;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  } else if(keyCode===DOWN_ARROW&&initialTerrainVariation>1) {
    initialTerrainVariation-=5;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  }

  if(keyCode===SHIFT&&initialSpeed<1000) {
    initialSpeed+=25;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  } else if(keyCode===CONTROL&&initialSpeed>0) {
    initialSpeed-=25;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  }
}

function keyTyped() {
  if(key===' ') {
    randomizeColours();
  }

  if(key==='r') {
    time1 = initialTime1, time2 = initialTime2, time3 = initialTime3;
  }

  if(key==='='&&direction==='Negative') {
    direction = 'Positive';
  } else if(key==='-'&&direction==='Positive') {
    direction = "Negative";
  }
}

function randomizeColours() {
  zColourRandomizer = [];
  rColList = [];
  for(let i=0; i<3; i++) {
    zColourRandomizer.push(int(random(0,3)));
  }

  for(let i=0; i<6; i++) {
    rColList.push(0,90);
  }
}

function avgLine() {
  let avgHeight = (totalHeight/(width/rectWidth));
  stroke(255,50,100);
  line(0,avgHeight,width,avgHeight);
  totalHeight=0;
}

function flag() {
  let xFlag = (iAtMaxHeight)+(rectWidth/2);
  let yFlag = min(heightList);
  stroke(0);
  line(xFlag,yFlag,xFlag,yFlag-50);
  fill(70,255,90);
  stroke(70,255,90);
  triangle(xFlag,yFlag-30,xFlag,yFlag-50,xFlag+20,yFlag-40);
}

function drawRectangles(drawHeight,time,z) {
  let rectHeight, terrainNoise;
  x=time;
  heightList=[];
  for(let i=0; i<width; i+=rectWidth) {
    x+=terrainVariation;
    terrainNoise = noise(x);
    rectHeight = map(terrainNoise,0,1,drawHeight,0);
    rectColour = map(rectHeight,drawHeight,0,0,255);
    heightList.push(rectHeight);

    totalHeight += rectHeight;
    if(rectHeight===min(heightList)) {
      iAtMaxHeight = i;
    }

    if(zColourRandomizer[z]===0) {
      fill(rectColour,rColList[z],rColList[z+3]);
      stroke(rectColour,rColList[z],rColList[z+3]);
    } else if(zColourRandomizer[z]===1) {
      fill(rColList[z],rectColour,rColList[z+3]);
      stroke(rColList[z],rectColour,rColList[z+3]);
    } else if(zColourRandomizer[z]===2) {
      fill(rColList[z],rColList[z+3],rectColour);
      stroke(rColList[z],rColList[z+3],rectColour);
    }
    rect(i, height, i+rectWidth, rectHeight);
  }

  avgLine();
  flag();
}

function statsText() {
  let x = width/128, y = height/64;
  fill(0);
  stroke(0);
  text(("Speed = " + initialSpeed),x,y);
  text(("Terrain Variation = " + initialTerrainVariation),x+90,y);
  text(("Rectangle Width = " + rectWidth),x+230,y);
  text(("Time = " + direction),x+360,y);
}

function draw() {
  frameRate(60);
  background(220);
  drawRectangles(height/4,time1,0);
  drawRectangles(height/2,time2,1);
  drawRectangles(height/0.8,time3,2);
  if(drawStats===true) {
    statsText();
  }
  if(direction==='Positive') {
    time1+=speed/2;
    time2+=speed;
    time3+=speed*2
  } else if(direction==='Negative') {
    time1-=speed/2;
    time2-=speed;
    time3-=speed*2
  }
}
