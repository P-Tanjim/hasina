const khaleda = document.querySelector('.khaleda');
const stamina = document.querySelector('.stamina');
const speedButton = document.querySelector('.speed');
const background = document.querySelector('.background');
const hasina = document.querySelector('.hasina');

function isMobile() {
    return /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  }
  
  function checkOrientation() {
    const isPortrait = window.matchMedia("(orientation: portrait)").matches;
    const warning = document.getElementById("rotate-warning");
  
    if (isMobile() && isPortrait) {
      warning.style.display = "flex";
    } else {
      if (warning.style.display === "flex") {
        location.reload(); // Refresh on rotate to landscape
      }
      warning.style.display = "none";
    }
}
  
window.addEventListener("load", checkOrientation);
window.addEventListener("orientationchange", () => {
    setTimeout(checkOrientation, 300); // Small delay for device to update orientation
});
  

let a = 20;
let s = 6;
let drainInterval = null;
let boostInterval = null;
let bgPosition = 0;
let bgSpeed = 0.2; // normal speed

// Move character
function khaledaRun() {
    if (a >= 20 && a <= 80) {
        a = a + 2;
        khaleda.style.left = `${a}%`;
    }
}
setInterval(khaledaRun, 100);

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
        s = s - 0.1;
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
function startSpeed() {
    if (drainInterval == null && s > 0) {
        clearInterval(boostInterval);
        boostInterval = null;

        drainInterval = setInterval(staminaFuc, 100);
        bgSpeed = 1; // fast speed

    }
    hasina.style.left = `5%`;
}

// Stop sprint
function stopSpeed() {
    clearInterval(drainInterval);
    drainInterval = null;
    bgSpeed = 0.2; // normal speed
    hasina.style.left = `2%`;
    startBoost();
}

// Button events (mouse + touch)
speedButton.addEventListener('mousedown', startSpeed);
speedButton.addEventListener('mouseup', stopSpeed);
speedButton.addEventListener('touchstart', startSpeed);
speedButton.addEventListener('touchend', stopSpeed);
