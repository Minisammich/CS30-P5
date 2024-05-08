// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let world;

let quadTree;
let collision;

function createParticle(x,y) {
  let p = new c2.Particle(x,y);
  p.radius = 0.5*random((width+height)/50,(width+height)/25);
  p.mass = p.radius;
  p.color = color(random(200),random(200),random(255));
  p.addVelocity = (10,10);
  world.addParticle(p);
}

function createLargeParticle(x,y) {
  let p = new c2.Particle(x,y);
  p.radius = 100;
  p.mass = p.radius;
  p.color = color(random(200),random(200),random(255));
  p.addVelocity = (10,10);
  world.addParticle(p);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new c2.World(new c2.Rect(0, 0, width, height));
  world.friction = 0.98;

  let gravitation = new c2.Gravitation(0.5);
  gravitation.range(10);
  world.addInteractionForce(gravitation);

  createLargeParticle(width/2,height/2);

  let quadTree = new c2.QuadTree(new c2.Rect(0,0,width,height));
  let collision = new c2.Collision(quadTree);
  collision.iterations = 3;
  collision.strength = 1;
  world.addInteractionForce(collision);
}

function mousePressed() {
  if(mouseButton === LEFT) {
    createParticle(mouseX,mouseY);
  }
}

function draw() {
  background(220);
  world.update();

  for(let i=0; i<world.particles.length; i++) {
    let p = world.particles[i];
    fill(p.color);
    circle(p.position.x,p.position.y,2*p.radius);
    p.update(1);
  }
}
