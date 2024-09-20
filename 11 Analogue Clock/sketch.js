// Analogue Clock - Real Time
// Jeffrey Hamilton
// 18/Mar/2024
//
// Extra for Experts:
// - Analogue clock with accurate time and the option to choose between a smooth seconds hand or a snappy one.

let currentTime = new Date();
let clockSetHours, clockSetMinutes, clockSetSeconds;
let clockHours, clockMinutes, clockSeconds;
let secHandWobble = 0;
let secHandWobbleVel = 2;
let secWobbleAccel = 2;
let framerate = 60;
let wobbleDir = 1;

let state = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  getCurrentTime();
  textAlign(CENTER);
  textSize(40);
}

function draw() {
  background(50,125,200);
  if(state===0) {
    clockOption1(width/2,height/2);
  } else if(state===1) {
    clockOption2(width/2,height/2);
  }
}


function clockOption2(x,y) { // Smooth Seconds Hand. Re grabs true time every minute due to variance of framerate causing drift.
  frameRate(framerate);
  drawClock(x,y);
  hourHand(x,y);
  minuteHand(x,y);
  secondsHand(x,y,1);
  if((frameCount%60)===0) {
    getCurrentTime();
    frameCount=0;
  }
}

function clockOption1(x,y) { // Choppy Seconds Hand. Grabs true time every second. More accurate, less visually appealing.
  frameRate(framerate);
  drawClock(x,y);
  hourHand(x,y);
  minuteHand(x,y);
  secondsHand(x,y,2);
  if((frameCount>=framerate)) {
    getCurrentTime();
    frameCount=0;
  }
}


function keyPressed() {
  if(keyCode===SHIFT&&state===0){
    state=1;
  } else if(keyCode===SHIFT&&state===1) {
    state=0;
  }

  if(keyCode===CONTROL) {
    getCurrentTime();
    frameCount = 0;
  }
}


function drawClock(clockCentreX,clockCentreY) {
  // Main Outline.
  stroke(0);
  strokeWeight(7);
  fill(255);
  circle(clockCentreX,clockCentreY,500);

  // Lines.
  strokeWeight(3);
  push();
  translate(clockCentreX, clockCentreY);
  circle(0,0,3);
  let lineLength;

  for(let i=1; i<=60; i++) { // Draws 60 evenly spaced lines around the clock face.
    push();
    rotate((6*i));
    if(i%5==0) { // 12 evenly distributed between the 60 are made as thicker, longer Hour Lines.
      strokeWeight(0);
      stroke(0);
      push();
      translate(0,-170);
      rotate(-(6*i));
      fill(30,70,50);
      text((i/5),0,15);
      pop();
      strokeWeight(10);
      lineLength=25;
    } else { // Any that aren't the 12 Hour Lines are drawn thinner and shorter.
      strokeWeight(4);
      stroke(100,20,20);
      lineLength=20;
    }
    line(0,(215-lineLength/2),0,(215+lineLength/2));
    pop();
  }

  pop();
}

function secondsHand(clockCentreX,clockCentreY,option) {
  stroke(255,0,0);
  fill(255,0,0);
  strokeWeight(3);
  push();
  translate(clockCentreX, clockCentreY);
  circle(0,0,12)
  if(option===1) {
    rotate((frameCount/10)+180+clockSeconds);
  } else if(option===2) {
    if(frameCount%framerate===0) {
      secHandWobble = 5;
    }
    if(secHandWobble < 0.1 && secHandWobble > -0.1){
      secHandWobble = 0;
      secHandWobbleVel = 1;
    } else if(secHandWobble>0) {
      if(wobbleDir===1) {
        wobbleDir = -1;
        secHandWobbleVel = 1;
      }
      secHandWobble-=secHandWobbleVel;
      secHandWobbleVel*=secWobbleAccel;
    } else if(secHandWobble<0){
      if(wobbleDir===-1) {
        wobbleDir = 1;
        secHandWobbleVel = 1;
      }
      secHandWobble+=secHandWobbleVel;
      secHandWobbleVel*=secWobbleAccel;
    }
    rotate(180+clockSeconds+secHandWobble);
  }
  line(0,-30,0,215);
  strokeWeight(7);
  line(0,-30,0,-65);
  stroke(255,210,0);
  circle(0,0,1)
  pop();
}

function minuteHand(clockCentreX,clockCentreY) {
  stroke(0);
  strokeWeight(5);
  push();
  translate(clockCentreX, clockCentreY);
  circle(0,0,12)
  rotate((frameCount/600)+180+clockMinutes);
  line(0,-20,0,190);
  pop();
}

function hourHand(clockCentreX,clockCentreY) {
  stroke(0);
  strokeWeight(7);
  push();
  translate(clockCentreX, clockCentreY);
  circle(0,0,12)
  rotate((frameCount/7200)+180+clockHours);
  line(0,-20,0,135);
  pop();
}

function getCurrentTime() {
  currentTime = new Date();
  clockSetHours = currentTime.getHours();
  clockSetMinutes = currentTime.getMinutes();
  clockSetSeconds = currentTime.getSeconds();
  clockSeconds = map(clockSetSeconds,0,60,0,360);
  clockMinutes = map(clockSetMinutes,0,60,0,360) + (clockSeconds/60);
  clockHours = map(clockSetHours,0,12,0,360) + (clockMinutes/12);
}