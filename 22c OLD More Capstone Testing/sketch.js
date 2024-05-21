// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let player;
let walls = [];

function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  player = new Player(0,height/2);
  walls.push(new Wall(width*0.5,height*0.2,500,100));
}

function draw() {
  background(220);


  player.move();
  for(w of walls) {
    w.display();
    w.collision();
  }
  player.display();
}

class Player {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.speed = 5;
    this.size = createVector(50,80);
  }

  display() {
    rect(this.pos.x,this.pos.y,this.size.x,this.size.y); // Will be a sprite at some point.
  }

  move() {
    if(keyIsDown(188)) {
      this.pos.y -= this.speed;
    }
    if(keyIsDown(79)) {
      this.pos.y += this.speed;
    }
    if(keyIsDown(65)) {
      this.pos.x -= this.speed;
    }
    if(keyIsDown(69)) {
      this.pos.x += this.speed;
    }
  }

  moveTo(x,y) {
    this.pos.x = x, this.pos.y = y;
  }

  returnPos() {
    return this.pos;
  }

  returnSize() {
    return this.size;
  }
}

class Wall {
  constructor(x,y,w,h) {
    this.x = x, this.y = y, this.w = w, this.h = h;
  }

  display() {
    rect(this.x,this.y,this.w,this.h);
  }

  collision() {
    let playerPos = player.returnPos();
    let playerSize = player.returnSize();

    let collideLeft = playerPos.x + playerSize.x/2 > this.x - this.w/2; 
    let collideRight = playerPos.x - playerSize.x/2 < this.x + this.w/2;
    let collideTop = playerPos.y + playerSize.y/2 > this.y - this.h/2;
    let collideBottom = playerPos.y - playerSize.y/2 < this.y + this.h/2;

    if(collideLeft && collideRight && collideBottom && collideTop) {
      if(playerPos.x < this.x+this.w/2) {
        player.moveTo((this.x-(this.w/2))-playerSize.x/2,playerPos.y);
      } else {
        player.moveTo((this.x+(this.w/2))+playerSize.x/2,playerPos.y);
      }
    }
  }
}

