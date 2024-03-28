// Object Notation
// Jeffrey Hamilton
// 28/Mar/2024
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let ballArray = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
}

function mousePressed() {
  spawnBall(mouseX,mouseY);
}

function spawnBall(initialX,initialY) {
  let ball = {
    x: initialX,
    y: initialY,
    radius: 30,
    xSpeed: random(-5,5),
    ySpeed: random(-5,5),
    colour: [random(0,255),random(0,255),random(0,255)],
  };
  ballArray.push(ball);
}

function draw() {
  background(220);
  for(let b of ballArray) {

    if(b.x < 0 || b.x > width) {
      b.colour = [random(0,255),random(0,255),random(0,255)];
      b.xSpeed *= -1;
    }
    if(b.y < 0 || b.y > height) {
      b.colour = [random(0,255),random(0,255),random(0,255)];
      b.ySpeed *= -1;
    }

    fill(b.colour);
    circle(b.x,b.y,b.radius);
    b.x+=b.xSpeed;
    b.y+=b.ySpeed;
  }
}
