// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let time = 0;


let cubes = [];

let cam;
let sensitivity = 5;
let mX = 0, mY = 0, dMX, dMY; // Mouse X/Y and Delta Mouse X/Y.
let camLX = 0, camLY = 0, camLZ = 0; // Cam LookAt X/Y/Z.
let camX = 0, camY = -400, camZ = 800; // Cam X/Y/Z position.

let currentCube = -1;

let currKeyCode;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  //noCursor();

  cam = createCamera();
  cam.setPosition(0,-400,800);
  cam.lookAt(0,0,0);
  cam.perspective(90);
}

function draw() {
  background(220);
  getMousePositions();
  camMovement();
  for(i in cubes) {
    let cube = cubes[i];
    if(cube.followingCursor) cube.followCursor();
    cube.display();
    //cube.gravity();
  }
}

function mousePressed() {
  if(mouseButton === CENTER) {
    cubes.push(new Cube(camLX,camLY,0, 0,0,0, 100));
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

function getMousePositions() {
  dMY = mouseY - pmouseY;
  dMX = mouseX - pmouseX;
  mX += dMX;
  mY += dMY;
}

function camMovement() {
  camLX -= dMX/sensitivity; camLY += dMY/sensitivity;
  // cam.pan(-dMX/sensitivity);
  // cam.tilt(dMY/sensitivity);
  cam.setPosition(camX,camY,camZ);
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
    rotateX(camLX); rotateY(camLY); rotateZ(camLZ);
    translate(this.x,this.y,this.z);
    rotateX(this.rx); rotateY(this.ry); rotateZ(this.rz);
    fill(this.color);
    box(this.size);
    pop();
  }

  followCursor() {
    this.x = camLX; this.y = camLY; this.z = camLZ;
  }

  gravity() {
    if(!this.followingCursor) {
      this.y -= this.ySpeed;
      this.ySpeed -= this.yAccel;
    }
  }

  collisions() {
    //if()
  }
}
