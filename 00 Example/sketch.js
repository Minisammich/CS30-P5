// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(400, 300);
}

function draw() {
  background(50, 50, 75);
  cornersAndMouse();
}

function cornersAndMouse() {
  let xPos = [width*0.05, width*0.05, width*0.95, width*0.95];
  let yPos = [height*0.05, height*0.95, height*0.05, height*0.95];

  fill(150, 0, 200);
  circle(mouseX, mouseY, 15);

  if(mouseIsPressed){
    console.log("AddThisIn")
  }

  let i=0;
  while(i < xPos.length) {
    let x = xPos[i];
    let y = yPos[i];
    circle(x,y,15);
    line(x,y,mouseX,mouseY);
    i++;
  }

}