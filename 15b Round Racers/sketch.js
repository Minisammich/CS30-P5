// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let racers = [];
const numRacers = 3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  for(let i=0; i<numRacers; i++) {
    let c = color(random(255),random(255),random(255));
    racers.push(new RoundRacer(0,height/(numRacers/(i+0.5)),c));
  }
}

function draw() {
  background(0);
  for(let racer of racers) {
    racer.display();
    racer.move();
  }
}

class RoundRacer {
  constructor(x,y,c) {
    this.x = x; this.y = y; this.c = c;
    this.speed = random(3,15);
  }

  display() {
    fill(this.c);
    circle(this.x,this.y,45);
  }

  move() {
    if(this.x>width) {
      this.x = 0;
    } else {
      this.x += this.speed;
    }
  }
}
