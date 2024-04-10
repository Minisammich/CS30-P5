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
let initialTime1, initialTime2, initialTime3; // Initial times to randomize starting positions of each z layer.
let time1, time2, time3, colTime=0;
let direction = 'Positive'; // Sets direction of motion of the terrain.
let heightList = [];
let totalHeight = 0;
let iAtMaxHeight=0; // Position in heightList at highest rectangle.
let colourBrightnessRandomizer = []; // List to store randomized max values for rColList.
let rgbSel = []; // Stores values for whether R, G, or B will be affected by rectHeight.
let rColList = []; // Stores value for rectangle colour based on noise(colTime).

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  fill(0);
  terrainVariation = map(initialTerrainVariation,0,1000,0,0.3); // Maps variation between rectangles from a user readable number to a small decimal to be used.
  speed = map(initialSpeed/rectWidth,0,1000,0,0.25); // Maps speed from a user readable number to a small decimal to be used.
  initialTime1 = random(0,1000000), initialTime2 = random(0,1000000), initialTime3 = random(0,1000000);
  time1 = initialTime1, time2 = initialTime2, time3 = initialTime3;
  randomizeColours(true);
}

function keyPressed() {

  if(keyCode===RIGHT_ARROW&&rectWidth<width) { // Increase width of rectangle when Right Arrow is pressed.
    rectWidth++;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25); // Speed Compensation.

  } else if(keyCode===LEFT_ARROW&&rectWidth>1) { // Decrease width of rectangle when Left Arrow is pressed.
    rectWidth--;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25); // Speed Compensation.
  }

  if(keyCode===UP_ARROW){ // Increase the height variation between two rectangles.
    initialTerrainVariation+=5;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  } else if(keyCode===DOWN_ARROW&&initialTerrainVariation>1) { // Decrease the height variation between two rectangles.
    initialTerrainVariation-=5;
    terrainVariation = map(initialTerrainVariation,0,1024,0,0.3);
  }

  if(keyCode===SHIFT&&initialSpeed<1000) { // Increase speed that the terrain passes by on the screen.
    initialSpeed+=25;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  } else if(keyCode===CONTROL&&initialSpeed>0) { // Decrease speed of terrain.
    initialSpeed-=25;
    speed = map(initialSpeed/rectWidth,0,1024,0,0.25);
  }
}

function keyTyped() {
  if(key===' ') { // Randomizes colours when SPACE is pressed.
    randomizeColours(true);
  }

  if(key==='r') { // Resets time when R is pressed.
    time1 = initialTime1, time2 = initialTime2, time3 = initialTime3;
  }

  if(key==='='&&direction==='Negative') { // Sets direction to Positive when + (= key) is pressed.
    direction = 'Positive';
  } else if(key==='-'&&direction==='Positive') { // Sets direction to Negative when - key is pressed.
    direction = "Negative";
  }
}

function randomizeColours(refresh) { 
  if(refresh===true) { // If refresh is true (At beginning and when SPACE is pressed) randomizes the rgbSel and colourBrightnessRandomizer
    colourBrightnessRandomizer = [];
    rgbSel=[];
    for(let i=0; i<12; i++) {
      colourBrightnessRandomizer.push(int(random(0,250))); // Randomizes max value for rColList values.
    }
    for(let i=0; i<3; i++) {
      rgbSel.push(int(random(0,3))); // Randomizes whether R, G, or B will be affected by rectHeight.
    }
  }
  rColList = [];
  colTime+=0.001;
  let colNoiseSeed = colTime;
  for(let i=0; i<9; i++) {
    rColList.push(map(noise(colNoiseSeed),0,1,0,colourBrightnessRandomizer[i])); // Maps a noise value to each RGB for each Z layer based on max brightness.
    colNoiseSeed+=15;
  }
}


function avgLine() { // Draws the line of mean height of all the rectangles per Z layer.
  let avgHeight = (totalHeight/(width/rectWidth));
  stroke(255,50,100);
  line(0,avgHeight,width,avgHeight);
  totalHeight=0;
}

function flag() { // Draws a flag on the rectangle of peak height.
  let xFlag = (iAtMaxHeight)+(rectWidth/2);
  let yFlag = min(heightList);
  stroke(0);
  line(xFlag,yFlag,xFlag,yFlag-50); // Flag pole.
  fill(70,255,90);
  stroke(70,255,90);
  triangle(xFlag,yFlag-30,xFlag,yFlag-50,xFlag+20,yFlag-40); // Flag.
}

function drawRectangles(drawHeight,time,z) { // Main code for drawing the terrain.
  let rectHeight, terrainNoise;
  x=time;
  heightList=[];

  for(let i=0; i<width; i+=rectWidth) {
    x+=terrainVariation;
    terrainNoise = noise(x);
    rectHeight = map(terrainNoise,0,1,drawHeight,0); // Maps noise value from (0 to 1) to (drawheight to 0).
    rectColour = map(rectHeight,drawHeight,0,0,250); // Maps the rectColour based on how tall the rectangle is (Tall means Brighter).
    heightList.push(rectHeight);

    totalHeight += rectHeight;
    if(rectHeight===min(heightList)) {
      iAtMaxHeight = i;
    }

    let rVal=0, gVal=0, bVal=0;
    if(rgbSel[z]===0) { // Determines whether R, G, or B will be affected by rectColour, the others will be random.
      rVal = map((rectColour+rColList[z]),0,500,0,255);
      gVal = rColList[z+3];
      bVal = rColList[z+6]
    } else if(rgbSel[z]===1) {
      rVal = rColList[z];
      gVal = map((rectColour+rColList[z+3]),0,500,0,255);
      bVal = rColList[z+6];
    } else if(rgbSel[z]===2) {
      rVal = rColList[z];
      gVal = rColList[z+3];
      bVal = map((rectColour+rColList[z+6]),0,500,0,255);
    }
    
    fill(rVal,gVal, bVal);
    stroke(rVal,gVal,bVal);

    rect(i, height, i+rectWidth, rectHeight);
  }

  avgLine();
  flag();
}

function statsText() { // Draws text on the top left to display the user adjustable variables.
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
  randomizeColours(false); // Randomizes colours, but does NOT refresh lists.
  background(30,70,200);
  drawRectangles(height/4,time1,0); // Rear Z layer (0)
  drawRectangles(height/2,time2,1); // Middle Z layer (1)
  drawRectangles(height/0.8,time3,2); // Front Z layer (2)

  if(drawStats===true) { // Only draws stats text if true (allows it to be disabled easily if wanted).
    statsText();
  }

  if(direction==='Positive') { // Determines whether the animation should play forwards or reverse.
    time1+=speed/2;
    time2+=speed;
    time3+=speed*2
  } else if(direction==='Negative') {
    time1-=speed/2;
    time2-=speed;
    time3-=speed*2
  }
}
