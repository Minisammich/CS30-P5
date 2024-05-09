class LineObj extends AnimatedObject {
    constructor() {
      super(random(width), random(height));
    }
  
    move() { // Overriding, but building on top of parent move function.
      super.move();
      this.x -= 5;
    }
  
    display() {
      if(mouseIsPressed) strokeWeight(10);
      else strokeWeight(2);
      line(this.x,this.y,this.x+15,this.y);
    }
  }