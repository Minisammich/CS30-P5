// Generative Art - HSB and Custom Palettes
// Jeffrey Hamilton
// 26/Mar/2024

let rectWidth = 50, rectHeight = 10;

let colours = ["#E8DDCB", "#CDB380", "#036564", "#033649", "#031634"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  noStroke();
  drawRGB(width*0.2);
  drawHSB(width*0.5);
  drawCustom(width*0.8);
}

function drawCustom(x) {
  colorMode(RGB);
  let index = 0;
  for(let y = 0; y < height; y+=rectHeight) {
    fill(colours[int(random(colours.length))]);
    rect(x,y,rectWidth,rectHeight);
    index++;
  }
}

function drawHSB(x) {
  // Draw a stack of Rectangles at x = x, cycling HSB values.
  colorMode(HSB);
  for(let y = 0; y < height; y+=rectHeight) {
    let hue = map(y,0,height,0,360);
    fill(hue,100,100);
    rect(x,y,rectWidth,rectHeight);
  }
}

function drawRGB(x) {
  // Draw a stack of Rectangles at x = x, using R,G,B random.
  colorMode(RGB);
  for(let y = 0; y < height; y+=rectHeight) {
    fill(random(255),random(255),random(255));
    rect(x,y,rectWidth,rectHeight);
  }
}