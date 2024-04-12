// Objects in Objects.
// Jeffrey Hamilton
// 12/Apr/24
// Storing objects in objects, overwriting objects, basic transformations.

let myPlanet;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  rectMode(CENTER);
  myPlanet = new Planet(width/2, height/2);
}

function draw() {
  background(0);
  myPlanet.display();
}

function mousePressed() {
  if(keyIsPressed && keyCode === SHIFT) {
    myPlanet = new Planet(mouseX,mouseY);
  } else {
    myPlanet.createMoon();
  }

}

function keyPressed() {
  if(keyCode != SHIFT) {
    myPlanet.relocate(mouseX,mouseY);
  }
}

class Planet {
  
  constructor(x,y) {
    this.x = x; this.y = y; this.s = 100;
    this.moons = [];
  }

  createMoon() {
    this.moons.push(new Moon(this.x,this.y,120,25));
  }

  relocate(x,y) {
    this.x = x, this.y = y;
    for(let m of this.moons) {
      m.x = x;
      m.y = y;
    }
  }

  display() {
    strokeWeight(3);
    stroke(0,90,100);
    fill(20,110,205);
    circle(this.x,this.y,this.s);

    for(let m of this.moons) {
      m.update();
    }

    noStroke();
    fill(220)
    // for(let i = 0; i < 5; i++) {
    //   rect(width/2+random(-30,30),height/2+random(-30,30),this.s/random(3,5),this.s/random(12,20));
    // }
  }
}

class Moon {
  constructor(x,y,r,size) {
    this.x = x; this.y = y; this.size = size;
    this.speed = 2; this.orbitRadius = r; this.angle = 0;

    this.moons = [];
    
  }

  update() {
    this.move();
    this.display();
  }

  move() {
    this.angle += this.speed;
  }

  display() {
    push();
    translate(this.x,this.y);
    rotate(this.angle);

    fill(90);
    stroke(50);
    circle(this.orbitRadius,0,this.size);
    pop();
  }
}