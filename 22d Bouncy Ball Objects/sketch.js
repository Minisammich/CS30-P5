let bouncyBalls = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i < 50; i++) {
    let noiseInput = i/1000;
    let vX = map(noise(noiseInput),0,1,-10,10);
    let vY = map(noise(noiseInput+1e6),0,1,-10,10);
    bouncyBalls.push(new BouncyBall(width/2,height/2,50,vX,vY));
  }
}

function draw() {
  background(220);
  for(i in bouncyBalls) {
    b = bouncyBalls[i];
    b.update();
    b.display();
  }
}

class BouncyBall { 
  constructor(x,y,d,xVel,yVel) {
    this.x = x, this.y = y, this.diameter = d;
    this.xVel = xVel; this.yVel = yVel;
    this.colour = color(random(255),random(255),random(255));
  }

  display() {
    fill(this.colour);
    circle(this.x,this.y,this.diameter);
  }

  update() {
    let r = this.diameter/2;
    this.y += this.yVel;
    this.x += this.xVel;
    if(this.x - r < 0 || this.x + r > width) {
      this.xVel *= -1;
    } 
    if(this.y - r < 0 || this.y + r > height) {
      this.yVel *= -1;
    }
  }
}