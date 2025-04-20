const khaleda = document.querySelector('.khaleda');
const stamina = document.querySelector('.stamina');
const speedButton = document.querySelector('.speed');
const background = document.querySelector('.background');
const hasina = document.querySelector('.hasina');
const rotate = document.querySelector('#rotate-warning');
const jump = document.querySelector('.up-controler');
const down = document.querySelector('.down-controler');
const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');
const gameContainer = document.querySelector('.game-container');

// Show warning image if in portrait mode
function checkOrientation() {
  const rotateWarning = document.getElementById("rotate-warning");
  if (window.innerHeight > window.innerWidth) {
    rotateWarning.style.display = "flex";
  } else {
    rotateWarning.style.display = "none";
  }
}

// Orientation checks
window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
document.addEventListener("visibilitychange", checkOrientation);

// Double tap to fullscreen
let lastTap = 0;
gameContainer.addEventListener('touchend', function (e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    requestFullscreen();
  }
  lastTap = currentTime;
});
gameContainer.addEventListener('dblclick', requestFullscreen);

// Fullscreen function
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

// Game logic
let a = 20;
let s = 6;
let drainInterval = null;
let boostInterval = null;
let jumpAnimation = true;
let downAnimation = true;
let bg1X = 0;
let bg2X = 100;
let bgSpeed = 0.2;
let isSprinting = false;

function khaledaRun() {
  if (a >= 20 && a <= 80) {
    a += 1.5;
    khaleda.style.left = `${a}%`;
  }
}
setInterval(khaledaRun, 100);

// Background animation
function animateBackground() {
  bg1X -= bgSpeed;
  bg2X -= bgSpeed;

  if (bg1X <= -100) bg1X = bg2X + 100;
  if (bg2X <= -100) bg2X = bg1X + 100;

  bg1.style.transform = `translateX(${bg1X}vw)`;
  bg2.style.transform = `translateX(${bg2X}vw)`;

  requestAnimationFrame(animateBackground);
}
animateBackground();

// Stamina handling
function staminaFuc() {
  if (s > 0) {
    s -= 0.3;
    stamina.style.width = `${s}vw`;
  } else {
    clearInterval(drainInterval);
    drainInterval = null;
    bgSpeed = 0.2;
    startBoost();
  }
}

function boost() {
  if (s < 6) {
    s += 0.2;
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

// Jumping
function jumping() {
  if (jumpAnimation === true) {
    hasina.classList.add("hasina-jump");
    jumpAnimation = setInterval(() => {
      hasina.classList.remove("hasina-jump");
      clearInterval(jumpAnimation);
      jumpAnimation = true;
    }, 1000);
  }
}

// Downing
function downing() {
  if (downAnimation === true) {
    hasina.classList.add("hasina-down");
    downAnimation = setInterval(() => {
      hasina.classList.remove("hasina-down");
      clearInterval(downAnimation);
      downAnimation = true;
    }, 1000);
  }
}

// Keyboard controls
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    jumping();
  } else if (event.key === "ArrowDown") {
    downing();
  }
});

// Button controls
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
