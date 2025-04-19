const khaleda = document.querySelector('.khaleda');
const stamina = document.querySelector('.stamina');
const speedButton = document.querySelector('.speed');
const background = document.querySelector('.background');
const hasina = document.querySelector('.hasina');
const rotate = document.querySelector('#rotate-warning');
const jump = document.querySelector('.up-controler');
const down = document.querySelector('.down-controler');


let a = 20;
let s = 6;
let drainInterval = null;
let boostInterval = null;
let jumpAnimation = true;
let downAnimation = true;
let bgPosition = 0;
let bgSpeed = 0.2; // normal speed

// Move character
function khaledaRun() {
    if (a >= 20 && a <= 80) {
        a = a + 1.5;
        khaleda.style.left = `${a}%`;
    }
}
setInterval(khaledaRun, 100);

// jump animation

jump.addEventListener("click", () =>{
    jumping();
})

function jumping (event) {
    if(jumpAnimation === true){
        hasina.classList.add("hasina-jump");
        jumpAnimation = setInterval(jumpAgain, 1000);
    }
}

function jumpAgain (){
    hasina.classList.remove("hasina-jump");
    clearInterval(jumpAnimation);
    jumpAnimation = true;
}

// down animation

down.addEventListener("click", () =>{
    downing();
})

function downing () {
    if(downAnimation === true){
        hasina.classList.add("hasina-down");
        downAnimation = setInterval(downAgain, 1000);
    }
}

function downAgain (){
    hasina.classList.remove("hasina-down");
    clearInterval(downAnimation);
    downAnimation = true;
}

// jump down keyboard

document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp") {
        jumping();
    } else if (event.key === "ArrowDown") {
        downing();
    }
});


// Animate background with smooth control
function animateBackground() {
    bgPosition -= bgSpeed; // Move the background left

    // When background reaches the end, reset its position to start
    if (bgPosition <= -100) {
        bgPosition = 0;
    }

    background.style.transform = `translateX(${bgPosition}vw)`;
    requestAnimationFrame(animateBackground); // Repeat the animation
}
animateBackground();

// Stamina drain function
function staminaFuc() {
    if (s > 0) {
        s = s - 0.3;
        stamina.style.width = `${s}vw`;
    } else {
        clearInterval(drainInterval);
        drainInterval = null;
        bgSpeed = 0.2; // revert to normal speed
        startBoost();
    }
}

// Stamina recover function
function boost() {
    if (s < 6) {
        s = s + 0.2;
        stamina.style.width = `${s}vw`;
    } else {
        clearInterval(boostInterval);
        boostInterval = null;
    }
}

function startBoost() {
    if (boostInterval == null) {
        boostInterval = setInterval(boost, 100);
    }
}
// Start sprint
function startSpeed(event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        if (drainInterval == null && s > 0) {
            clearInterval(boostInterval);
            boostInterval = null;

            drainInterval = setInterval(staminaFuc, 100);
            bgSpeed = 1; // fast speed
        }
        hasina.style.left = `5%`;
    }
}

// Stop sprint
function stopSpeed(event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        clearInterval(drainInterval);
        drainInterval = null;
        bgSpeed = 0.2; // normal speed
        hasina.style.left = `2%`;
        startBoost();
    }
}

// Button events (mouse + touch)
// Start sprint
function startSpeed(event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        if (drainInterval == null && s > 0) {
            clearInterval(boostInterval);
            boostInterval = null;

            drainInterval = setInterval(staminaFuc, 100);
            bgSpeed = 1; // fast speed
        }
        hasina.style.left = `5%`;
    }
}

// Stop sprint
function stopSpeed(event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        clearInterval(drainInterval);
        drainInterval = null;
        bgSpeed = 0.2; // normal speed
        hasina.style.left = `2%`;
        startBoost();
    }
}

function startSpeedPc() {
    if (drainInterval == null && s > 0) {
        clearInterval(boostInterval);
        boostInterval = null;

        drainInterval = setInterval(staminaFuc, 100);
        bgSpeed = 1; // fast speed
        hasina.style.left = `5%`;
    }
}

// Stop sprint
function stopSpeedPc() {
    clearInterval(drainInterval);
    drainInterval = null;
    bgSpeed = 0.2; // normal speed
    hasina.style.left = `2%`;
    startBoost();
}
document.addEventListener('keydown', startSpeed);
document.addEventListener('keyup', stopSpeed);
speedButton.addEventListener('mousedown', startSpeedPc);
speedButton.addEventListener('mouseup', stopSpeedPc);
speedButton.addEventListener('touchstart', startSpeedPc);
speedButton.addEventListener('touchend', stopSpeedPc);
