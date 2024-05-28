// Local Storage, Sound, and CSS Centering
// Jeffrey Hamilton
// 07/May/2024

let music, bounceSFX;
let started = false;
let pos, vel, diameter = 30;
let totalBounces = 0;

function preload() {
  music = loadSound("assets/background.mp3");
  bounceSFX = loadSound("assets/bounceSound.wav");
}

function setup() {
  createCanvas(600,400);
  textSize(60);
  textAlign(CENTER);
  pos = createVector(width/2,height/2);
  vel = createVector(random(-10,10),random(-10,10));

  if(localStorage.getItem("bounce") === null) {
    localStorage.setItem("bounce", 0);
  } else {
    totalBounces = int(localStorage.getItem("bounce"));
  }
}

function draw() {
  background(121,56,150);
  if(!started) {
    text("Click to Begin",width/2,height/2);
    if(mouseIsPressed) {
      started = true;
      music.setVolume(0.05);
      music.loop();
    }
  } else {
    updateBall();
    fill(0);
    text(totalBounces, width/2, height/2);
  }
}

function updateBall() {
  let radius = diameter/2;
  pos.add(vel);
  if(pos.x-radius < 0 || pos.x+radius > width) {
    vel.x *= -1;
    bounceSFX.play();
    totalBounces++;
    localStorage.setItem("bounce", totalBounces);
  }
  if(pos.y+radius < 0 || pos.y+radius > height) {
    vel.y *= -1;
    bounceSFX.play();
    totalBounces++;
    localStorage.setItem("bounce", totalBounces);
  }
  fill(0,200,54);
  circle(pos.x,pos.y,diameter);
}