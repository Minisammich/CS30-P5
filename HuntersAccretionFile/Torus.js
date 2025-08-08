const torusPosition = (theta, phi, r1, r2) => {
  // Calculate the x, y, z coordinates of a point on the torus based on the given parameters
  const x = (r2 + r1 * (cos(theta + t))) * cos(phi + t);
  const y = (r2 + r1 * (cos(theta + t))) * sin(phi + t);
  const z = (1 - flatenPercent) * r1 * sin(theta + t);
  return [x, y, z]; // Return the coordinates as an array
};

function renderTorus() {
  noStroke(); // Disable stroke for the torus rendering
  fill(0); // Set the fill color to black
  const thetas = lspace(thetaRes, TAU); // Generate an array of theta values evenly spaced around the torus
  let prev = thetas.shift(); // Get the first theta value and remove it from the array
  for (let theta of thetas) {
    beginShape(TRIANGLE_STRIP); // Start a new triangle strip shape
    for (let phi of lspace(phiRes, TAU)) {
      vertex(...torusPosition(prev, phi, r1, r2)); // Add a vertex to the shape using the previous theta value
      vertex(...torusPosition(theta, phi, r1, r2)); // Add a vertex to the shape using the current theta value
    }
    prev = theta; // Update the previous theta value for the next iteration
    endShape(CLOSE); // End the current shape and close the triangle strip
  }
}
