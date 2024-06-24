clickState = false;

function mousePressed() {
    clickState = true;
}

function mouseReleased() {
    clickState = false;
}

function mouseWheel() {
    if(!keyIsDown(16)) {
        wallPlaceSize.x -= round(event.delta/100);
        if(wallPlaceSize.x < 1) wallPlaceSize.x = 1; 
    } else {
        wallPlaceSize.y -= round(event.delta/100);
        if(wallPlaceSize.y < 1) wallPlaceSize.y = 1;
    }
}



function completedLevel() { // Stores number of levels completed.
    let levelsCompleted = 1;
    if(localStorage.getItem('levelsCompleted') !== null) {
        levelsCompleted = int(localStorage.getItem('levelsCompleted'));
        levelsCompleted++;
    }
    localStorage.setItem('levelsCompleted',levelsCompleted);
}

function resetGameLocalStorage() { // Resets levels completed in local storage to 0.
    localStorage.setItem('levelsCompleted',0);
}

function winScreen() { // Displays win text and continue button when level is won.
    let continueButton = new CustomButton(width/2,height*0.8,100,50,"Continue?",200,100,200);

    background(0);
    textSize(140);
    stroke(255,0,255);
    fill(0,255,0);
    
    text("You Win!",width/2,height/2);
    if(continueButton.checkIfPressed()) reloadLevel();
    continueButton.display();
}

function pauseScreen() { // Displays menu screen when paused.
    background(skyBG);

    // Renders walls if isn't beginning of game.
    if(!isBeginning) {
        for(w of walls) {
            w.display();
        }
        player.display();
        winZone.display();
    }
    
    background(0,200); // Creates a partial opacity black layer to dim the game behind the menu.
    
    // Displays # of levels completed.
    text("Levels Completed: " + localStorage.getItem('levelsCompleted'),150,50);

    let pauseButton = new CustomButton(width/2,height*0.8,150,50,pausedText,200,100,200);

    if(!isBeginning) {
        let reloadButton = new CustomButton(width/2,height*0.7,150,50,"Reload Level",200,100,200);
        if(reloadButton.checkIfPressed()) {
            paused = false;
            reloadLevel();
        }
        reloadButton.display();
    }

    if(pauseButton.checkIfPressed()) paused = false;
    pauseButton.display();

    let levelEditorButton = new CustomButton(width*0.9,height*0.05,150,50,"Level Editor",100,100,200);

    if(levelEditorButton.checkIfPressed()) {
        loadWalls(textureSize,true);
        levEdit = true;
        walls = [];
        borderWalls();
    }
    levelEditorButton.display();
}

function reloadLevel() {
    winState = false;
    walls = [];
    loadWalls(textureSize);
    player = new Player(playerStart.x,playerStart.y);
}


class CustomButton { // Button class cause I didn't like p5.js built in buttons.
    constructor(x,y,w,h,text,r,g,b) {
        this.x = x, this.y = y;
        this.w = w; this.h = h;
        this.fillNormal = color(r,g,b), this.fillHovered = color(r-50,g-50,b-50);
        this.strokeNormal = color(r-50,g-50,b-50), this.strokeHovered = color(r-75,g-75,b-75);
        this.text = text;
        this.textScale = (this.w+this.h)/8;
    }

    display() { // Displays rectangle of specified size at specified location.
        strokeWeight(1);
        rect(this.x,this.y,this.w,this.h);
        textSize(this.textScale);
        fill(255);
        text(this.text,this.x,this.y+(this.h/(this.textScale)*2.5));
    }

    checkIfPressed() { // Checks if button is pressed, also changes fill colour when hovered.
        if(mouseX < this.x + this.w/2 && mouseX > this.x - this.w/2 && mouseY < this.y + this.h/2 && mouseY > this.y - this.h/2) {
            fill(this.fillHovered), stroke(this.strokeHovered);
            if(clickState && mouseButton === LEFT) {
                clickState = false;
                return true;
            }
        } else {
            fill(this.fillNormal), stroke(this.strokeHovered);
            return false; 
        }
    }
}

function levelEditor() {
    background(skyBG);
    buildGrid(textureSize); // Draws grid where walls can be placed.
  
    let menuButton = new CustomButton(width*0.96,height*0.02,50,25,"Menu",215,50,0);
    let row = round((mouseY+textureSize/2)/textureSize), col = round((mouseX+textureSize/2)/textureSize);
    if(menuButton.checkIfPressed()) {
      paused = true;
      levEdit = false;
      isBeginning = false;
      pausedText = "Start Game?";
      player.moveTo(playerStart.x,playerStart.y);
  
    } else if(clickState && mouseButton === LEFT) {
      // Places wall on the grid square the mouse is hovering on.
      wallArray[row][col] = createVector(wallPlaceSize.x,wallPlaceSize.y);
      // walls.push(new Wall(col*textureSize-(textureSize/2),row*textureSize-(textureSize/2),1,1,true,0,true,textureSize));
      walls = [];
      loadWalls(textureSize,false);
      clickState = false;
    } else if(clickState && mouseButton === CENTER) {
        if(!keyIsDown(16)) {
            // Places win zone on grid square mouse is hovering on.
            wallArray[winPos.x][winPos.y] = 0;
            wallArray[row][col] = 2;
            walls = [];
            loadWalls(textureSize,false);
            clickState = false;
            //winZone = new WinZone(col*textureSize-(textureSize/2),row*textureSize-(textureSize/2),60,60);
        } else {
            wallArray[round(playerStart.x/textureSize)][round(playerStart.y/textureSize)] = 0;
            playerStart = createVector(col*textureSize,row*textureSize);
            wallArray[row][col] = 3;
            loadWalls(textureSize,false);
            clickState = false;
        }
    }
    rect(playerStart.x-(textureSize/2),playerStart.y-(textureSize/2),textureSize)
    menuButton.display();
  
  
    // Displays walls so you know where they've been placed.
    for(w of walls) {
      w.display();
    }
  
    winZone.display();

    fill(0,255,0,100);
    rect(col*textureSize-(textureSize/2),row*textureSize-(textureSize/2),wallPlaceSize.x*textureSize,wallPlaceSize.y*textureSize);
  }
  
  function buildGrid(textureSize) {
    stroke(255,0,0,100);
    rectMode(CORNERS);
    noFill();
    for(let i = 0; i < width; i += textureSize) {
      for(let j = 0; j < height; j += textureSize) {
        // if(mouseX > i && mouseX <= i+textureSize && mouseY >= j && mouseY < j+textureSize) {
        //   // Fills square green if you're hovering over it.
        //   fill(0,255,0);
        // } else {noFill();}
        rect(i,j,i+textureSize,j+textureSize);
      }
    }
    rectMode(CENTER);
  }