// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let world;

function createParticle(x,y) {
  let p = new c2.Particle(x,y);
  p.radius = random((width+height)/50,(width+height)/25);
  p.mass = p.radius;
  p.color = color(random(200),random(200),random(255));
  p.addVelocity = (10,10);
  world.addParticle(p);
  world.friction = 0.95;
}

function createLargeParticle(x,y) {
  let p = new c2.Particle(x,y);
  p.radius = 450;
  p.mass = p.radius;
  p.color = color(random(200),random(200),random(255));
  p.addVelocity = (10,10);
  world.addParticle(p);
  world.friction = 0.95;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  world = new c2.World(new c2.Rect(0, 0, width, height));
  let gravitation = new c2.Gravitation(1);
  gravitation.range(10);
  world.addInteractionForce(gravitation);
  createLargeParticle(width/2,height/2);
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
    let p = world.particles[i]
    fill(p.color);
    circle(p.position.x,p.position.y,p.radius);
    p.update(0.95);
  }
}
