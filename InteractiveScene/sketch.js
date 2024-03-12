// Interactive Scene
// Jeffrey Hamilton
//
// Description:
// - Draws a landscape scene with an interactive moon and stars, and static grass and mountains.
// - The moon casts light upon the mountains and grass relative to its position in the sky and its cycle.
//
// --------------
//    CONTROLS
// --------------
// UP_ARROW:     Change State Up
// DOWN_ARROW:   Change State Down
// Shift:        Randomize Stars
// MIDDLE Click: Move Sky (NOT when stateVar=0)
// LEFT Click:   Change Moon Cycle (NOT when stateVar=0)
// CONTROL:      Reset time


let canvasX;
let canvasY;

function setup() {
  document.addEventListener("contextmenu", event => event.preventDefault())
  canvasX = windowWidth;
  canvasY = windowHeight;
  starCount = ((canvasX+canvasY)/8) //Smaller windows get less stars, vice versa.
  createCanvas(canvasX, canvasY);
  noStroke();
  calcStars();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasX = windowWidth;
  canvasY = windowHeight;
  starCount = ((canvasX+canvasY)/8) //Smaller windows get less stars, vice versa.
  calcState=false;
  calcStars();
}

let mPosLastLClick = 800/8;
let mPosLastMClick = 800/8;
let starCount;
let moonCoverOffset = -15;
let rotationOffset;
let stateVar = 0;
let starPosX = [];
let starPosY = [];
let starSize = [];
let starOffset = 0, starMouseOffset = 0;
let time=0;
let calcState = false;


function keyPressed() {
  calcStars();
  if(keyCode===CONTROL){
    time=0;
  }
}


function inMoonBounds(){ //checks if cursor is within the bounds of the moon
  let moonScale = ((canvasX+canvasY)/2)/10; //sets scale of the moon based on canvas sign
  if(mouseX>=mPosLastMClick-(moonScale+10)&&mouseX<=mPosLastMClick+(moonScale+10)&&
     mouseY>=canvasY/4-(mPosLastMClick/5)-(moonScale-10)&&mouseY<=canvasY/4-(mPosLastMClick/5)+(moonScale-10)){
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
  rect(0,canvasY/1.55,canvasX,canvasY);
  noFill();
}

function mountains(light) {
  let fgLight=(light/2) //makes FG affected less than BG mountains by light

  //Background Mountains
  fill(light+19-rotationOffset, light+14-rotationOffset, light+27-rotationOffset);
  triangle(-100, canvasY/1.55, canvasX/3, canvasY/1.55, canvasX/6.5, canvasY/6);
  fill(light+15-(rotationOffset/2), light+10-(rotationOffset/2), light+25-(rotationOffset/2));
  triangle(canvasX/7, canvasY/1.55, canvasX/1.5, canvasY/1.55, canvasX/3, canvasY/9);
  fill(light+12+(rotationOffset/2),light+9+(rotationOffset/2),light+23+(rotationOffset/2));
  triangle(canvasX/3, canvasY/1.55, canvasX/1.15, canvasY/1.55, canvasX/2, canvasY/8);
  fill(light+10+rotationOffset,light+7+rotationOffset,light+19+rotationOffset);
  triangle(canvasX/1.7, canvasY/1.55, canvasX*1.2, canvasY/1.55, canvasX/1.2, canvasY/7);
  
  //Foreground Mountains
  fill(45+fgLight-rotationOffset,50+fgLight-rotationOffset,45+fgLight-rotationOffset);
  triangle(-50, canvasY/1.55, canvasX/4, canvasY/1.55, canvasX/6, canvasY/3.3);
  fill(43+fgLight-(rotationOffset/2),47+fgLight-(rotationOffset/2),43+fgLight-(rotationOffset/2));
  triangle(canvasX/6, canvasY/1.55, canvasX/2, canvasY/1.55, canvasX/2.5, canvasY/3);
  fill(41+fgLight+(rotationOffset/2),45+fgLight+(rotationOffset/2),41+fgLight+(rotationOffset/2));
  triangle(canvasX/3, canvasY/1.55, canvasX/1.5, canvasY/1.55, canvasX/1.8, canvasY/4.25);
  fill(39+fgLight+rotationOffset,43+fgLight+rotationOffset,39+fgLight+rotationOffset);
  triangle(canvasX/2, canvasY/1.55, canvasX*1.25, canvasY/1.55, canvasX/1.2, canvasY/3);
}

function moon(){
  let moonScale = ((canvasX+canvasY)/2)/10; //sets scale of the moon based on canvas sign
  let light;
  let moonPosX,moonPosY;
  let moonCoverPosX,moonCoverPosY;

  if(stateVar===1||stateVar===2){
    moonPosX = mPosLastMClick;
    moonPosY = canvasY/4-(mPosLastMClick/5)
    moonCoverPosX = mPosLastMClick-moonCoverOffset;
    moonCoverPosY = (canvasY/4-(mPosLastMClick/5))+(moonCoverOffset/5); //sets position of the shadow on the moon
    if(moonCoverOffset>=0){ //Sets light value based on the offset of the shadow relative to the moon
      light = ((moonCoverOffset/3)/(moonScale/50));
    } else {
      light = -((moonCoverOffset/3)/(moonScale/50));
    }

  } else {
    moonPosX = (canvasX-time)+(moonScale/2);
    moonPosY = (canvasY/4-(canvasY-time)/5);
    moonCoverPosX = ((canvasX-time)+20)+(moonScale/2);
    moonCoverPosY = (canvasY/4-(canvasY-time)/5)-(10); //sets position of the shadow on the moon
    light=0;
  }
  
  fill(175,175,125); //fills in the moons colour
  circle(moonPosX,moonPosY, moonScale);

  fill(30,25,100); //fills in the shadow on the moon as BG colour
  circle(moonCoverPosX, moonCoverPosY, moonScale-3);
  if(moonPosX>0){
    rotationOffset = (moonPosX/125); //sets offset of the light based on position of the moon
  } else if(moonPosX<-3*canvasX){
    rotationOffset = -(moonPosX/320);
  } else {
    rotationOffset=0;
  }
  return(light);
}

function calcStars(){
  if(keyCode===UP_ARROW){
    if(stateVar<2){
      stateVar++;
    }
  } else if(keyCode===DOWN_ARROW){
    if(stateVar>0){
      stateVar--;
    }
  }
  if(keyCode===SHIFT){
    calcState = false;
  }

  if(calcState===false){
    starPosX=[];
    starPosY=[];
    starSize=[];
    for(let i=0; i<starCount; i++){
      starPosX.push(random(0,canvasX));
      starPosY.push(random(0,canvasY/1.55));
      starSize.push(random(1,3.5));
  }
  calcState = true;
  }
}

function drawStars(){
  fill(255,235,220);
  if(stateVar===0||stateVar===1){
    time += 1;
    for(let i=0; i<starCount; i++){

      if(stateVar===0){
        if(time>(canvasX*2)){
          time=0;
        }
        let starX = starPosX[i]-time, starY = starPosY[i]+time/5, sizeOfStar = starSize[i];
        while(starX<0){starX+=canvasX}
        while(starY>canvasY/1.55){starY-=canvasY/1.55}
        circle(starX,starY,sizeOfStar);

      } else {
        if(mouseIsPressed&&mouseButton===CENTER&&inMoonBounds()){
          starMouseOffset = (starOffset-mouseX);
        }

        let starX = starPosX[i]-starMouseOffset, starY = starPosY[i]+(starMouseOffset/5), sizeOfStar = starSize[i];
        if(starX<0){starX+=canvasX}
        if(starX>canvasX){starX-=canvasX}
        if(starY<0){starY+=canvasY}
        if(starY>canvasY/1.55){starY-=canvasY}
        circle(starX,starY,sizeOfStar);
      }
    }
  }
}

function draw() {
  background(30,25,100); //Nice dark blue night sky.
  lastClickedPos();
  drawStars();
  let moonLight = moon(); //draws moon and assigns output to variable.
  grass(moonLight);     //draws grass with the R and G values increasing with moonLight.
  mountains(moonLight); //draws mountains with the RGB values increasing with moonLight.
  fill(255);
  textFont('Courier New');
  textSize((canvasX+canvasY)/64);
  text('Jeffrey Hamilton',canvasX/64,canvasY/1.02);
}