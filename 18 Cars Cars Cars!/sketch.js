// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let cars = [];
let trafficLights = [];

function setup() {
  document.addEventListener("contextmenu", event => event.preventDefault())
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  angleMode(DEGREES);
  noStroke();
  for(let i = 0; i < 1; i++) {
    cars.push(new Car(random(0,width),-1));
  }
}

function draw() {
  background(90);
  fill(25);

  road();
  for(let i = 0; i < cars.length; i++) {
    let car = cars[i];
    car.action();
  }
  for(let i = 0; i < trafficLights.length; i++) {
    let light = trafficLights[i];
    light.display();
  }
}

function mousePressed() {
  if(mouseButton === LEFT && keyCode === 16){
    // Spawn car in Westbound lane.
    cars.push(new Car(mouseX,50));
  } else if(mouseButton === LEFT){
    // Spawn car in Eastbound lane.
    cars.push(new Car(mouseX,0));
  }

  if(mouseButton === RIGHT) {
    if(mouseY < height/2) {
      // Spawn Traffic Light for Westbound lane.
      trafficLights.push(new TrafficLight(mouseX,0));
    } else if(mouseY > height/2) {
      // Spawn Traffic Light for Eastbound lane.
      trafficLights.push(new TrafficLight(mouseX,1));
    }
  } 

  if(mouseButton === CENTER) { // Deletes traffic light when middle click is pressed while over a light.
    for(let i = 0; i < trafficLights.length; i++) {
      let light = trafficLights[i];
      let pos = light.position();
      let mouseOverLane;

      if(mouseY < height/2) { // Checks which lane the mouse is over.
        mouseOverLane = 0;
      } else {
        mouseOverLane = 1;
      }

      if((mouseX < pos[0]+10) && (mouseX > pos[0]-10) && (mouseOverLane === pos[1])) {
        trafficLights.splice(i,1);
      }

    }
  }

}

function keyReleased() {
  keyCode = 0;
}

function road() {
  rectMode(CORNERS);
  rect(0,height*0.2,width,height*0.8);
  for(i = 0; i < width; i += 150) {
    fill(200,200,50);
    rect(i,(height/2 + 5), i+70, (height/2 - 5));
  }
}

class TrafficLight {
  constructor(x,lane) {
    this.x = x;
    this.lane = lane;
  }

  display() {
    push();

    let xOff = 3;
    if(this.lane === 0) {
      translate(this.x,height*0.2);
      quad(7,18,7,-18,-7,-20,-7,20);
      quad(-7,-20,-7,20,-10,18,-10,-18);
    } else if(this.lane === 1) {
      translate(this.x,height*0.8);
      quad(-7,18,-7,-18,7,-20,7,20);
      quad(7,-20,7,20,10,18,10,-18);
      xOff *= -1;
    }

    fill(70); circle(1,-12,10);
    fill(255,0,0); ellipse(xOff,-12,7,10);

    fill(70); circle(1,0,10);
    fill(255,255,0); ellipse(xOff,0,7,10);

    fill(70); circle(1,12,10);
    fill(0,255,0); ellipse(xOff,12,7,10);


    pop();
  }


  cycle() {
  }

  position() {
    let posArray = [this.x,this.lane];
    return(posArray);
  }
}

class Car {
  constructor(x,lane) {
    if(lane === -1) {
      lane = round(random(50));
    }

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
    if((int(random(99)) === 0) && this.speed+1 < 6) {
      this.speed += 1;
    } else if((int(random(99)) === 0) && this.speed-1 >= 0) {
      this.speed -= 1;
    } else if((int(random(99)) === 0)) {
      this.colour = color(random(255),random(255),random(255));
    }
  }

  action() {
    this.display();
    this.move();
    this.update();
  }
}