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
  testTexture0 = loadImage("assets/textures/testTexture2_20x20.png");
  testTexture1 = loadImage("assets/textures/testTexture2_TOP_20x20.png");
  testTexture2 = loadImage("assets/textures/testTexture2_BOTTOM_20x20.png");
  testTexture3 = loadImage("assets/textures/testTexture2_LEFT_20x20.png");
  testTexture4 = loadImage("assets/textures/testTexture2_RIGHT_20x20.png");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  textAlign(CENTER);
  angleMode(DEGREES);

  fillColour = color(255,255,255);

  bounce.setVolume(0.5);

  walls.push(new Wall(-30,height/2,60,height,false,0,true));
  walls.push(new Wall(width+30,height/2,60,height,false,0,true));

  walls.push(new Wall(width/2,-30,width,60,false,0,true));
  walls.push(new Wall(width/2,height+30,width,60,false,0,true));

  for(let i = 0; i < 50; i++) {
    walls.push(new Wall(random(0,width),random(0,height),random(0,300),random(0,300),true,0,true));
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


  fill(255,200,0);
  textSize(40);
  text(round(frameRate()),50,50);
  textSize(12);
}