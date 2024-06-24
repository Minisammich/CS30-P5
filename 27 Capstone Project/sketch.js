// Capstone Platformer Testing
// Jeffrey Hamilton
// 18/May/2024

let bounce; // Test sound used to make sure the final sounds will play at the right moments.

const textureSize = 20;

const W = 188;
const A = 65;
const S = 79;
const D = 69;

let rows, cols;

let player; // Variable to hold player object.
let winZone; // Variable to hold win zone object.
let walls = []; // Array for wall objects.
let wallArray = []; // Array to load wall positions from a file.
let winPos;
let playerStart;

let winState = false;

let fillColour;

let levEdit = false; // Whether to run level editor or not.
let wallPlaceSize;

let paused = true; // Whether game is paused or not.
let isBeginning = true; // Whether game has just begun.
let pausedText = "Start Game?"; // What text is displayed on the pause menu button.

function preload() {
  bounce = loadSound("assets/soundEffects/bounceSound.wav");

  // Player stationary sprite.
  playerNeutral = loadImage("assets/sprites/transparencyTest.png");

  // Player moving left sprites.
  playerLeft = loadImage("assets/sprites/transparencyTestLeft.png");
  playerLeft0 = loadImage("assets/sprites/transparencyTestLeft0.png");
  playerLeft1 = loadImage("assets/sprites/transparencyTestLeft1.png");

  // Player moving right sprites.
  playerRight = loadImage("assets/sprites/transparencyTestRight.png");
  playerRight0 = loadImage("assets/sprites/transparencyTestRight0.png");
  playerRight1 = loadImage("assets/sprites/transparencyTestRight1.png");

  // Player falling sprites.
  playerFallingNeutral = loadImage("assets/sprites/transparencyTestFalling.png");
  playerFallingLeft = loadImage("assets/sprites/transparencyTestFalling.png");
  playerFallingRight = loadImage("assets/sprites/transparencyTestFalling.png");

  // Main wall texture.
  baseTexture0 = loadImage("assets/textures/dirtTestTexture10_20x20.png");

  skyBG = loadImage("assets/backgrounds/skyTestBG-1920x1280.png")

  // Top of wall textures.
  topTexture0 = loadImage("assets/textures/grassTestTexture2_20x20.png");
  topTexture1 = loadImage("assets/textures/grassTestTexture3_20x20.png");
  topTexture2 = loadImage("assets/textures/grassTestTexture4_20x20.png");
  topTexture3 = loadImage("assets/textures/grassTestTexture5_20x20.png");
  // topTexture4 = loadImage("assets/textures/grassTestTexture6_20x20.png");
  // topTexture5 = loadImage("assets/textures/grassTestTexture8_20x20.png");

  //bottomTexture = loadImage("assets/textures/testTexture2_BOTTOM_20x20.png");
  // leftTexture = loadImage("assets/textures/testTexture2_LEFT_20x20.png");
  // rightTexture = loadImage("assets/textures/testTexture2_RIGHT_20x20.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  angleMode(DEGREES);

  fillColour = color(255,255,255);

  bounce.setVolume(0.5);

  wallPlaceSize = createVector(5,5);
  playerStart = createVector(0,0);

  cols = width/textureSize;
  rows = height/textureSize;

  loadWalls(20,true);
  player = new Player(width/2,height/2);
}

function borderWalls() { // Adds walls to the borders of the screen (So player doesn't fall out).
  walls.push(new Wall(-30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width+30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));

  walls.push(new Wall(width/2,-30,width/textureSize,60/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width/2,height+30,width/textureSize,60/textureSize,false,0,true,textureSize));
}

function loadWalls(textureSize,init) {
  borderWalls();

  if(init) {
    wallArray = [];
    for(let i = 0; i < rows; i++) {
      wallArray.push([]);
      for(let j = 0; j < cols; j++) {
        wallArray[i][j] = 0;
        // if(round(random(75)) === 0) {
        //   wallArray[i][j] = 1
        // } else {
        //   wallArray[i][j] = 0;
        // }
      }
    }

    // Randomizes win zone position (Only for testing).
    let y = round(random(2,rows-2)), x = round(random(2,cols-2));
    wallArray[y][x] = 2;
  }


  // Adds walls to array based on where wallArray specifies.
  for(let i = 0; i < rows; i++) {
    for(let j = 0; j < cols; j++) {
      if(wallArray[i][j] != 0 && wallArray[i][j] != 2 && wallArray != 3) {
        let currWall = wallArray[i][j];
        walls.push(new Wall((j*textureSize-(textureSize/2)),(i*textureSize-(textureSize/2)),currWall.x,currWall.y,true,0,true,20));
      } else if(wallArray[i][j] === 2) {
        winZone = new WinZone(j*textureSize-(textureSize/2),i*textureSize-(textureSize/2),textureSize*2,textureSize*2);
        winPos = createVector(i,j);
      } else if(wallArray[i][j] === 3) {
        playerStart = createVector(j*textureSize,i*textureSize);
      }
    }
  }
}

function draw() {
  if(levEdit) {
    levelEditor();
  } else if(paused) {
    pauseScreen();
  } else if(!winState) {
    frameRate(60);
    background(skyBG);
    fill(255);

    // Creates pause button on the main game window.
    let pauseButton = new CustomButton(width-50,height*0.025,50,30,"Pause",100,100,100);


    player.move();

    // Facilitates "Grace frames" where player can still wall jump despite not being against a wall.
    // (Helps with smooth feel of the game and ease of play.)
    if(player.graceFrames <=0) {
      player.againstWall = false;
      player.canJump = false;
    }

    // Checks for collisions if wall has collisions, displays if wall is visible.
    // (Don't waste time checking or displaying walls that don't need it)
    for(w of walls) {
      fillColour = 255;
      if(w.hasHitbox) w.collision();
      if(w.vis) w.display();
    }

    player.display();

    winZone.display();
    winZone.winCheck();

    fill(255,200,0);
    textSize(40);
    text(round(frameRate()),50,50);
    textSize(12);

    // Checks if the pause button is pressed to pause the game and open pause menu.
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