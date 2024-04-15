// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cars = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  noStroke();
  for(let i = 0; i < 20; i++) {
    cars.push(new Car(random(0,width)));
  }
}

function draw() {
  background(90);
  fill(25);

  road();
  for(let i = 0; i < cars.length; i++) {
    let car = cars[i];
    car.display();
    car.move();
    car.update();
  }
}

function road() {
  rectMode(CORNERS);
  rect(0,height*0.2,width,height*0.8);
  for(i = 0; i < width; i += 150) {
    fill(200,200,50);
    rect(i,(height/2 + 5), i+70, (height/2 - 5));
  }
}

class Car {
  constructor(x) {
    let lane = round(random(50));
    if(lane < 25) {
      this.lane = "eastbound";
    } else {
      this.lane = "westbound";
    }
    if(this.lane === "eastbound") {
      this.x = x; this.y = height*(random(0.55,0.75));
    } else {
      this.x = x; this.y = height*(random(0.25,0.45));
    }
    this.colour = color(random(255),random(255),random(255));
    this.speed = random(1,4);
    this.state = round(random(1));
    
  }
  
  display() {
    fill(this.colour);
    noStroke();
    rectMode(CENTER);
    if(this.state === 0) { // Car.
      rect(this.x,this.y,75,35);
      stroke(0);

      if(this.lane === "eastbound") {
        fill(90);
        rect(this.x-15,this.y,40,30);
        fill(255,255,0);
        circle(this.x+30,this.y+12,7);
        circle(this.x+30,this.y-12,7);
      } else {
        fill(90)
        rect(this.x+15,this.y,40,30);
        fill(255,255,0);
        circle(this.x-30,this.y+12,7);
        circle(this.x-30,this.y-12,7);
      }

    } else if(this.state === 1) { // Truck.
      rect(this.x,this.y,105,45);

      if(this.lane === "eastbound") {
        stroke(0);
        fill(20);
        rect(this.x-27,this.y,45,38);
        fill(this.colour);
        rect(this.x+10,this.y,30,42)
        fill(255,255,0);
        rect(this.x+47,this.y+15,7,12);
        rect(this.x+47,this.y-15,7,12);
      } else {
        stroke(0);
        fill(20);
        rect(this.x+27,this.y,45,38);
        fill(this.colour);
        rect(this.x-10,this.y,30,42)
        fill(255,255,0);
        rect(this.x-47,this.y+15,7,12);
        rect(this.x-47,this.y-15,7,12);

      }
    }
    
  }
  
  move() {
    if(this.lane === "eastbound") {
      this.x += this.speed;
    } else {
      this.x -= this.speed;
    }
    if(this.x < 0) {
      this.x = width;
    } else if(this.x > width) {
      this.x = 0;
    }
  }
  
  update() {
    let choice = random(200);
    if(choice === 13) {
      this.speed = random(10);
    } else if(choice > 55 && choice < 60){
      this.speed = random(1,4);
    } else if(choice < 1) {
      this.speed = 0;
    } 
  }
  
}