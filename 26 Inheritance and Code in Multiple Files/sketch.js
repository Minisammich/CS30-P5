// Inheritance and Code in Multiple Files
// Jeffrey Hamilton
// 09/May/2024

let objects = [];

function setup() {
  createCanvas(windowWidth,windowHeight);
  for(let i = 0; i < 100; i++) {
    objects.push(new AnimatedObject(random(width),random(height)));
    objects.push(new CircleObj(random(width),random(height)));
    objects.push(new LineObj());
  }
}

function draw() {
  background(220);
  for(let i in objects) {
    let obj = objects[i];
    obj.move();
    obj.display();
  }
}
