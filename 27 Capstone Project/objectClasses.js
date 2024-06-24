function keyPressed() {
  if(keyCode === W) {
    if((player.againstWall && player.jumpCounter === 1) || (player.canJump && player.jumpCounter === 2)) {
      bounce.play();
      player.speed.y = -15;
      if(player.againstWall && player.jumpCounter === 1) player.speed.x += player.wallJumpSpeed;
    }

    if(player.againstWall && player.jumpCounter > 0 && player.jumpCounter <= 1) player.jumpCounter--;
    if(player.canJump && player.jumpCounter === 2) player.jumpCounter--;
    if(player.jumpCounter <= 0 ) player.canJump = false;
  }
}

class Player {
    constructor(x,y) {
      this.pos = createVector(x,y);

      this.speed = createVector(0,0);
      this.moveAccel = 1;
      this.speedDecay = 1;
      this.maxSpeed = 10;

      this.spriteState = 0;

      this.acceleration = 0.75;
      this.size = createVector(50,80);
      this.againstWall = false;
      this.wallJumpMod = 10;
      this.wallJumpSpeed = 0;
      this.canJump = false;
      this.jumpCounter = 2;
      this.graceFrames = 0;
    }
  
    display() {
      strokeWeight(2);
      fill(255,0,255);

      // Draws different sprites based on state.
      switch(this.spriteState) {

        case 0:
          image(playerNeutral,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case 1:
          image(playerRight,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case 1.1:
          image(playerRight0,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case 1.2:
          image(playerRight1,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case -1:
          image(playerLeft,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case -1.1:
          image(playerLeft0,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case -1.2:
          image(playerLeft1,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case 0.5:
          image(playerFallingNeutral,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case 1.5:
          image(playerFallingRight,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;

        case -1.5:
          image(playerFallingLeft,this.pos.x-this.size.x/2,this.pos.y-this.size.y/2);
          break;
          
      }
      
      fill(255);
      // text(this.jumpCounter,this.pos.x,this.pos.y);
      // text(this.wallJumpSpeed,this.pos.x,this.pos.y-20);
      // text(this.graceFrames,this.pos.x,this.pos.y + 20);
      // text(this.spriteState,this.pos.x,this.pos.y);
      if(this.graceFrames > 0) this.graceFrames--;
    }
  
    move() { // Checks keys and moves player accordingly.

      // Sets whether to display neutral or falling sprites.
      if(this.speed.y > 0) {
        this.spriteState = 0.5;
      } else {
        this.spriteState = 0;
      }

      // Currently set for Dvorak layout, will change.
      if(keyIsDown(A) && !keyIsDown(D)) {
        if(this.speed.x > -this.maxSpeed) this.speed.x -= this.moveAccel; // Speed Limit!

        // Progresses sprite to facilitate walking animation.
        if(this.spriteState === 0) {
          if(frameCount % 15 <= 5) {
            this.spriteState = -1;
          } else if(frameCount % 15 <= 10) {
            this.spriteState = -1.1;
          } else if(frameCount % 15 <= 15) {
            this.spriteState = -1.2;
          }
        } else {this.spriteState = -1.5;}

      } else if(keyIsDown(D) && !keyIsDown(A)) {
        if(this.speed.x < this.maxSpeed) this.speed.x += this.moveAccel; // Speed limit!
        
        // Progresses sprite to facilitate walking animation.
        if(this.spriteState === 0) {
          if(frameCount % 15 <= 5) {
            this.spriteState = 1;
          } else if(frameCount % 15 <= 10) {
            this.spriteState = 1.1;
          } else if(frameCount % 15 <= 15) {
            this.spriteState = 1.2;
          }
        } else {
          this.spriteState = 1.5;
        }

      } else {

        // Decays speed to decelerate instead of stopping on a dime.
        if(this.speed.x > 0) this.speed.x -= this.speedDecay;
        if(this.speed.x < 0) this.speed.x += this.speedDecay;
        if(this.speed.x < 1 && this.speed.x > -1) this.speed.x = 0;
      }

      this.pos.x += this.speed.x;
      this.gravity();
    }
  
    gravity() { // Player falls instead of floating.
      this.speed.y += this.acceleration;
      this.pos.y += this.speed.y;
    }
  
    moveTo(x,y) { // Moves player to a new position.
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
    constructor(x,y,w,h,vis,rotation,hasHB,textureSize) {
      this.x = round(x), this.y = round(y), this.w = w*textureSize, this.h = h*textureSize;
      this.rotation = rotation;
      this.texSize = textureSize;

      this.hasHitbox = round(hasHB);
      this.vis = vis;

      this.topTextureArray = [];

      this.generateTopTextureArray(textureSize,4);
    }
  
    display() {
      push();
      translate(this.x,this.y);
      rotate(this.rotation);
      strokeWeight(1);
      fill(fillColour);
      let sizeX = this.texSize, sizeY = this.texSize;
      let texArrPos = 0; // Position in the Top Texture Array.


      // Determines based on position of wall, what texture to display.
      for(let i = -this.w/2; i < this.w/2; i += sizeX) {
        for(let j = -this.h/2; j < this.h/2; j += sizeY) {
          if(i === -this.w/2) {
            if(j !== -this.h/2) {
              image(baseTexture0,i,j);
            } else {
              let num = this.topTextureArray[texArrPos];
              texArrPos++;
              this.topTexture(i,j,num);
            }

          } else if(i >= this.w/2-sizeX) {
            if(j !== -this.h/2) {
              image(baseTexture0,i,j);
            } else {
              let num = this.topTextureArray[texArrPos];
              texArrPos++;
              this.topTexture(i,j,num);
            }

          } else if(j === -this.h/2) {
            let num = this.topTextureArray[texArrPos];
            texArrPos++;
            this.topTexture(i,j,num);

          } else if(j >= this.h/2-sizeY) {
            image(baseTexture0,i,j);

          } else {
            image(baseTexture0,i,j);
          }
        }
    }
      pop();
    }

    generateTopTextureArray(sizeX,numTextures) {
      // Randomizes top textures.
      for(let i = 0; i < this.w; i += sizeX) {
        this.topTextureArray.push(round(random(0,numTextures-1)));
      }
    }

    topTexture(i,j,num) {
      // Draws different textures on top of wall to break the tiled look.
      if(num === 0) image((topTexture0),i,j);
      if(num === 1) image((topTexture1),i,j);
      if(num === 2) image((topTexture2),i,j);
      if(num === 3) image((topTexture3),i,j);
      // if(num === 4) image((topTexture4),i,j);
      // if(num === 5) image((topTexture5),i,j);
    }
  
    collision() {
      let playerPos = player.returnPos();
      let playerSize = player.returnSize();
  
      // Checks which edges the player is on/within.
      let collideLeft = playerPos.x + playerSize.x/2+1 > this.x - this.w/2; 
      let collideRight = playerPos.x - playerSize.x/2-1 < this.x + this.w/2;
      let collideTop = playerPos.y + playerSize.y/2 > (this.y) - this.h/2;
      let collideBottom = playerPos.y - playerSize.y/2 < this.y + this.h/2;
  
      // Checks which edge the player is nearest.
      let distToBot = dist(0,this.y+this.h/2,0,playerPos.y-playerSize.y/2);
      let distToTop = dist(0,this.y-this.h/2,0,playerPos.y+playerSize.y/2);
      let distToRight = dist(this.x+this.w/2,0,playerPos.x-playerSize.x/2,0);
      let distToLeft = dist(this.x-this.w/2,0,playerPos.x+playerSize.x/2,0);
  
      if(collideTop && collideBottom && collideLeft && collideRight) {
        fillColour = color(0,255,0);
        player.graceFrames = 5; // Resets grace frames when player is against a wall.

        if(distToBot < distToTop) { // If player is closer to bottom of wall than top.

          if(distToBot < distToRight && distToBot < distToLeft) { // If player is not closer to right or left than bottom.
            player.speed.y = 0;
            player.moveTo(playerPos.x,this.y+this.h/2+playerSize.y/2);
          } else { // Player is considered against a wall.
            player.canJump = true;
            player.againstWall = true;
            if(distToRight < distToLeft) { // Checks which side of wall player is against. Sets jump direction modifier accordingly.
              player.wallJumpSpeed = player.wallJumpMod;
              player.speed.x = 0;
              player.moveTo(this.x+this.w/2+playerSize.x/2,playerPos.y);
            } else {
              player.wallJumpSpeed = -player.wallJumpMod;
              player.speed.x = 0;
              player.moveTo(this.x-this.w/2-playerSize.x/2,playerPos.y);
            }

          }
        } else if(distToTop < distToRight && distToTop < distToLeft) { // If player is on top of wall object.
          if(player.speed.y > 5) bounce.play(); // Plays sound when player hits a floor with >5 speed. (Player landing sfx eventually.)
          player.speed.y = 0;
          player.canJump = true;
          player.jumpCounter = 2;
          player.moveTo(playerPos.x,(this.y)-this.h/2-playerSize.y/2);
        } else {
          player.canJump = true;
          player.againstWall = true;
          if(distToRight < distToLeft) { // Checks which side of wall player is against. Sets jump direction modifier accordingly.
            player.wallJumpSpeed = player.wallJumpMod;
            player.speed.x = 0;
            player.moveTo(this.x+this.w/2+playerSize.x/2,playerPos.y);
          } else {
            player.wallJumpSpeed = -player.wallJumpMod;
            player.speed.x = 0;
            player.moveTo(this.x-this.w/2-playerSize.x/2,playerPos.y);
          }
        }
      }
    }
  }



  class WinZone {
    constructor(x,y,w,h) {
      this.x = x, this.y = y, this.w = w, this.h = h;
    }

    winCheck() {
      if(player.pos.x-player.size.x/2 < this.x+this.w/2 && player.pos.x+player.size.x/2 > this.x-this.w/2) {
        if(player.pos.y-player.size.y/2 < this.y+this.h/2 && player.pos.y+player.size.y/2 > this.y-this.h/2) {
          // If the player is within the bounds of the win zone square, player wins.
          winState = true;
          completedLevel();
        }
      }
    }

    display() {
      fill(255);
      if(winState) fill(0,255,0);
      rect(this.x,this.y,this.w,this.h);
    }
  }