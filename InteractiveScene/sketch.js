function setup() {
  createCanvas(800, 500);
  noStroke();
  let mPosLastLClick;
  let mPosLastMClick;
}

mPosLastLClick = 800/9+10;
mPosLastMClick = 800/9+10;

function inMoonBounds(){
  if(mouseX>=mPosLastMClick-60&&mouseX<=mPosLastMClick+50&&
     mouseY>=height/9-30&&mouseY<=height/9+30){
    return(true);
  } else {
    return(false);
  }
}

function lastClickedPos(){
  if(mouseIsPressed&&mouseButton===LEFT&&inMoonBounds()===true) { //Grabs mouseX position while Left Click is held.
    mPosLastLClick = mouseX;
  }
  if(mouseIsPressed&&mouseButton===CENTER&&inMoonBounds()===true) {
    mPosLastMClick = mouseX;
    mPosLastLClick -= (mPosLastLClick-mPosLastMClick);
  }
}

function grass(light) { //Fills in bottom section of the screen with grass, dimly lit by the moon.
  light=light/2
  fill(30+light,100+light,50);
  rect(0,height/1.55,width,height);
  noFill();
}

function mountains(light) {
  let fgLight=(light/2)
  let rotationOffset = 5;
  fill(light+19-rotationOffset, light+14-rotationOffset, light+27-rotationOffset);
  triangle(-100, height/1.55, width/3, height/1.55, width/6.5, height/6);
  fill(light+15-(rotationOffset/2), light+10-(rotationOffset/2), light+25-(rotationOffset/2));
  triangle(width/7, height/1.55, width/1.5, height/1.55, width/3, height/9);
  fill(light+12+(rotationOffset/2),light+9+(rotationOffset/2),light+23+(rotationOffset/2));
  triangle(width/3, height/1.55, width/1.15, height/1.55, width/2, height/8);
  fill(light+10+rotationOffset,light+7+rotationOffset,light+19+rotationOffset);
  triangle(width/1.7, height/1.55, width*1.2, height/1.55, width/1.2, height/7);
  
  fill(45+fgLight-rotationOffset,50+fgLight-rotationOffset,45+fgLight-rotationOffset);
  triangle(-50, height/1.55, width/4, height/1.55, width/6, height/3.3);
  fill(43+fgLight-(rotationOffset/2),47+fgLight-(rotationOffset/2),43+fgLight-(rotationOffset/2));
  triangle(width/6, height/1.55, width/2, height/1.55, width/2.5, height/3);
  fill(41+fgLight+(rotationOffset/2),45+fgLight+(rotationOffset/2),41+fgLight+(rotationOffset/2));
  triangle(width/3, height/1.55, width/1.5, height/1.55, width/1.8, height/4.25);
  fill(39+fgLight+rotationOffset,43+fgLight+rotationOffset,39+fgLight+rotationOffset);
  triangle(width/2, height/1.55, width*1.25, height/1.55, width/1.2, height/3);
}

function moon(mPosLC,mPosMC) {
  let light;
  let currentLight;
  let moonCurrentPos=mPosMC+(mPosLC-mPosMC);
  let moonLightPos;
  fill(175,175,125);
  circle(mPosMC-10, height/9, 50);
   //Checks if mouse is clicked and on the moon
  if(mPosLC>width/9) { // if/elseif for determining light level based on moon's position
    currentLight=(mPosLC/10)+3;
  } else if(mPosLC<width/9) {
    currentLight=((width/9-mPosLC)/6)+10;
  }
  
  light=currentLight;
  
  fill(30,25,100);
  circle((moonCurrentPos), height/9, 45);
  return((light-7));
  
}

function draw() {
  background(30,25,100); //Nice dark blue night sky.
  lastClickedPos();
  let moonLight = moon(mPosLastLClick,mPosLastMClick); //draws moon and assigns output to variable.
  grass(moonLight);     //draws grass with the R and G values increasing with moonLight.
  mountains(moonLight); //draws mountains with the RGB values increasing with moonLight.
}

