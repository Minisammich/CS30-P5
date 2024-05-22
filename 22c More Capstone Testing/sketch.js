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
  textAlign(CENTER);

  walls.push(new Wall(-25,height/2,50,height,true));
  walls.push(new Wall(width+25,height/2,50,height,true));

  walls.push(new Wall(width/2,-25,width,50,true));
  walls.push(new Wall(width/2,height+25,width,50,true));

  for(let i = 0; i < 10; i++) {
    walls.push(new Wall(random(0,width),random(0,height),random(0,500),random(0,500),true));
  }

  player = new Player(width/2,height/2);
}

function draw() {
  background(220);
  fill(255);

  player.move();

  for(w of walls) {
    w.collision();
    w.display();
  }

  player.display();
}