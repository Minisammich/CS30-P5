// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 0;

let cubes = [];
let mX, mY;

let currentCube = -1;

let currKeyCode;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
}

function mousePressed() {
  if(mouseButton === CENTER) {
    cubes.push(new Cube(mX,mY,0,0,0,0,100));
  }

  if(mouseButton === LEFT) {
    for(i in cubes) {
      let c = cubes[i];
      if(mX > c.x-c.size && mX < c.x+c.size && mY > c.y-c.size && mY < c.y+c.size && currentCube === -1) {
        c.followingCursor = true;
        currentCube = i;
      }
    }
  }
}

function mouseReleased() {
  if(currentCube != -1){
    cubes[currentCube].followingCursor = false;
    currentCube = -1;
  }
}

function mouseWheel() {
  let c;
  if(currentCube != -1) c = cubes[currentCube];

  if(!keyIsPressed) keyCode = -1;

  let moveAmount = event.delta/10;

  if(keyCode === SHIFT) {
    c.ry += moveAmount;
  } else {
    c.rx += moveAmount;
  }
}


function draw() {
  background(220);
  mX = map(mouseX,0,width,-width/2,width/2);
  mY = map(mouseY,0,height,-height/2,height/2);
  for(i in cubes) {
    let cube = cubes[i];
    if(cube.followingCursor) cube.followCursor();
    cube.display();
    cube.gravity();
  }
}

class Cube {
  constructor(x,y,z, rx,ry,rz,size){
    this.x = x; this.y = y; this.z = z;
    this.rx = rx; this.ry = ry; this.rz = rz;
    this.size = size; this.color = color(random(255), random(255), random(255));
    this.followingCursor = false;
    this.ySpeed = 0; this.yAccel = 1;
  }

  display() {
    push();
    translate(this.x,this.y,this.z);
    rotateX(this.rx); rotateY(this.ry); rotateZ(this.rz);
    fill(this.color);
    box(this.size);
    pop();
  }

  followCursor() {
    this.x = mX; this.y = mY;
  }

  gravity() {
    if(!this.followingCursor) {
      this.y -= this.ySpeed;
      this.ySpeed -= this.yAccel;
    }
  }
}
