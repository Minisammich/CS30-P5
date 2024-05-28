// Capstone Platformer Testing
// Jeffrey Hamilton
// 18/May/2024

let bounce;
let testTexture;

let player;
let walls = [];

let fillColour;

function preload() {
  bounce = loadSound("assets/soundEffects/bounceSound.wav");

  baseTexture0 = loadImage("assets/textures/cobbleTestTexture2_20x20.png");

  topTexture0 = loadImage("assets/textures/grassTestTexture2_20x20.png");
  topTexture1 = loadImage("assets/textures/grassTestTexture3_20x20.png");
  topTexture2 = loadImage("assets/textures/grassTestTexture4_20x20.png");
  topTexture3 = loadImage("assets/textures/grassTestTexture5_20x20.png");

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

  let textureSize = 20;
  walls.push(new Wall(-30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width+30,height/2,60/textureSize,height/textureSize,false,0,true,textureSize));

  walls.push(new Wall(width/2,-30,width/textureSize,60/textureSize,false,0,true,textureSize));
  walls.push(new Wall(width/2,height+30,width/textureSize,60/textureSize,false,0,true,textureSize));

  for(let i = 0; i < 20; i++) {
    walls.push(new Wall(round(random(0,width/20))*20,round(random(0,height/20))*20,round(random(1,300/textureSize)),round(random(1,300/textureSize)),true,0,true,textureSize));
  }
  player = new Player(width/2,height/2);
}

function draw() {
  frameRate(60);
  background(220);
  fill(255);

  player.move();

  if(player.graceFrames <=0) {
    player.againstWall = false;
    player.canJump = false;
  }
  for(w of walls) {
    fillColour = 255;
    if(w.hasHitbox) w.collision();
    w.display();
  }

  player.display();

  //buildGrid(20);

  fill(255,200,0);
  textSize(40);
  text(round(frameRate()),50,50);
  textSize(12);
}

function buildGrid(textureSize) {
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