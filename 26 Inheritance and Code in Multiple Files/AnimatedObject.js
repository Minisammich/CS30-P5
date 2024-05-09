class AnimatedObject {
    constructor(x,y) {
      this.x = x; this.y = y;
      this.size = 1;
    }
  
    move() {
      let r = this.size/2;
      this.x += random(-2,2);
      this.y += random(-2,2);
      if(this.x+r < 0) this.x = width;
      if(this.x-r > width) this.x = 0;
      if(this.y+r < 0) this.y = height;
      if(this.y-r > height) this.y = 0;
    }
  
    display() {
      strokeWeight(4);
      point(this.x,this.y);
    }
  }