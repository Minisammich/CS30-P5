// Gradient Background + Nested Loops
// Mr. Scott
// Feb 29th, 2024
// Creating a gradient + drawing with nested loops

let rectHeight = 10;
let spacing = 25;
let circleSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  textAlign(CENTER,CENTER);
}

function draw() {
  gradientBackground();
  nestedLoops();
}

function nestedLoops(){
  // using a loop within a loop, generate a grid arrangement
  // for some circles
  for(let x = 0; x < width; x+=spacing){ //0 20 40 60 80
    for(let y = 0; y< height; y+=spacing){ //0 20 40 60 80
      let d = distanceToMouse(x,y,mouseX,mouseY);
      let currentSize = circleSize
      if(d<100){
        fill(0,255,0);
      } else if(d<200){
        fill(230,250,50);
      }else {
        fill(255,20,70);
      }
      circle(x, y, currentSize);
      if(d>=200){
        fill(255);
      } else {
        fill(0);
      }
      text(d,x,y);
      
    }
  }
}

function gradientBackground(){
   // use a single loop to draw several rectangles
   // then color them into a gradient
   let y = 0;
   while(y < height){
      let c = color(mouseX,map(y,0,height,255,0),map(y,0,height,0,255));
      fill(c); 
      rect(0,y,width,rectHeight);
      y += rectHeight;
   }

}

function distanceToMouse(x1,y1,x2,y2){
  //given two points, return straight line distance between.
  let a = abs(x1-x2);
  let b = abs(y1-y2);
  let c = round(sqrt(sq(a) + sq(b)));

  return(c);
}