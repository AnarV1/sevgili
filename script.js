// 💗 Barmaqla toxunanda və sürüşdürəndə ürəklər barmağın arxasınca getsin (amma daha az)

let isTouching = false;
let lastHeartTime = 0; // ürək sıxlığını azaltmaq üçün zaman izlənməsi
const heartInterval = 100; // ms – ürəklər arasında minimal fasilə

document.addEventListener("touchstart", startTouch);
document.addEventListener("touchmove", moveTouch);
document.addEventListener("touchend", () => (isTouching = false));
document.addEventListener("mousedown", e => {
  isTouching = true;
  createHeart(e.clientX, e.clientY);
});
document.addEventListener("mousemove", e => {
  if (isTouching) createHeart(e.clientX, e.clientY);
});
document.addEventListener("mouseup", () => (isTouching = false));

function startTouch(e) {
  isTouching = true;
  const touch = e.touches[0];
  createHeart(touch.clientX, touch.clientY);
}

function moveTouch(e) {
  if (!isTouching) return;
  const touch = e.touches[0];
  createHeart(touch.clientX, touch.clientY);
}

function createHeart(x, y) {
  const now = Date.now();
  if (now - lastHeartTime < heartInterval) return; // çox sıx olmasın
  lastHeartTime = now;

  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖";
  document.body.appendChild(heart);
  heart.style.left = `${x}px`;
  heart.style.top = `${y}px`;

  setTimeout(() => heart.remove(), 1500);
}

// 💕 Ürək animasiyası
const style = document.createElement("style");
style.innerHTML = `
  .heart {
    position: fixed;
    font-size: 25px; /* daha kiçik ürəklər */
    animation: floatUp 1.5s ease forwards;
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    opacity: 0.9;
  }

  @keyframes floatUp {
    0% { opacity: 1; transform: translate(-50%, -50%) scale(0.9); }
    50% { opacity: 0.9; transform: translate(-50%, -80%) scale(1.1); }
    100% { opacity: 0; transform: translate(-50%, -130%) scale(0.7); }
  }
`;
document.head.appendChild(style);

// 💞 Şəkil karuseli (avtomatik və əl ilə keçid)
const slides = document.querySelector(".slides");
const images = document.querySelectorAll(".slides img");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let index = 0;

// Şəkil dəyişmə funksiyası
function showSlide(i) {
  if (i < 0) index = images.length - 1;
  else if (i >= images.length) index = 0;
  else index = i;
  slides.style.transform = `translateX(-${index * 100}%)`;
}

// Düymələrlə idarə
prevBtn.addEventListener("click", () => showSlide(index - 1));
nextBtn.addEventListener("click", () => showSlide(index + 1));

// Avtomatik dəyişmə (5 saniyədə bir)
setInterval(() => {
  showSlide(index + 1);
}, 5000);


const music = document.getElementById("bgMusic");
music.volume = 0.4;

function startMusic() {
  music.play().catch(() => console.log("Autoplay bloklandı, istifadəçi toxunmalıdır."));
}

// bəzi brauzerlərdə autoplay üçün toxunma icazəsi lazımdır:
document.addEventListener("click", startMusic);
document.addEventListener("touchstart", startMusic);
