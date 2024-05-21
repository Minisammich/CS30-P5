class Player {
    constructor(x,y) {
      this.pos = createVector(x,y);

      this.speed = createVector(0,0);
      this.moveAccel = 1.5;
      this.speedDecay = 1.5;
      this.maxSpeed = 10;

      this.acceleration = 0.5;
      this.size = createVector(50,80);
      this.onFloor = false;
    }
  
    display() {
      strokeWeight(2);
      fill(255,0,255);
      rect(this.pos.x,this.pos.y,this.size.x,this.size.y); // Will be a sprite at some point.
    }
  
    move() {
      if(keyIsDown(188)) {
        if(this.onFloor) this.speed.y -= 15;
        this.onFloor = false;
      }
      if(keyIsDown(65) && !keyIsDown(69)) {
        if(this.speed.x > -this.maxSpeed) this.speed.x -= this.moveAccel;
      } else if(keyIsDown(69) && !keyIsDown(65)) {
        if(this.speed.x < this.maxSpeed) this.speed.x += this.moveAccel;
      } else {
        if(this.speed.x > 0) this.speed.x -= this.speedDecay;
        if(this.speed.x < 0) this.speed.x += this.speedDecay;
      }

      this.pos.x += this.speed.x;
      this.gravity();
      this.screenCollisions();
    }
  
    gravity() {
      this.speed.y += this.acceleration;
      this.pos.y += this.speed.y;
    }
  
    screenCollisions() {
      if(this.pos.x + this.size.x/2 > width) this.pos.x = width - this.size.x/2;
      if(this.pos.x - this.size.x/2 < 0) this.pos.x = this.size.x/2;
  
      if(this.pos.y + this.size.y/2 > height) {
        this.pos.y = height - this.size.y/2;
        this.speed.y = 0;
        this.onFloor = true;
      }
      if(this.pos.y - this.size.y/2 < 0) {
        this.pos.y = this.size.y/2;
        this.speed.y = 0;
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
      strokeWeight(1);
      rect(this.x,this.y,this.w,this.h);
      fill(255);
    }
  
    collision() {
      let playerPos = player.returnPos();
      let playerSize = player.returnSize();
  
      let collideLeft = playerPos.x + playerSize.x/2 > this.x - this.w/2; 
      let collideRight = playerPos.x - playerSize.x/2 < this.x + this.w/2;
      let collideTop = playerPos.y + playerSize.y/2 > this.y - this.h/2;
      let collideBottom = playerPos.y - playerSize.y/2 < this.y + this.h/2;
  
      let distToBot = dist(0,this.y+this.h/2,0,playerPos.y-playerSize.y/2);
      let distToTop = dist(0,this.y-this.h/2,0,playerPos.y+playerSize.y/2);
      let distToRight = dist(this.x+this.w/2,0,playerPos.x-playerSize.x/2,0);
      let distToLeft = dist(this.x-this.w/2,0,playerPos.x+playerSize.x/2,0);
  
      if(collideTop && collideBottom && collideLeft && collideRight) {
        fill(0,255,0);
        if(distToBot < distToTop) {
          if(distToBot < distToRight && distToBot < distToLeft) {
            player.speed.y = 0;
            player.moveTo(playerPos.x,this.y+this.h/2+playerSize.y/2);
          } else if(distToRight < distToLeft) {
            player.speed.x = 0;
            player.moveTo(this.x+this.w/2+playerSize.x/2,playerPos.y);
          } else {
            player.speed.x = 0;
            player.moveTo(this.x-this.w/2-playerSize.x/2,playerPos.y);
          }
        } else {
          if(distToTop < distToRight && distToTop < distToLeft) {
            player.speed.y = 0;
            player.onFloor = true;
            player.moveTo(playerPos.x,this.y-this.h/2-playerSize.y/2);
          } else if(distToRight < distToLeft) {
            player.speed.x = 0;
            player.moveTo(this.x+this.w/2+playerSize.x/2,playerPos.y);
          } else {
            player.speed.x = 0;
            player.moveTo(this.x-this.w/2-playerSize.x/2,playerPos.y);
          }
        }
      }
    }
  }