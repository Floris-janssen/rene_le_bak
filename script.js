// --- Audio (plaats je eigen bestanden in de map "audio") ---
const reneAudio = new Audio("audio/rene-le-blanc.mp3");
const stigmaAudio = new Audio("audio/solid-stigma.mp3");

reneAudio.preload = "auto";
stigmaAudio.preload = "auto";

// --- Elementen ---
const screenSetup = document.getElementById("screen-setup");
const screenGame = document.getElementById("screen-game");
const chanceSlider = document.getElementById("chance");
const chanceValue = document.getElementById("chance-value");
const chanceMinus = document.getElementById("chance-minus");
const chancePlus = document.getElementById("chance-plus");
const resultText = document.getElementById("result-text");
const resultImage = document.getElementById("result-image");
const resultBox = document.getElementById("result-box");
const missCountEl = document.getElementById("miss-count");
const audioWarning = document.getElementById("audio-warning");
const btnStart = document.getElementById("btn-start");
const btnPlay = document.getElementById("btn-play");
const btnPause = document.getElementById("btn-pause");
const btnBack = document.getElementById("btn-back");

// Kans: "1 op X" met X tussen 1 en 10. Kans op René = 1 / X.
let odds = 5;

// Hoe vaak René achter elkaar al niet is geweest.
let missCount = 0;

// Welke audio er nu speelt (voor de pauzeknop).
let currentAudio = null;

function updateChanceLabel() {
  odds = parseInt(chanceSlider.value, 10);
  chanceValue.textContent = odds;
  resetMissCount();
}

function resetMissCount() {
  missCount = 0;
  missCountEl.textContent = 0;
}

chanceSlider.addEventListener("input", updateChanceLabel);
chanceMinus.addEventListener("click", () => {
  chanceSlider.value = Math.max(1, parseInt(chanceSlider.value, 10) - 1);
  updateChanceLabel();
});
chancePlus.addEventListener("click", () => {
  chanceSlider.value = Math.min(10, parseInt(chanceSlider.value, 10) + 1);
  updateChanceLabel();
});
updateChanceLabel();

// Jaarclub foto: probeer eerst .jpg, daarna .png.
const jaarclubImg = document.getElementById("jaarclub-img");
jaarclubImg.addEventListener("error", () => {
  if (jaarclubImg.src.endsWith("jaarclub.jpg")) {
    jaarclubImg.src = "images/jaarclub.png";
  } else {
    jaarclubImg.remove();
  }
});

// Uitslag-afbeelding ontbreekt? Verberg hem, de tekst blijft staan.
resultImage.addEventListener("error", () => {
  resultImage.hidden = true;
});

// Audio ontbreekt? Toon een melding.
[reneAudio, stigmaAudio].forEach((audio) => {
  audio.addEventListener("error", () => {
    audioWarning.hidden = false;
  });
});

function stopAllAudio() {
  reneAudio.pause();
  reneAudio.currentTime = 0;
  stigmaAudio.pause();
  stigmaAudio.currentTime = 0;
}

function showResult(isRene) {
  resultText.classList.remove("rene", "stigma");

  if (isRene) {
    resultText.textContent = "René";
    resultText.classList.add("rene");
    resultImage.src = "images/rene.png";
    resultImage.alt = "René";
  } else {
    resultText.textContent = "Solid Stigma";
    resultText.classList.add("stigma");
    resultImage.src = "images/solid-stigma.png";
    resultImage.alt = "Solid Stigma";
  }
  resultImage.hidden = false;
}

// Speel één ronde. Wordt aangeroepen vanuit een klik (user gesture),
// waardoor browsers het afspelen toestaan (autoplay wordt zo omzeild).
function playRound() {
  stopAllAudio();
  const isRene = Math.random() < 1 / odds;
  showResult(isRene);

  // Counter: hoe vaak René al niet is geweest (reset als René speelt).
  missCount = isRene ? 0 : missCount + 1;
  missCountEl.textContent = missCount;

  // Klik-animatie zodat je ziet dat er gespeeld is.
  triggerClickAnimation();

  const audio = isRene ? reneAudio : stigmaAudio;
  currentAudio = audio;
  btnPause.textContent = "Pauze";
  audio.currentTime = 0.5; // start 0,5 seconde verder zodat het nummer sneller begint
  audio.play().catch(() => {
    audioWarning.hidden = false;
  });
}

// Korte animatie op de knop en het resultaatvak bij elke klik.
function triggerClickAnimation() {
  btnPlay.classList.remove("pressed");
  void btnPlay.offsetWidth;
  btnPlay.classList.add("pressed");

  resultBox.classList.remove("flash");
  void resultBox.offsetWidth;
  resultBox.classList.add("flash");
}

// Start het spel: wissel van scherm én speel meteen de eerste ronde.
btnStart.addEventListener("click", () => {
  resetMissCount();
  screenSetup.classList.remove("active");
  screenGame.classList.add("active");
  playRound();
});

// Nog een keer spelen
btnPlay.addEventListener("click", playRound);

// Pauze / hervat de audio
btnPause.addEventListener("click", () => {
  if (!currentAudio) return;
  if (currentAudio.paused) {
    currentAudio.play().catch(() => {});
    btnPause.textContent = "Pauze";
  } else {
    currentAudio.pause();
    btnPause.textContent = "Hervat";
  }
});

// Terug naar kans-instellingen
btnBack.addEventListener("click", () => {
  stopAllAudio();
  screenGame.classList.remove("active");
  screenSetup.classList.add("active");
  resultText.textContent = "Klaar om te spelen?";
  resultText.classList.remove("rene", "stigma");
  resultImage.hidden = true;
});

// Sneltoets: spatie om te spelen
document.addEventListener("keydown", (e) => {
  if (e.code === "Space" && screenGame.classList.contains("active")) {
    e.preventDefault();
    playRound();
  }
});
