// Classes and Objects
// Jeffrey Hamilton
// 08/APR/24
//
// CLASSES AND STUFF

let myWalker;

function setup() {
  createCanvas(windowWidth, windowHeight);
  myWalker = new Walker(width/2,height/2, color("red"));
}

function draw() {
  background(220);
  myWalker.move();
  myWalker.display();
}


class Walker {

  // Constructor
  constructor(x,y,c) {
    this.x = x; this.y = y; this.c = c;
    this.speed = random(2,10);
    this.size = 5;
  }

  // Class Methods
  display() {
    rectMode(CENTER);
    fill(this.c);
    square(this.x,this.y,this.size);
  }

  move() {
    let choice = Math.floor(random(4));

    if(choice===0) this.x -= this.speed;
    else if(choice===1) this.x += this.speed;
    else if(choice===2) this.y -= this.speed;
    else if(choice===3) this.y += this.speed;
  }
}