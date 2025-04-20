const khaleda = document.querySelector('.khaleda');
const stamina = document.querySelector('.stamina');
const speedButton = document.querySelector('.speed');
const background = document.querySelector('.background');
const hasina = document.querySelector('.hasina');
const rotate = document.querySelector('#rotate-warning');
const jump = document.querySelector('.up-controler');
const down = document.querySelector('.down-controler');


function checkOrientation() {
  const rotateWarning = document.getElementById("rotate-warning");
  if (window.innerHeight > window.innerWidth) {
    rotateWarning.style.display = "flex";
  } else {
    rotateWarning.style.display = "none";
  }
}

// Check on load
window.addEventListener("load", checkOrientation);

// Check when screen size or orientation changes
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

let a = 20;
let s = 6;
let drainInterval = null;
let boostInterval = null;
let jumpAnimation = true;
let downAnimation = true;
let bgPosition = 0;
// let bgSpeed = 0.2;
let isSprinting = false;

// Move character
function khaledaRun() {
    if (a >= 20 && a <= 80) {
        a = a + 1.5;
        khaleda.style.left = `${a}%`;
    }
}
setInterval(khaledaRun, 100);

// Jump animation
function jumping() {
    if (jumpAnimation === true) {
        hasina.classList.add("hasina-jump");
        jumpAnimation = setInterval(jumpAgain, 1000);
    }
}

function jumpAgain() {
    hasina.classList.remove("hasina-jump");
    clearInterval(jumpAnimation);
    jumpAnimation = true;
}

// Down animation
function downing() {
    if (downAnimation === true) {
        hasina.classList.add("hasina-down");
        downAnimation = setInterval(downAgain, 1000);
    }
}

function downAgain() {
    hasina.classList.remove("hasina-down");
    clearInterval(downAnimation);
    downAnimation = true;
}

// Keyboard controls
document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp") {
        jumping();
    } else if (event.key === "ArrowDown") {
        downing();
    }
});

// Animate background smoothly
const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');

let bg1X = 0;
let bg2X = 100;
let bgSpeed = 0.2;

function animateBackground() {
  bg1X -= bgSpeed;
  bg2X -= bgSpeed;

  if (bg1X <= -100) {
    bg1X = bg2X + 100;
  }
  if (bg2X <= -100) {
    bg2X = bg1X + 100;
  }

  bg1.style.transform = `translateX(${bg1X}vw)`;
  bg2.style.transform = `translateX(${bg2X}vw)`;

  requestAnimationFrame(animateBackground);
}

animateBackground();

// Stamina drain
function staminaFuc() {
    if (s > 0) {
        s = s - 0.3;
        stamina.style.width = `${s}vw`;
    } else {
        clearInterval(drainInterval);
        drainInterval = null;
        bgSpeed = 0.2;
        startBoost();
    }
}

// Stamina boost
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

// Sprinting
function startSpeed(event) {
    event.preventDefault();

    if (!isSprinting && s > 0) {
        isSprinting = true;
        clearInterval(boostInterval);
        boostInterval = null;
        drainInterval = setInterval(staminaFuc, 100);
        bgSpeed = 1;
    }
    hasina.style.left = `5%`;
}

function stopSpeed(event) {
    event.preventDefault();
    isSprinting = false;
    clearInterval(drainInterval);
    drainInterval = null;
    bgSpeed = 0.2;
    hasina.style.left = `2%`;
    startBoost();
}

// Speed button events
document.addEventListener('keydown', function (event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        startSpeed(event);
    }
});
document.addEventListener('keyup', function (event) {
    if (event.key === "ArrowRight" || event.keyCode === 39) {
        stopSpeed(event);
    }
});
speedButton.addEventListener('mousedown', startSpeed);
speedButton.addEventListener('mouseup', stopSpeed);
speedButton.addEventListener('touchstart', startSpeed);
speedButton.addEventListener('touchend', stopSpeed);

// Jump/down buttons
jump.addEventListener("click", jumping);
down.addEventListener("click", downing);
jump.addEventListener('touchstart', (e) => {
    e.preventDefault();
    jumping();
});
down.addEventListener('touchstart', (e) => {
    e.preventDefault();
    downing();
});

// Fullscreen toggle
function requestFullscreen() {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
let lastTap = 0;
window.addEventListener('touchend', function (e) {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;
    if (tapLength < 300 && tapLength > 0) {
        requestFullscreen();
    }
    lastTap = currentTime;
});
window.addEventListener('dblclick', function () {
    requestFullscreen();
});
