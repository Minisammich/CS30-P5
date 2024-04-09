// Object Notation
// Jeffrey Hamilton
// 28/Mar/2024

let ballArray = [];
let showBallText = true;
let chaosMode = true;
let ballDecayMode = false;
let physicsMode = false;

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

function spawnBall(initialX,initialY) {
  let ball = {
    x: initialX,
    y: initialY,
    diameter: 30,
    xSpeed: random(-5,5),
    ySpeed: random(-5,5),
    colour: [random(0,255),random(0,255),random(0,255)],
    bounces: 0,
    ballLife: round(random(5,20)), // Number of bounces the ball will reach before being discarded.
    cooldown: 100, // Number of frames before ball can duplicate on contact with a wall in Chaos Mode.
  };
  ballArray.push(ball);
}

function collisions(j) { // Doesn't work very well, but working now.
  let bCurr = ballArray[j];
  let diameter = bCurr.diameter;
  for(i=0; i<ballArray.length; i++) {
    if(i!=j) {
      let b = ballArray[i];
      let xBounds = (bCurr.x-(diameter/2) <= b.x+(diameter/2) && bCurr.x+(diameter/2.5) >= b.x-(diameter/2.5));
      let yBounds = (bCurr.y-(diameter/2) <= b.y+(diameter/2) && bCurr.y+(diameter/2.5) >= b.y-(diameter/2.5)); 
      if(xBounds&&yBounds) {
        let currentXSpeed = bCurr.xSpeed;
        let currentYSpeed = bCurr.ySpeed;
        bCurr.xSpeed = b.xSpeed;
        bCurr.ySpeed = b.ySpeed;
        b.xSpeed = currentXSpeed;
        b.ySpeed = currentYSpeed;

        b.bounces++;
        bCurr.bounces++;
      }
    }
  }
}



function draw() {
  background(220);
  for(let i=0; i<ballArray.length; i++) {
    let b=ballArray[i];

    if(b.x < 0 || b.x > width) {
      b.xSpeed *= -1; // Inverts speed to switch direction.
      b.bounces++; // Increases bounce variable to keep track of when the ball should be discarded.

      if(chaosMode&&b.cooldown===0) { // You can see where this is going...
        b.cooldown = 100;
        spawnBall(b.x+b.xSpeed,b.y);
      }
    }
    if(b.y < 0 || b.y > height) {
      b.ySpeed *= -1; // Inverts speed to switch direction.
      b.bounces++; // Increases bounce variable to keep track of when the ball should be discarded.

      if(chaosMode&&b.cooldown===0) { // You can see where this is going...
        b.cooldown = 100;
        spawnBall(b.x,b.y+b.ySpeed);
      }
    }

    if(physicsMode) {collisions(i);}

    if(chaosMode&&b.cooldown>0) {
      b.cooldown--;
    }

    if((b.bounces>=b.ballLife)&&ballDecayMode===true) {
      ballArray.splice(i,1); // Removes the current ball.
      i--; // Next ball in ballArray becomes current i value, so i-- to repeat the current i to not skip next ball.
    } else {
      fill(b.colour);
      noStroke();
      circle(b.x,b.y,b.diameter);

      if(showBallText) { // Displays bounces on ball if showBallText is true.
        stroke(0);
        fill(255);
        if(chaosMode) {
          text(b.cooldown,b.x,b.y+5); // Draws the cooldown used for Chaos Mode on the ball.
        } else if(ballDecayMode===true) {
          text((b.bounces + "/" + b.ballLife),b.x,b.y+5); // Draws the bounces/ballLife on the ball.
        } else {
          text(b.bounces,b.x,b.y+5)
        }
      }

      b.x+=b.xSpeed;
      b.y+=b.ySpeed;
    }
  }
}
