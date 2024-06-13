// Capstone Platformer Testing
// Jeffrey Hamilton
// 18/May/2024

let bounce;
let testTexture;

const textureSize = 20;

let rows, cols;

let player;
let winZone;
let walls = [];
let wallArray = [];

let winState = false;

let fillColour;

let levEdit = false;
let paused = true;
let isBeginning = true;
let pausedText = "Start Game?";

function preload() {
  bounce = loadSound("assets/soundEffects/bounceSound.wav");

  playerNeutral = loadImage("assets/sprites/transparencyTest.png");

  playerLeft = loadImage("assets/sprites/transparencyTestLeft.png");
  playerLeft0 = loadImage("assets/sprites/transparencyTestLeft0.png");
  playerLeft1 = loadImage("assets/sprites/transparencyTestLeft1.png");

  playerRight = loadImage("assets/sprites/transparencyTestRight.png");
  playerRight0 = loadImage("assets/sprites/transparencyTestRight0.png");
  playerRight1 = loadImage("assets/sprites/transparencyTestRight1.png");

  playerFallingNeutral = loadImage("assets/sprites/transparencyTestFalling.png");
  playerFallingLeft = loadImage("assets/sprites/transparencyTestFalling.png");
  playerFallingRight = loadImage("assets/sprites/transparencyTestFalling.png");

  baseTexture0 = loadImage("assets/textures/dirtTestTexture10_20x20.png");

  skyBG = loadImage("assets/backgrounds/skyTestBG-1920x1280.png")

  topTexture0 = loadImage("assets/textures/grassTestTexture2_20x20.png");
  topTexture1 = loadImage("assets/textures/grassTestTexture3_20x20.png");
  topTexture2 = loadImage("assets/textures/grassTestTexture4_20x20.png");
  topTexture3 = loadImage("assets/textures/grassTestTexture5_20x20.png");
  // topTexture4 = loadImage("assets/textures/grassTestTexture6_20x20.png");
  // topTexture5 = loadImage("assets/textures/grassTestTexture8_20x20.png");

  bottomTexture = loadImage("assets/textures/testTexture2_BOTTOM_20x20.png");

  leftTexture = loadImage("assets/textures/testTexture2_LEFT_20x20.png");
  rightTexture = loadImage("assets/textures/testTexture2_RIGHT_20x20.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  angleMode(DEGREES);

  fillColour = color(255,255,255);

  bounce.setVolume(0.5);

  cols = width/textureSize;
  rows = height/textureSize;

  //loadGameObjects();
  loadWalls(20);
  player = new Player(width/2,height/2);
}

function borderWalls() {
  walls.push(new Wall(-30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width+30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));

  walls.push(new Wall(width/2,-30,width/textureSize,60/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width/2,height+30,width/textureSize,60/textureSize,false,0,true,textureSize));
}

function loadWalls(textureSize) {
  borderWalls();

  for(let i = 0; i < rows; i++) {
    wallArray.push([]);
    for(let j = 0; j < cols; j++) {
      if(round(random(75)) === 0) {
        wallArray[i][j] = 1
      } else {
        wallArray[i][j] = 0;
      }
    }
  }


  let y = round(random(2,rows-2)), x = round(random(2,cols-2));
  wallArray[y][x] = 2;


  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(wallArray[i][j] === 1) {
        walls.push(new Wall((j*textureSize-(textureSize/2)),(i*textureSize-(textureSize/2)),round(random(1,15)),round(random(1,15)),true,0,true,20));
      } else if(wallArray[i][j] === 2) {
        winZone = new WinZone(i*textureSize-(textureSize/2),j*textureSize-(textureSize/2),textureSize*2,textureSize*2);
      }
    }
  }
}

// function loadGameObjects() {
//   walls.push(new Wall(-30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));
//   walls.push(new Wall(width+30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));

//   walls.push(new Wall(width/2,-30,width/textureSize,60/textureSize,false,0,true,textureSize));
//   walls.push(new Wall(width/2,height+30,width/textureSize,60/textureSize,false,0,true,textureSize));

//   for(let i = 0; i < 20; i++) {
//     walls.push(new Wall(round(random(0,width/20))*20,round(random(0,height/20))*20,round(random(1,300/textureSize)),round(random(1,300/textureSize)),true,0,true,textureSize));
//   }
//   player = new Player(width/2,height/2);
//   winZone = new WinZone(random(0,width),random(0,height),textureSize,textureSize);
// }

function draw() {
  if(levEdit) {
    levelEditor();
  } else if(paused) {
    pauseScreen();
  } else if(!winState) {
    frameRate(60);
    background(skyBG);
    fill(255);

    let pauseButton = new CustomButton(width-50,height*0.025,50,30,"Pause",100,100,100);


    player.move();

    if(player.graceFrames <=0) {
      player.againstWall = false;
      player.canJump = false;
    }

    for(w of walls) {
      fillColour = 255;
      if(w.hasHitbox) w.collision();
      if(w.vis) w.display();
    }

    // for(i of wallArray) {
    //   for(w of i) {
    //     if(w != 0 && w != 2) {
    //       stroke(0,255);
    //       if(w.hasHitbox) w.collision();
    //       w.display();
    //     }
    //   }
    // }

    player.display();

    winZone.display();
    winZone.winCheck();

    //buildGrid(20);

    fill(255,200,0);
    textSize(40);
    text(round(frameRate()),50,50);
    textSize(12);

    if(pauseButton.checkIfPressed()) {
      paused = true;
      isBeginning = false;
      pausedText = "Resume?";
    }
    pauseButton.display();


  } else {
    winScreen();
  }
}

function levelEditor() {
  background(skyBG);
  buildGrid(textureSize);

  let menuButton = new CustomButton(width*0.96,height*0.02,50,25,"Menu",215,50,0);
  if(menuButton.checkIfPressed()) {
    paused = true;
    levEdit = false;
    isBeginning = true;
    pausedText = "Start Game?";

  } else if(clickState && mouseButton === LEFT) {
    row = round((mouseY+textureSize/2)/textureSize), col = round((mouseX+textureSize/2)/textureSize);

    walls.push(new Wall(col*textureSize-(textureSize/2),row*textureSize-(textureSize/2),1,1,true,0,true,textureSize));
    clickState = false;
  } else if(clickState && mouseButton === CENTER) {
    row = round((mouseY+textureSize/2)/textureSize), col = round((mouseX+textureSize/2)/textureSize);
    winZone = new WinZone(col*textureSize-(textureSize/2),row*textureSize-(textureSize/2),60,60);
  }
  menuButton.display();


  for(w of walls) {
    w.display();
  }

  winZone.display();
}

function buildGrid(textureSize) {
  stroke(255,0,0,100);
  rectMode(CORNERS);
  for(let i = 0; i < width; i += textureSize) {
    for(let j = 0; j < height; j += textureSize) {
      if(mouseX > i && mouseX <= i+textureSize && mouseY >= j && mouseY < j+textureSize) {
        fill(0,255,0);
      } else {noFill();}
      rect(i,j,i+textureSize,j+textureSize);
    }
  }
  rectMode(CENTER);
}