// Array to store particles
let particles;

// Variables for torus and particle properties
let r1, r2, particleLength, sphereRes, thetaRes, phiRes;

function setupWorld({
  zoom,
  innerRadius,
  tubeRadius,
  flatenPercent,
  blackHoleRes,
  nbBelt,
  beltLength,
  starBeltXRes,
  starBeltYRes
}) {
  // Generate particles for the belt
  particles = generate(nbBelt, () => getParticle());

  // Set torus and particle properties
  r1 = innerRadius;
  r2 = tubeRadius;
  particleLength = beltLength;
  sphereRes = blackHoleRes;
  thetaRes = starBeltYRes;
  phiRes = starBeltXRes;
  // Set camera position based on zoom
  camera(0, 0, r2 * (1 + 2 * (1 - zoom)));
}

function renderWorld() {
  // Clear the canvas
  clear();
  // Draw the black hole shape
  blackHole();
  // Rotate the scene
  rotateX(HALF_PI / 1.35);
  // Render the torus shape
  renderTorus();
  // Render particles
  particles.forEach((p) => {
    drawParticle(p);
    drawParticleLine(p, particleLength);
  });
  // Increment time variable
  t += 0.01;
}
