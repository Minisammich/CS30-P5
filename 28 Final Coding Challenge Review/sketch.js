// Coding Final Review
// Jeffrey Hamilton
// 14/Jun/2024

let gorillaIdle = [];
let gorillaSwipe = [];
let spiralImages = [];

// Global Variables.
let spirals = []; // To hold spiral Objects.

let currentState = 0; // 0 = Idle, 1 = Swipe.
let gorillaIndex = 0;


function preload() {
  // Spirals 00-15
  for(let i = 0; i <= 15; i++) {
    if(i < 10) {
      spiralImages.push(loadImage("assets/Circle/Circle Animation0" + i + ".png"));
    } else {
      spiralImages.push(loadImage("assets/Circle/Circle Animation" + i + ".png"));
    }
  }

  for(let i = 1; i <= 6; i++) {
    gorillaIdle.push(loadImage("assets/Gorilla/idle" + i + ".png"));
    gorillaSwipe.push(loadImage("assets/Gorilla/swipe" + i + ".png"));
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  spirals.push(new Spiral(mouseX,mouseY));
}

function keyPressed() {
  gorillaIndex = 0;
  if(currentState === 0) currentState = 1;
  else currentState = 0;
}

function draw() {
  background(0);

  // Gorilla Code.
  if(currentState === 0) image(gorillaIdle[gorillaIndex],width/2,height/2);
  else if(currentState === 1) image(gorillaSwipe[gorillaIndex],width/2,height/2);
  if(frameCount % 8 === 0) gorillaIndex++;
  if(gorillaIndex > 5) gorillaIndex = 0;




  // Spiral Code.
  for(i in spirals) {
    let s = spirals[i];
    if(!s.active) {
      spirals.splice(i,1);
    }
    s.display();
  }
}


class Spiral { // Frames 0 - 15
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.currentFrame = 0;
    this.active = true; // For deletion purposes.
  }

  // Class Methods.
  display() {
    if(this.currentFrame > 15) {
      this.active = false;
    } else {
      image(spiralImages[this.currentFrame],this.pos.x,this.pos.y);
      if(frameCount % 3 === 0) this.currentFrame++;
    }
  }
}