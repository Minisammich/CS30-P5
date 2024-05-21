// Capstone Platformer Testing
// Jeffrey Hamilton
// 18/May/2024

let player;
let walls = [];

function preload() {

}


function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);

  for(let i = 0; i < 10; i++) {
    walls.push(new Wall(random(0,width),random(0,height),random(0,500),random(0,500)));
  }

  player = new Player(width/2,height/2);
}

function draw() {
  background(220);

  player.move();
  for(w of walls) {
    w.collision();
    w.display();
  }
  player.display();
}