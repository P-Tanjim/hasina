const khaleda = document.querySelector(".khaleda");
const chaKhaleda = document.querySelector(".kha");
const chaHasina = document.querySelector(".has");
const fightBox = document.querySelector(".fight-box");
const fight = document.querySelector(".fight-text");
const time = document.querySelector(".time");
const hasina = document.querySelector(".hasina");
const rotate = document.querySelector("#rotate-warning");
const jump = document.querySelector(".up-controler");
const down = document.querySelector(".down-controler");
const change_cha = document.querySelector(".cha-change");
const character = document.querySelector(".character");
const buttons = document.querySelectorAll(".sub-button");
const player1 = document.querySelector(".woman-one");
const player2 = document.querySelector(".woman-two");
const dog = document.querySelector(".dog");
const powers = document.querySelectorAll(".sub-button");
const dogBox = document.querySelector(".dogs-box");
const healthTwo = document.querySelector(".health-two");
const style = window.getComputedStyle(healthTwo);
const shield = document.querySelector(".shield");
const dogAttack = document.querySelector(".dogs-attack");




document.querySelector(".main-power-button").addEventListener("click", () => {
  document.querySelector(".power-button-container").classList.toggle("active");
});

// character switch catch
let cha = false;

//power
powers.forEach(function (btn) {
  btn.addEventListener("click", () => {
     let id = btn.id;
    if (id == "gun") {
      if (cha == false) {
        hasina.innerHTML = `<img alt="hasina" src="hasGun.png" class="hasina has" />`;
        hasina.classList.remove("breathing");
        setTimeout(() => {
          hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has" />`;
          hasina.classList.add("breathing");
        }, 4000);
      } 
      else {
        khaleda.innerHTML = `<img alt="khaleda" src="khaGun.png" class="khaleda kha" />`; khaleda.classList.remove("breathing");
        khaleda.style.transform = 'scale(1.1)';
        setTimeout(() => {
          khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" style="transform: rotateY(180deg)" class="khaleda kha" />`;
          khaleda.classList.add("breathing");
          khaleda.style.transform = "scaleY(1)";
        }, 4000);
      }
    }
    let n = -65;
    let healthInPixStg = style.getPropertyValue("width");
    let healthInPix = parseFloat(healthInPixStg);
    let health = (healthInPix / window.innerWidth) * 100;

    if (id == "dog") {
        if (cha == false) {
            dogAttack.style.backgroundImage = "url(dogAttackKha.png)";
        }else{
            dogAttack.style.backgroundImage = "url(dogAttackHas.png)";
        }
        setTimeout(() => {
            if (cha == false) {
                khaleda.style.display = "none";
            }else {
                hasina.style.display = "none";
            }
        }, 2000);
        dogBox.style.left = `${n}%`;
        dogBox.style.display = "flex";
        for(let i = 1; i <= 18; i += 2){
            n += i;
            dogBox.style.left = `${n}%`;
        }
        setTimeout(() => {
            dogBox.style.display = "none";
            dogAttack.style.display = "flex";
        }, 2000);
        setTimeout(() => {
            dogBox.style.left = "-65%";
            dogBox.style.display = "flex";
            healthTwo.style.width = `${health - 4}vw`;
            dogAttack.style.display = "none";
            hasina.style.display = "flex";
            khaleda.style.display = "flex";
        }, 4000);
    }
  });
});


// shield controler
shield.addEventListener("mousedown", () => {
    if (cha == false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaShd.png" class="khaleda kha" style="transform: rotateY(180deg)"/>`;
        khaleda.classList.remove("breathing");
        
    }
    else{
        hasina.innerHTML = `<img alt="hasina" src="hasShd.png" class="hasina has" style="transform: rotateY(180deg)"/>`;
        hasina.classList.remove("breathing");
    }
    
});
shield.addEventListener("mouseup", () => {
    if (cha == false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" class="khaleda kha" />`;
        khaleda.classList.add("breathing");
    }
    else{
        hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has"/>`;
        hasina.classList.add("breathing");
    }
    
});
//touch
shield.addEventListener("touchstart", () => {
    if (cha == false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaShd.png" class="khaleda kha" style="transform: rotateY(180deg)"/>`;
        khaleda.classList.remove("breathing");
        khaleda.style.transform = "scaleY(1.1)";
    }
    else{
        hasina.innerHTML = `<img alt="hasina" src="hasShd.png" class="hasina has" style="transform: rotateY(180deg)"/>`;
        hasina.classList.remove("breathing");
    }
    
});
shield.addEventListener("touchend", () => {
    if (cha == false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" class="khaleda kha" style="transform: rotateY(180deg)"/>`;
        khaleda.classList.add("breathing");
    }
    else{
        hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has" style="transform: rotateY(180deg)"/>`;
        hasina.classList.add("breathing");
    }
    
});


change_cha.addEventListener("click", () => {
  if (cha == false) {
    character.innerHTML = `<img alt="Fight" src="khaleda2.0.webp" class="character-img">`;
    chaKhaleda.style.transform = "rotateY(180deg)";
    chaHasina.style.transform = "rotateY(180deg)";
    khaleda.style.left = "-12%";
    khaleda.style.right = "60%";
    hasina.style.left = "60%";
    player1.style.backgroundImage = "url(khaleda2.0.webp)";
    player2.style.backgroundImage = "url(hasina2.0.webp)";
    cha = true;
  } else {
    character.innerHTML = `<img alt="Fight" src="hasina2.0.webp" class="character-img">`;
    chaKhaleda.style.transform = "rotateY(0deg)";
    chaHasina.style.transform = "rotateY(0deg)";
    khaleda.style.right = "-5%";
    khaleda.style.left = "55%";
    hasina.style.left = "-6%";
    hasina.style.right = "-5%";
    player1.style.backgroundImage = "url(hasina2.0.webp)";
    player2.style.backgroundImage = "url(khaleda2.0.webp)";
    cha = false;
  }
});

fight.addEventListener("click", () => {
  fightBox.classList.add("fight");
  setTimeout(() => {
    fightBox.style.display = "none";
    timer();
  }, 100);
});
t = 0;
function timer() {
  let timing = setInterval(() => {
    t += 1;
    time.innerText = `00:0${t}`;
    if (t >= 10) {
      time.innerText = `00:${t}`;
    }
    if (t == 60) {
      t = 1;
      time.innerText = `0${t}:0${t - 1}`;
    }
  }, 1000);
  setTimeout(() => {
    clearInterval(timing);
  }, 60000);
}

let jumpAnimation = true;
let downAnimation = true;

function jumping() {
  if (jumpAnimation === true) {
    if (cha == true) {
      khaleda.classList.add("jump");
      khaleda.classList.remove("breathing");
      jumpAnimation = setInterval(jumpAgain, 1000);
    } else {
      hasina.classList.add("jump");
      hasina.classList.remove("breathing");
      jumpAnimation = setInterval(jumpAgain, 1000);
    }
  }
}

function jumpAgain() {
  if (cha == true) {
    khaleda.classList.remove("jump");
    khaleda.classList.add("breathing");
  } else {
    hasina.classList.remove("jump");
    hasina.classList.add("breathing");
  }
  clearInterval(jumpAnimation);
  jumpAnimation = true;
}

// Down animation
function downing() {
  if (downAnimation === true) {
    if (cha == true) {
      // khaleda.classList.add("slide-right");
      khaleda.classList.add("duck");
      khaleda.classList.remove("breathing");
    } else {
      // hasina.classList.add("slide-right");
      hasina.classList.add("duck");
      hasina.classList.remove("breathing");
    }

    downAnimation = setInterval(downAgain, 1000);
  }
}

function downAgain() {
  if (cha == true) {
    // khaleda.classList.remove("slide-right");
    khaleda.classList.remove("duck");
    khaleda.classList.add("breathing");
  } else {
    // hasina.classList.remove("slide-right");
    hasina.classList.remove("duck");
    hasina.classList.add("breathing");
  }

  clearInterval(downAnimation);
  downAnimation = true;
}

// Keyboard control for jump/down
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp") {
    jumping();
  } else if (event.key === "ArrowDown") {
    downing();
  }
});

// Touch/mouse for speed button
jump.addEventListener("mousedown", jumping);
down.addEventListener("mousedown", downing);
jump.addEventListener("touchstart", (e) => {
  e.preventDefault();
  jumping();
});
down.addEventListener("touchstart", (e) => {
  e.preventDefault();
  downing();
});

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

// Double tap / double click support
let lastTap = 0;
window.addEventListener("touchend", function (e) {
  const currentTime = new Date().getTime();
  const tapLength = currentTime - lastTap;
  if (tapLength < 300 && tapLength > 0) {
    requestFullscreen();
  }
  lastTap = currentTime;
});

window.addEventListener("dblclick", function () {
  requestFullscreen();
});
