// Working with Forces
// Jeffrey Hamilton
// 22/Apr/2024

let particles = [];
let gravity;

function setup() {
  createCanvas(windowWidth, windowHeight);
  gravity = createVector(0,0.1);
}

function draw() {
  background(220);

  for(let i = 0; i < 1; i++) {
    particles.push(new Particle(mouseX,mouseY));
  }

  for(let i in particles) {
    let p = particles[i];
    p.display();
    p.move();

    if(!p.isAlive()) {
      particles.splice(i,1);
      i--;
    }
  }
}

function mousePressed() {
  particles.push(new Particle(mouseX,mouseY));
}

class Particle {
  constructor(x,y) {
    this.position = createVector(x,y); this.s = 20;
    this.velocity = createVector(random(-3,3),random(-5,-3));
    this.c = color(0,100,random(150,255),100);
  }

  move() {
    this.velocity.add(gravity);

    this.position.add(this.velocity);
  }

  display() {
    fill(this.c); noStroke();
    push();
    translate(this.position.x,this.position.y);
    circle(0,0,this.s);
    pop();
  }

  returnPosition() {
    return(this.position);
  }

  isAlive() {
    if(this.position.y > height || this.position.y < 0 || this.position.x < 0 || this.position.x > width) {
      return(false);
    } else {
      return(true);
    }
  }
}