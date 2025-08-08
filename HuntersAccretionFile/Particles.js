const getParticle = () => {
  return {
    theta: random() * TAU, // random value between 0 and TAU (full circle)
    phi: random() * TAU, // random value between 0 and TAU (full circle)
    length: random(), // random value between 0 and 1
    sw: 1 + random() * (maxStrokeWeight - 1) // random value between 1 and maxStrokeWeight
  };
};

const drawParticle = ({theta, phi, length, sw}) => {
  stroke(194, 162, 2); // set the stroke color for the smaller particles
  strokeWeight(sw); // set the stroke weight based on the sw parameter
  point(...torusPosition(theta, phi, r1, r2)); // draw a single point at the torus position based on the theta, phi, r1, and r2 values
};

const drawParticleLine = ({theta, phi, length, sw}, n) => {
  stroke(201, 39, 14); // set the stroke color for the larger strokes
  strokeWeight(sw); // set the stroke weight based on the sw parameter
  
  const dt = length / n; // calculate the time difference between each point on the line
  const angles = generate(n, (i) => [theta + TAU * t - dt * i, phi - TAU * t + dt * i]); // generate an array of angles based on the number of points on the line
  
  let prev = torusPosition(...(angles.shift()), r1, r2); // calculate the position of the first point on the line
  for (let angle of angles) {
    const next = torusPosition(...angle, r1, r2); // calculate the position of the next point on the line
    line(...prev, ...next); // draw a line segment between the previous and next points
    prev = next; // update the previous point to be the current next point for the next iteration
  }
};
