

let t = 0; // time variable to increase every time through draw

const flatenPercent = 0.8; // percentage to flatten the shape

const maxStrokeWeight = 5; // maximum stroke weight for rendering

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL); // create a WebGL canvas
  background(100); // set the background color
  setupWorld({
    // initialize the world with specific parameters
    zoom: 0.6, // zoom level of the world
    innerRadius: 120, // all of the radi
    tubeRadius: 240, 
    flatenPercent: 0.8, // percentage to flatten the shape
    blackHoleRes: 50, // resolution of the black hole
    nbBelt: 150, // number of belts in the shape
    beltLength: 7, // length of each belt
    starBeltXRes: 50, // X resolution of the star belt
    starBeltYRes: 30, // Y resolution of the star belt
  });
}

function draw() {
  renderWorld(); // renders the actual scene
}
