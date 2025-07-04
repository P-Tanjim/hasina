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
const dogBoxEne = document.querySelector(".dogs-box-ene");
const healthOne = document.querySelector(".health-one");
const healthTwo = document.querySelector(".health-two");
const style = window.getComputedStyle(healthTwo);
const style2 = window.getComputedStyle(healthOne);
const shield = document.querySelector(".shield");
const dogAttack = document.querySelector(".dogs-attack");
const dogAttackEne = document.querySelector(".dogs-attack-ene");
const heliAttack = document.querySelector(".heli");
const heliAttackEne = document.querySelector(".heliEne");
const playerIsWhat = document.getElementById("dogAttackPlayer");
const EnemyIsWhat = document.getElementById("dogAttackEnemy");
const images = document.querySelector(".img");
const policeCar = document.querySelector(".police-box");
const policeCarEne = document.querySelector(".police-box-ene");



// character switch detact
let cha = false;

let gunSelect = false;

const attacks = ["gun", "heli", "dog", "police"];

function enemy() {
  let num = Math.floor(Math.random() * 4);
  let attack = attacks[num];
  let healthInPixStg2 = style2.getPropertyValue("width");
  let healthInPix2 = parseFloat(healthInPixStg2);
  let health2 = (healthInPix2 / window.innerWidth) * 100;
  if (attack == "gun") {
    if (cha == true) {
      hasina.innerHTML = `<img alt="hasina" src="hasGun.png" style="transform: rotateY(180deg);" class="hasina has" />`;
      chaHasina.style.transform = "scaleY(1)";
      hasina.classList.remove("breathing");
      setTimeout(() => {
        hasina.innerHTML = `<img alt="hasina" src="hasina.webp" style="transform: rotateY(180deg);" class="hasina has" />`;
        hasina.classList.add("breathing");
      }, 4000);
    } else {
      khaleda.innerHTML = `<img alt="khaleda" src="khaGun.png" style="transform: rotateY(180deg);" class="khaleda kha" />`;
      khaleda.classList.remove("breathing");
      setTimeout(() => {
        khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" class="khaleda kha" />`;
        chaKhaleda.style.transform = "scaleX(1)";
        khaleda.classList.add("breathing");
      }, 4000);
    }
  } else if (attack == "heli") {
    let n = 105;
    let i = 1;

    heliAttackEne.style.transform = "rotateY(180deg) rotate(10deg)";
    heliAttackEne.style.display = "flex";
    heliAttackEne.style.left = `${n}%`; // Start position

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          heliAttackEne.style.display = "none";
          heliAttackEne.style.left = `105%`; // Reset for next click
        }, 3000);
        return;
      }

      n -= i;
      heliAttackEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150); // Controls speed
  } else if (attack == "dog") {
    let n = 105;
    if (cha == true) {
      playerIsWhat.src = "dogAttackKha.png";
    } else {
      playerIsWhat.src = "dogAttackHas.png";
    }
    setTimeout(() => {
      if (cha == true) {
        khaleda.style.display = "none";
      } else {
        hasina.style.display = "none";
      }
    }, 2000);
    dogBoxEne.style.left = `${n}%`;
    dogBoxEne.style.display = "flex";
    for (let i = 1; i <= 18; i += 2) {
      n -= i;
      dogBoxEne.style.left = `${n}%`;
    }
    setTimeout(() => {
      dogBoxEne.style.display = "none";
      dogAttackEne.style.display = "flex";
    }, 2000);
    setTimeout(() => {
      dogBoxEne.style.left = "105%";
      dogBoxEne.style.display = "flex";
      healthOne.style.width = `${health2 - 4}vw`;
      dogAttackEne.style.display = "none";
      hasina.style.display = "flex";
      khaleda.style.display = "flex";
    }, 4000);
  } else {
    let n = 110;
    let i = 1;

    policeCarEne.style.display = "flex";
    policeCarEne.style.left = `${n}%`; // Start position
    if (cha == true) {
      khaleda.style.display = "none";
    } else {
      hasina.style.display = "none";
    }

    const interval = setInterval(() => {
      if (i > 25) {
        clearInterval(interval);
        setTimeout(() => {
          policeCarEne.style.display = "none";
          policeCarEne.style.left = `-65%`; // Reset for next click
        }, 2000);
        setTimeout(() => {
          if (cha == true) {
            khaleda.style.display = "flex";
          } else {
            hasina.style.display = "flex";
          }
          healthOne.style.width = `${health2 - 4}vw`;
        }, 1000);
        return;
      }

      n -= i;
      policeCarEne.style.left = `${n}%`; // Triggers CSS transition
      i += 2;
    }, 150);
  }
}

function protect() {
  let count = 0; // how many times the animation has happened
  const protectIn = setInterval(() => {
    let num = Math.floor(Math.random() * 2);

    if (num === 0) {
      if (cha === false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaShd.png" style="transform: rotateY(180deg)" class="khaleda kha"/>`;
        khaleda.classList.remove("breathing");
      } else {
        hasina.innerHTML = `<img alt="hasina" src="hasShd.png" class="hasina has"/>`;
        hasina.classList.remove("breathing");
      }
    }

    count += 200;
    if (count >= 4000) {
      clearInterval(protectIn);

      // Restore original image and breathing animation
      if (cha === false) {
        khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" class="khaleda kha" />`;
        khaleda.classList.add("breathing");
      } else {
        hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has"/>`;
        hasina.classList.add("breathing");
      }
    }
  }, 150);
}

setInterval(() => {
  if (gunSelect == false) {
    enemy();
  } else {
    protect();
  }
}, 5000);

document.querySelector(".main-power-button").addEventListener("click", () => {
  document.querySelector(".power-button-container").classList.toggle("active");
});

//power
powers.forEach(function (btn) {
  btn.addEventListener("click", () => {
    let id = btn.id;
    let healthInPixStg = style.getPropertyValue("width");
    let healthInPix = parseFloat(healthInPixStg);
    let health = (healthInPix / window.innerWidth) * 100;
    if (id == "gun") {
      gunSelect = true;
      images.src = "gun-attack.webp";
      images.classList.add("fade-in");
      if (cha == false) {
        hasina.innerHTML = `<img alt="hasina" src="hasGun.png" class="hasina has" />`;
        chaHasina.style.transform = "scaleY(0.8)";
        hasina.classList.remove("breathing");
        setTimeout(() => {
          hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has" />`;
          hasina.classList.add("breathing");
          images.src = "nirImg.png";
          gunSelect = false;
        }, 4000);
      } else {
        khaleda.innerHTML = `<img alt="khaleda" src="khaGun.png" class="khaleda kha" />`;
        khaleda.classList.remove("breathing");
        khaleda.style.transform = "scale(1.1)";
        setTimeout(() => {
          khaleda.innerHTML = `<img alt="khaleda" src="khaleda.webp" style="transform: rotateY(180deg)" class="khaleda kha" />`;
          khaleda.classList.add("breathing");
          khaleda.style.transform = "scaleY(1)";
          images.src = "nirImg.png";
          images.classList.remove("fade-in");
          gunSelect = false;
        }, 4000);
      }
    }
    let n = -65;

    if (id == "dog") {
      images.src = "dogs-img.avif";
      images.classList.add("fade-in");
      if (cha == false) {
        EnemyIsWhat.src = "dogAttackKha.png";
      } else {
        EnemyIsWhat.src = "dogAttackHas.png";
      }
      setTimeout(() => {
        if (cha == false) {
          khaleda.style.display = "none";
        } else {
          hasina.style.display = "none";
        }
      }, 2000);
      dogBox.style.left = `${n}%`;
      dogBox.style.display = "flex";
      for (let i = 1; i <= 18; i += 2) {
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
        images.src = "nirImg.png";
        images.classList.remove("fade-in");
      }, 4000);
    }
    if (id == "heli") {
      images.src = "heli-attack.png";
      images.classList.add("fade-in");
      let n = -65;
      let i = 1;

      heliAttack.style.display = "flex";
      heliAttack.style.left = `${n}%`; // Start position

      const interval = setInterval(() => {
        if (i > 25) {
          clearInterval(interval);
          setTimeout(() => {
            heliAttack.style.display = "none";
            heliAttack.style.left = `-65%`; // Reset for next click
            images.src = "nirImg.png";
            images.classList.remove("fade-in");
          }, 3000);
          return;
        }

        n += i;
        heliAttack.style.left = `${n}%`; // Triggers CSS transition
        i += 2;
      }, 150); // Controls speed
    }

    if (id == "police") {
      images.src = "police-attack.webp";
      images.classList.add("fade-in");

      let n = -45;
      let i = 1;

      policeCar.style.display = "flex";
      policeCar.style.left = `${n}%`; // Start position
      if (cha == false) {
        khaleda.style.display = "none";
      } else {
        hasina.style.display = "none";
      }

      const interval = setInterval(() => {
        if (i > 25) {
          clearInterval(interval);
          setTimeout(() => {
            policeCar.style.display = "none";
            policeCar.style.left = `-65%`; // Reset for next click
            images.src = "nirImg.png";
            images.classList.remove("fade-in");
          }, 2000);
          setTimeout(() => {
            if (cha == false) {
              khaleda.style.display = "flex";
            } else {
              hasina.style.display = "flex";
            }
            healthTwo.style.width = `${health - 4}vw`;
          }, 1000);
          return;
        }

        n += i;
        policeCar.style.left = `${n}%`; // Triggers CSS transition
        i += 2;
      }, 150);
    }
  });
});

// shield controler
shield.addEventListener("mousedown", () => {
  if (cha == true) {
    khaleda.innerHTML = `<img alt="khaleda" src="khaShd.png" class="khaleda kha"/>`;
    khaleda.classList.remove("breathing");
  } else {
    hasina.innerHTML = `<img alt="hasina" src="hasShd.png" class="hasina has"/>`;
    hasina.classList.remove("breathing");
  }
});
shield.addEventListener("mouseup", () => {
  if (cha == true) {
    khaleda.innerHTML = `<img alt="khaleda" src="khaledaUse.png" class="khaleda kha" />`;
    khaleda.classList.add("breathing");
  } else {
    hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has"/>`;
    hasina.classList.add("breathing");
  }
});
//touch
shield.addEventListener("touchstart", () => {
  if (cha == true) {
    khaleda.innerHTML = `<img alt="khaleda" src="khaShd.png" class="khaleda kha"/>`;
    khaleda.classList.remove("breathing");
    khaleda.style.transform = "scaleY(1.1)";
  } else {
    hasina.innerHTML = `<img alt="hasina" src="hasShd.png" class="hasina has"/>`;
    hasina.classList.remove("breathing");
  }
});
shield.addEventListener("touchend", () => {
  if (cha == true) {
    khaleda.innerHTML = `<img alt="khaleda" src="khaledaUse.png" class="khaleda kha"/>`;
    khaleda.classList.add("breathing");
    khaleda.style.transform = "scaleY(1)";
  } else {
    hasina.innerHTML = `<img alt="hasina" src="hasina.webp" class="hasina has"/>`;
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
function timer() {
  t = 60;
  let timing = setInterval(() => {
    time.style.color = "black";
    t -= 1;
    time.innerText = `00:${t}`;
    if (t <= 9) {
      time.style.color = "#a20000";
      time.innerText = `00:0${t}`;
    }
    if (t == 0) {
      time.innerText = `00:00`;
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
