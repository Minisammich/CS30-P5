// Repositioning Rectangles
// Jeffrey Hamilton
// 06/Mar/24
//
// Extra for Experts:
// - Creating geometry (dash) that can be picked up and moved around. 

let rHeight, rWidth, rX, rY, offX, offY, pickedUp = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  rHeight = 200; rWidth = 400; rX = (width/2); rY = (height/2);
}

function collision(padding) {
  if(mouseX>=(rX-(rWidth/2)-padding)&&mouseX<=(rX+(rWidth/2)+padding)&&mouseY>=(rY-(rHeight/2)-padding)&&mouseY<=(rY+(rHeight/2)+padding)) {
    fill(100,255,100);
    return(true);
  } else { fill(255); return(false); }
}

function movableRectangle() {
  if(pickedUp){
    rX = mouseX+offX; rY = mouseY+offY;
  }

  rect(rX, rY, rWidth, rHeight);
}

function mousePressed() {
  offX = rX-mouseX; offY = rY-mouseY;
  if(collision(0)){
    pickedUp = true;
  }
}

function mouseReleased() {
  if(collision(0)){
    pickedUp = false;
  }
}


function draw() {
  background(220);
  if(!pickedUp){
    collision(0);
  }
  movableRectangle();
}
