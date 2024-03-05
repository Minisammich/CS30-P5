let canvasX;
let canvasY;

function setup() {
  canvasX = windowWidth;
  canvasY = windowHeight;
  createCanvas(canvasX, canvasY);
  noStroke();
}

let mPosLastLClick = 800/8;
let mPosLastMClick = 800/8;
let moonCoverOffset = -15;
let rotationOffset;

function inMoonBounds(){ //checks if cursor is within the bounds of the moon
  let moonScale = ((canvasX+canvasY)/2)/10; //sets scale of the moon based on canvas sign
  if(mouseX>=mPosLastMClick-(moonScale+10)&&mouseX<=mPosLastMClick+(moonScale+10)&&
     mouseY>=height/9-(moonScale-10)&&mouseY<=height/9+(moonScale-10)){
    return(true);
  } else {
    return(false);
  }
}

function lastClickedPos(){

  //Grabs and stores mouseX position while Left Click is held.
  if(mouseIsPressed&&mouseButton===LEFT&&inMoonBounds()===true) {
    mPosLastLClick = mouseX;
    moonCoverOffset = mPosLastMClick-mPosLastLClick;
  }

  //Grabs and stores mouseX position while Middle Click is held.
  if(mouseIsPressed&&mouseButton===CENTER&&inMoonBounds()===true) {
    mPosLastMClick = mouseX;
  }

}

function grass(light) { //Fills in bottom section of the screen with grass, dimly lit by the moon.
  light=light/2
  fill(30+light,100+light,50);
  rect(0,height/1.55,width,height);
  noFill();
}

function mountains(light) {
  let fgLight=(light/2) //makes FG affected less than BG mountains by light

  //Background Mountains
  fill(light+19-rotationOffset, light+14-rotationOffset, light+27-rotationOffset);
  triangle(-100, height/1.55, width/3, height/1.55, width/6.5, height/6);
  fill(light+15-(rotationOffset/2), light+10-(rotationOffset/2), light+25-(rotationOffset/2));
  triangle(width/7, height/1.55, width/1.5, height/1.55, width/3, height/9);
  fill(light+12+(rotationOffset/2),light+9+(rotationOffset/2),light+23+(rotationOffset/2));
  triangle(width/3, height/1.55, width/1.15, height/1.55, width/2, height/8);
  fill(light+10+rotationOffset,light+7+rotationOffset,light+19+rotationOffset);
  triangle(width/1.7, height/1.55, width*1.2, height/1.55, width/1.2, height/7);
  
  //Foreground Mountains
  fill(45+fgLight-rotationOffset,50+fgLight-rotationOffset,45+fgLight-rotationOffset);
  triangle(-50, height/1.55, width/4, height/1.55, width/6, height/3.3);
  fill(43+fgLight-(rotationOffset/2),47+fgLight-(rotationOffset/2),43+fgLight-(rotationOffset/2));
  triangle(width/6, height/1.55, width/2, height/1.55, width/2.5, height/3);
  fill(41+fgLight+(rotationOffset/2),45+fgLight+(rotationOffset/2),41+fgLight+(rotationOffset/2));
  triangle(width/3, height/1.55, width/1.5, height/1.55, width/1.8, height/4.25);
  fill(39+fgLight+rotationOffset,43+fgLight+rotationOffset,39+fgLight+rotationOffset);
  triangle(width/2, height/1.55, width*1.25, height/1.55, width/1.2, height/3);
}

function moon(){
  let moonScale = ((canvasX+canvasY)/2)/10; //sets scale of the moon based on canvas sign
  let light;
  let moonPos = mPosLastMClick;
  let moonCoverPos = mPosLastMClick-moonCoverOffset; //sets position of the shadow on the moon
  if(moonCoverOffset>=0){ //Sets light value based on the offset of the shadow relative to the moon
    light = ((moonCoverOffset/3)/(moonScale/50));
  } else {
    light = -((moonCoverOffset/3)/(moonScale/50));
  }
  
  fill(175,175,125); //fills in the moons colour
  circle(moonPos,height/9, moonScale);

  fill(30,25,100); //fills in the shadow on the moon as BG colour
  circle(moonCoverPos, height/9, moonScale-3);

  rotationOffset = (moonPos/50); //sets offset of the light based on position of the moon
  return(light);
}

function draw() {
  background(30,25,100); //Nice dark blue night sky.
  lastClickedPos();
  let moonLight = moon(); //draws moon and assigns output to variable.
  grass(moonLight);     //draws grass with the R and G values increasing with moonLight.
  mountains(moonLight); //draws mountains with the RGB values increasing with moonLight.
}

