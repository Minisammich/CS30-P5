// Objects Demo 2
// Jeffrey Hamilton
// 10/Apr/24
// Objects demo recap, Perlin Noise, Objects Interaction.

// Global Variables.
let points = [];
let reach = 150;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  for(let i = 0; i < points.length; i++) {
    let p = points[i];
    p.connect(points);
    p.display();
    p.moveX();
    p.moveY();
  }
}

function mouseClicked() {
  // Trigger on full press/release mouse interaction.
  points.push(new MovingPoint(mouseX,mouseY));
}

class MovingPoint { 

  // Constructor
  constructor(x,y) {

    // Related to position and Rendering.
    this.x = x; this.y = y; 
    this.size = 40;
    this.c = color(random(255),random(255),random(255));
    
    // Related to Motion.
    this.xTime = random(1e6); this.yTime = random(1e6);
    this.timeShift = 0.01; this.maxSpeed = 5;
  }

  // Class Methods

  getX() {return this.x;}
  getY() {return this.y;}

  display() {

    let mouseDist = dist(mouseX,mouseY,this.x,this.y);
    if(mouseDist < reach) {
      this.size = map(mouseDist, 0, reach, 100, 40);
    } else {
      this.size = 40;
    }

    noStroke();
    fill(this.c);
    circle(this.x, this.y, this.size);
  }

  moveX() {
    let xSpeed = map(noise(this.xTime),0,1,-this.maxSpeed,this.maxSpeed);
    this.xTime += this.timeShift;
    this.x += xSpeed;

    if(this.x < 0) {
      this.x = width;
    } else if(this.x > width) {
      this.x = 0;
    }
  }

  moveY() {
    let ySpeed = map(noise(this.yTime),0,1,-this.maxSpeed,this.maxSpeed);
    this.yTime += this.timeShift;
    this.y += ySpeed;

    if(this.y < 0) {
      this.y = width;
    } else if(this.y > width) {
      this.y = 0;
    }
  }

  connect(pointArray) {
    // Connect points that are nearby with a line segment.
    stroke(this.c);
    for(let p of pointArray) {
      if(p !== this) {
        let d = dist(this.x, this.y, p.getX(), p.getY());
        if(d < reach) {
          line(this.x,this.y, p.getX(), p.getY());
        }
      }
    }
  }
}