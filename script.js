const khaleda = document.querySelector('.khaleda');
const stamina = document.querySelector('.stamina');
const speedButton = document.querySelector('.speed');
const background = document.querySelector('.background');
const hasina = document.querySelector('.hasina');
const rotateWarning = document.getElementById("rotate-warning");
const jump = document.querySelector('.up-controler');
const down = document.querySelector('.down-controler');

const bg1 = document.querySelector('.bg1');
const bg2 = document.querySelector('.bg2');

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
let gamePaused = false;

function checkOrientation() {
  const isPortrait = window.innerHeight > window.innerWidth;
  if (isPortrait) {
    rotateWarning.style.display = "flex";
    pauseGame();
  } else {
    rotateWarning.style.display = "none";
    resumeGame();
  }
}

function pauseGame() {
  gamePaused = true;
  bgSpeed = 0;
  clearInterval(drainInterval);
  clearInterval(boostInterval);
  drainInterval = null;
  boostInterval = null;
}

function resumeGame() {
  gamePaused = false;
  bgSpeed = isSprinting ? 1 : 0.2;
  if (isSprinting && s > 0) {
    startDrain();
  } else {
    startBoost();
  }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

// Movement
function khaledaRun() {
  if (!gamePaused && a >= 20 && a <= 80) {
    a += 1.5;
    khaleda.style.left = `${a}%`;
  }
}
setInterval(khaledaRun, 100);

// Jump animation
function jumping() {
  if (jumpAnimation === true && !gamePaused) {
    hasina.classList.add("hasina-jump");
    jumpAnimation = setInterval(() => {
      hasina.classList.remove("hasina-jump");
      clearInterval(jumpAnimation);
      jumpAnimation = true;
    }, 1000);
  }
}

// Down animation
function downing() {
  if (downAnimation === true && !gamePaused) {
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

// Background animation
function animateBackground() {
  if (!gamePaused) {
    bg1X -= bgSpeed;
    bg2X -= bgSpeed;

    if (bg1X <= -100) bg1X = bg2X + 100;
    if (bg2X <= -100) bg2X = bg1X + 100;

    bg1.style.transform = `translateX(${bg1X}vw)`;
    bg2.style.transform = `translateX(${bg2X}vw)`;
  }
  requestAnimationFrame(animateBackground);
}
animateBackground();

// Stamina
// function drainStamina() {
//   if (s > 0) {
//     s -= 0.3;
//     stamina.style.width = `${s}vw`;
//   } else {
//     clearInterval(drainInterval);
//     drainInterval = null;
//     bgSpeed = 0.2;
//     startBoost();
//   }
// }

// function boostStamina() {
//   if (s < 6) {
//     s += 0.2;
//     stamina.style.width = `${s}vw`;
//   } else {
//     clearInterval(boostInterval);
//     boostInterval = null;
//   }
// }

// function startDrain() {
//   if (drainInterval == null) {
//     drainInterval = setInterval(drainStamina, 100);
//   }
// }

// function startBoost() {
//   if (boostInterval == null) {
//     boostInterval = setInterval(boostStamina, 100);
//   }
// }

// Sprinting
function startSpeed(event) {
  event.preventDefault();
  if (!isSprinting && s > 0 && !gamePaused) {
    isSprinting = true;
    clearInterval(boostInterval);
    boostInterval = null;
    // startDrain();
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
  // startBoost();
}

// Speed button events
speedButton.addEventListener('mousedown', startSpeed);
speedButton.addEventListener('mouseup', stopSpeed);
speedButton.addEventListener('touchstart', startSpeed);
speedButton.addEventListener('touchend', stopSpeed);

document.addEventListener('keydown', function (event) {
  if (event.key === "ArrowRight") startSpeed(event);
});
document.addEventListener('keyup', function (event) {
  if (event.key === "ArrowRight") stopSpeed(event);
});

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

// Fullscreen on double tap or double click
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
  if (currentTime - lastTap < 300) {
    requestFullscreen();
  }
  lastTap = currentTime;
});
window.addEventListener('dblclick', requestFullscreen);
