// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let physicsObjects = [];
let shapeState = "rect";

const y = 0, x = 1;

let launchModifierState = y;
let launchYSpeed = -15;
let launchXSpeed = 0;

function setup() {
  document.addEventListener("contextmenu", event => event.preventDefault())
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
}

function draw() {
  background(220);

  // Draws a cursor of the shape selected.
  fill(30,200,50);
  stroke(20,170,30);
  if(shapeState === "rect") {
    rect(mouseX,mouseY,15);
  } else if(shapeState === "circle") {
    circle(mouseX,mouseY,15);
  } else if(shapeState === "triangle") {
    // Yeah maybe I'll get around to this haha...
  }

  launchArrow(mouseX,mouseY);
  
  // Loop through the objects array.
  for(i = 0; i < physicsObjects.length; i++) {
    s = physicsObjects[i];

    s.display();

    // If object is picked up, move it with cursor, else use gravity.
    if(s.isPickedUp()) {
      s.move();
    } else {
      s.gravity();
    }
  }
}

function launchArrow(x,y) {
  let xOffset = x+launchXSpeed; let yOffset = y+launchYSpeed;
  fill(0);
  stroke(0);
  if(yOffset > y+10 || yOffset < y-10) {
    if(yOffset < y) {
      line(x,y,xOffset,yOffset);
      triangle(xOffset,yOffset,xOffset-5,yOffset+10,xOffset+5,yOffset+10);
    } else {
      line(x,y,xOffset,yOffset);
      triangle(xOffset,yOffset,xOffset-5,yOffset-10,xOffset+5,yOffset-10);
    }
  }
}


function keyPressed() {

  // Loops through possible shape selections with press of SHIFT.
  if(keyCode === 16) { // 16 = SHIFT.
    if(shapeState === "rect") {
      shapeState = "circle";
    } else if(shapeState === "circle") {
      shapeState = "rect";
    }
  }


  if(keyCode === 17) {
    if(launchModifierState === y) {
      launchModifierState = x;
    } else if(launchModifierState === x) {
      launchModifierState = y;
    }
  }

}

function mousePressed() {

  // Spawns new PhysicsObject of shape selected.
  if(mouseButton===CENTER) {
    let c = color(random(255),random(255),random(255));
    physicsObjects.push(new PhysicsObject(mouseX,mouseY,50,c,shapeState,launchXSpeed,launchYSpeed));
  }

  // Loops through objects array
  for(i = 0; i < physicsObjects.length; i++) {
    let s = physicsObjects[i];
    if(mouseButton===LEFT) {
      s.mousePressed(); // Calls classes mousePressed method if left click is pressed.
    } else if(mouseButton === RIGHT&&s.isInBounds()) {
      physicsObjects.splice(i,1); // Deletes object if it is right clicked on.
      i--;
    }
  }
}

function mouseReleased() {
  for(s of physicsObjects) {
    s.mouseReleased(); // Calls classes mouseReleased method when any mouse click is released.
  }
}

function mouseWheel() {

  let mWheel = (event.delta/75);

  if(launchModifierState === y) {
    launchYSpeed += mWheel;
  } else if(launchModifierState === x) {
    launchXSpeed += mWheel;
  }

  console.log(launchYSpeed,launchXSpeed);
}

class PhysicsObject {

  constructor(x,y,size,colour,shape, xSpeed, ySpeed) {
    // Position.
    this.x = x; this.y = y; this.offX = 0; this.offY = 0;
    
    // States and Properties.
    this.pickedUp = false; this.size = size; this.colour = colour; this.shape = shape;

    // Motion.
    this.xSpeed = xSpeed; // Speed in the y direction. (Pixels per Frame ==> px/F)
    this.ySpeed = ySpeed; // Speed in the y direction. (Pixels per Frame ==> px/F)
    this.yAccel = 1.5; // Acceleration in the y direction (px/F²).
    this.bounce = 0.25; // Amount of energy retained on collision (1 = 100%).
  }

  display() {

    noStroke();
    fill(this.colour);

    if(this.shape==="rect") {
      rect(this.x,this.y,this.size);
    } else if (this.shape === "circle") {
      circle(this.x,this.y,this.size);
    }
  }

  move() {
    if(this.pickedUp) {
      this.x = this.offX + mouseX; this.y = this.offY + mouseY;
    }
  }

  gravity() {
    if(this.y+(this.size/2)+this.ySpeed < height) { // If object is above bottom of screen
      this.y += this.ySpeed;
      this.ySpeed += this.yAccel;
    } else {

      // Resets y position and lowers speed to prevent oscillations.
      if(this.ySpeed < (this.yAccel*5) && this.ySpeed > (-this.yAccel*5)) {
        this.ySpeed -= (this.yAccel);
        this.y = height-(this.size/2);
      }

      // Inverts speed and applies bounce modifier to simulate a loss of energy.
      this.ySpeed *= -this.bounce;
    }
  }

  mousePressed() {
    let radius = this.size/2;
    if((mouseX<this.x+radius)&&(mouseX>this.x-radius)&&(mouseY<this.y+radius)&&(mouseY>this.y-radius)) {
      this.offX = this.x-mouseX; this.offY = this.y-mouseY;
      this.pickedUp = true;
    }
  }

  mouseReleased() {
    if(this.pickedUp) {
      this.pickedUp = false;
    }
  }

  isPickedUp() {
    if(this.pickedUp){
      return true;
    }
  }

  isInBounds() {
    let radius = this.size/2;
    if((mouseX<this.x+radius)&&(mouseX>this.x-radius)&&(mouseY<this.y+radius)&&(mouseY>this.y-radius)) {
      return true;
    }
  }
}

