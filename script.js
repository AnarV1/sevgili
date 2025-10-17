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
