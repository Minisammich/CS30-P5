// CS30 - Final Programming Challenge
// Jeffrey Hamilton
// 21/June/2024
//
// A player controlled fox with smooth walking animations, a "Pepsi mode", and numerous
// "computer foxes" that move on their own and change colour when near the player.



//// Key Bindings. ////

// Movement.
const W = 87;
const A = 65;
const S = 83;
const D = 68;

// Other Functions.
const P = 80;
const R = 82;

///////////////////////


// Image Arrays.
let staticImages = [];      //array to hold 1 image for each direction -> should use this to start  
let animationImagesLeft = [];   //array to hold all 8 images in left direction
let animationImagesRight = [];   //array to hold all 8 images in right direction
let animationImagesUp = [];   //array to hold all 8 images in up direction
let animationImagesDown = [];   //array to hold all 8 images in down direction


// Fox Array.
let foxes = [];


function preload(){
  loadStatic();     //defined at bottom
  loadAnimation();  //also defined at bottom

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);

  foxes.push(new Fox(width/2,height/2,true)); // Loads the one player fox into position 0 in the fox array.

  for(let i = 0; i < 10; i++) { // Loads 10 computer foxes into the array at random positions.
    foxes.push(new Fox(random(width),random(height),false));
  }
}

function draw() {
  background(220);

  for(f of foxes) {
    f.move();
    f.display();
  }

}

function mousePressed() {
  if(mouseButton === LEFT) { // Scale fox when mouse clicked.
    if(mouseY > height/2) { // Mouse on top half of screen.
      foxes[0].scale *= 0.9; // 90% size.
    } else { // Mouse on bottom half of screen.
      foxes[0].scale *= 1.1; // 110% size.
    }
  }
}

function keyPressed() {
  if(keyCode === P) { // Toggles "Pepsi Mode" when P is pressed.
    foxes[0].togglePepsi();
  }
  if(keyCode === R) { // Resets fox to initial state when R is pressed.
    foxes[0].resetToDefault();
  }
}


function loadStatic(){
  staticImages.push(loadImage("/assets/left1.png"));   //0 - left
  staticImages.push(loadImage("/assets/right1.png"));   //1 - right
  staticImages.push(loadImage("/assets/up1.png"));   //2 - up
  staticImages.push(loadImage("/assets/down1.png"));   //3 - down
}

function loadAnimation(){
  for(let i = 1; i <= 8; i++){  //LEFT
    animationImagesLeft.push(loadImage("/assets/left" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //RIGHT
    animationImagesRight.push(loadImage("/assets/right" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //UP
    animationImagesUp.push(loadImage("/assets/up" + i + ".png"));
  }

  for(let i = 1; i <= 8; i++){  //DOWN
    animationImagesDown.push(loadImage("/assets/down" + i + ".png"));
  }
}

class Fox {
  constructor(x,y,isPlayer) {
    this.pos = createVector(x,y); // Vector for foxes position.
    this.scale = 1; // Scale factor for fox.
    this.moveSpeed = 6; // Pixels per frame at which the fox moves.
    this.direction = 0;  // 0 - Up, 1 - Down, 2 - Left, 3 - Right.
    this.moving = false; // Whether fox is moving or not to determine whether to animate.

    this.isPlayer = isPlayer; // Whether fox is a player (true) or computer (false).

    this.currSprite = 0;  // Current sprite state in the animation (0-7).
    
    this.timer = round(random(1e6)); // Random timer instead of frameCount so foxes don't move in sync.

    this.randomState = 0; // Random state for movement.
    this.pepsiMode = false; // Makes player move uncontrollably, flashing colours and changing size.
  }

  display() {
    if(this.currSprite >= 8) this.currSprite = 0; // If current sprite is >= 8, it resets sprite to 0.

    if(this.pepsiMode) {
      if(frameCount % 2 === 0) { // Every other frame, randomize tint and scale.
        tint(random(255),random(255),random(255));
        this.scale = random(1,4);
      }
    } else {
      noTint(); // Otherwise, no tint.
    }

    if(!this.isPlayer) { // If fox is a computer, tint blue when within 200px of player fox.
      if(dist(this.pos.x,this.pos.y,foxes[0].pos.x,foxes[0].pos.y) < 200) {
        tint(0,0,255);
      }
    }


    push();
    translate(this.pos.x,this.pos.y); // Moves grid to foxes position.
    scale(this.scale); // Scales grid to foxes scale.

    switch(this.direction) { // Animation Array Selector.

      case 0: // Direction = 0 --- Up.
        image(animationImagesUp[this.currSprite],0,0);
        break;

      case 1: // Direction = 1 --- Down.
        image(animationImagesDown[this.currSprite],0,0);
        break;

      case 2: // Direction = 2 --- Left.
        image(animationImagesLeft[this.currSprite],0,0);
        break;
      
      case 3: // Direction = 3 --- Right.
        image(animationImagesRight[this.currSprite],0,0);
        break;

    }
    pop();

    if(frameCount % 3 === 0 && this.moving) { // Increments sprite state every third frame to animate.
      this.currSprite++;
    }


  }

  move() {
    this.timer++;

    // Keeps fox on screen.
    if(this.pos.x < 0) this.pos.x = width-1;
    if(this.pos.x > width) this.pos.x = 1;
    if(this.pos.y < 0) this.pos.y = height-1;
    if(this.pos.y > height) this.pos.y = 1;



    this.moving = false; // Resets "moving" to false to be changed later if key is pressed.

    if(this.isPlayer && !this.pepsiMode) { // If is player and not in "Pepsi Mode," allow user control.
      if(keyIsDown(W)) { // W moves Up.
        this.pos.y -= this.moveSpeed;
        this.direction = 0;
        this.moving = true;
      }
      if(keyIsDown(S)) { // S moves Down.
        this.pos.y += this.moveSpeed;
        this.direction = 1;
        this.moving = true;
      }
      if(keyIsDown(A)) { // A moves Left.
        this.pos.x -= this.moveSpeed;
        this.moving = true;
        if(!keyIsDown(W) && !keyIsDown(S)) this.direction = 2; // Keeps sprite direction up or down.
      }
      if(keyIsDown(D)) { // D moves Right.
        this.pos.x += this.moveSpeed;
        this.moving = true;
        if(!keyIsDown(W) && !keyIsDown(S)) this.direction = 3; // Keeps sprite direction up or down.
      }
    } else { // If is NOT player or "Pepsi Mode" is active.
      if(this.timer % 30 === 0) this.randomState = round(random(0,4)); // Randomizes direction every 30 frames.
      
      switch(this.randomState) {
        case 0: // Not moving.
          this.moving = false;
          break;
        
        case 1: // Up.
          this.direction = 0;
          this.moving = true;
          this.pos.y -= this.moveSpeed;
          break;

        case 2: // Down.
          this.direction = 1;
          this.moving = true;
          this.pos.y += this.moveSpeed;
          break;

        case 3: // Left.
          this.direction = 2;
          this.moving = true;
          this.pos.x -= this.moveSpeed;
          break;

        case 4: // Right.
          this.direction = 3;
          this.moving = true;
          this.pos.x += this.moveSpeed;
          break;

      }
    }
  }

  togglePepsi() { // If pepsiMode is true, make false. If false, make true.
    if(this.pepsiMode) {
      this.pepsiMode = false;
    } else {
      this.pepsiMode = true;  
    }
  }

  resetToDefault() { // Resets scale, direction, pos, and pepsiMode to default state.
    this.scale = 1;
    this.direction = 0;
    this.pos = createVector(width/2,height/2);
    this.pepsiMode = false;
  }
}