let button;


function completedLevel() {
    let levelsCompleted = 1;
    if(localStorage.getItem('levelsCompleted') !== null) {
        levelsCompleted = int(localStorage.getItem('levelsCompleted'));
        levelsCompleted++;
    }
    localStorage.setItem('levelsCompleted',levelsCompleted);
}

function resetGameLocalStorage() {
    localStorage.removeItem('levelsCompleted');
    localStorage.setItem('levelsCompleted',0);
}

function winScreen() {
    background(0);
    textSize(140);
    stroke(255,0,255);
    fill(0,255,0);
    button = createButton('Continue');
    button.position(width/2,height*0.8);
    text("You Win!",width/2,height/2);
 
    button.mousePressed(reloadLevel);
}

function reloadLevel() {
    winState = false;
    walls = [];
    button = 0;
    loadGameObjects();
}