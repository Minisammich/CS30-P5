function blackHole() {
  push(); // save the current drawing state
  
  stroke("#c4884d"); // set the stroke color
  fill("black"); // set the fill color
  
  beginShape(); // start defining a shape
  
  for (let theta of lspace(sphereRes, TAU)) 
    vertex(cos(theta) * r1, sin(theta) * r1); // add vertices to the shape based on calculated coordinates
  
  endShape(CLOSE); // end defining the shape and close it
  
  pop(); // restore the previous drawing state
}
