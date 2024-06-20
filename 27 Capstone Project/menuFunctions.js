clickState = false;

function mousePressed() {
    clickState = true;
}

function mouseReleased() {
    clickState = false;
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
        // for(w of wallArray) {
        //     for(wall of w) {
        //         if(wall != 0 && wall != 2) {
        //             wall.display();
        //         }
        //     }
        // }
        player.display();
        winZone.display();
    }
    
    background(0,200);
    
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
        levEdit = true;
        walls = [];
        borderWalls();
    }
    levelEditorButton.display();
}

function reloadLevel() {
    winState = false;
    walls = [];
    //loadGameObjects();
    loadWalls(20);
    player = new Player(width/2, height/2);
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