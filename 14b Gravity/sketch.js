// Project Title
// Your Name
// Date

let ballArray = [];
let showBallText = false;
let bounce = 0.75; // Amount of speed maintained upon contact with the bottom of the screen.
let gravity = 0.75; // Speed increase per frame.

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  strokeWeight(1);
  textAlign(CENTER);
  textSize(15);
}

function mousePressed() {
  spawnBall(mouseX,mouseY);
}

function keyTyped() {
  if(key===" ") {
    ballArray = [];
  }
}

function spawnBall(initialX,initialY) {
  let ball = {
    x: initialX,
    y: initialY,
    diameter: 30,
    xSpeed: random(-4,4),
    ySpeed: 0,
    colour: [random(0,255),random(0,255),random(0,255)],
    bounces: 0,
  };
  ballArray.push(ball);
}

function collisions(i) { // Doesn't work very well, but working now.
  let bCurr = ballArray[i];
  let diameter = bCurr.diameter;
  let radius = diameter/2;
  for(j=0; j<ballArray.length; j++) {
    b2 = ballArray[j];
    if(i!=j) {
      if(bCurr.x+radius>=b2.x-radius&&bCurr.x-radius<=b2.x+radius) {
        if(bCurr.y+radius>=b2.y-radius&&bCurr.y-radius<=b2.y+radius) {
          bCurr.xSpeed = b2.xSpeed;
          bCurr.ySpeed = b2.ySpeed;
        }
      }
    }
  }
}

function draw() {
  background(220);

  for(i=0; i<ballArray.length; i++) {
    b = ballArray[i];

    if(b.y+(b.diameter/2)>height || b.y-(b.diameter/2) < 0) {
      //b.bounces++;
      b.ySpeed *= -bounce;
      b.xSpeed *= bounce;
      b.y = height-(b.diameter/2-1);
    } else {
      b.ySpeed += gravity;
    }

    if(b.x+(b.diameter/2)>width || b.x-(b.diameter/2)<0) {
      b.xSpeed *= -bounce;
    }


    fill(b.colour);
    //if(ballArray.length > 1) {collisions(i);}
    b.y += b.ySpeed;
    b.x += b.xSpeed;
    circle(b.x,b.y,b.diameter);

    if(showBallText) { // Displays bounces on ball if showBallText is true.
      stroke(0);
      fill(255);
      text(b.xSpeed,b.x,b.y+5)
    }  
  }
}
