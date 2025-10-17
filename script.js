// const SUPABASE_URL = "https://gcjazjogapzuuhxbbxnd.supabase.co";
// const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdjamF6am9nYXB6dXVoeGJieG5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzI4MjcsImV4cCI6MjA3NjIwODgyN30.7XBqphPnFhUie3KVMMePUzJLVkWJGgJc0O9av6qCZas";



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

// const poemText = document.querySelector("#poemLines p");

// const poems = [
//   `Sən mənim ən gözəl təsadüfümsən<br>
//   Gözlərinə baxanda dünyanın səsi kəsilir...<br>
//   Ürəyim yalnız sənin üçün döyünür<br>
//   Uzaq olsan belə, düşüncələrimdə həmişə yanımdasan`,

//   `Sən yoxsan hər şey yerindədi,<br>
//   amma mən deyiləm…<br>
//   Darıxmaq elə səni sevməyin cəzasıymış,<br>
//   mən indi hər gün o cəzanı çəkirəm`,

//   `Hər kəs məni gülür sanır,<br>
//   amma içimdə sənin adınla ağlayıram...`,

//   `Sən yoxsan deyə hər şey boş gəlir…<br>
//   Söhbət eləməyə adam da çoxdu,<br>
//   amma sənin kimi dinləyən yoxdu.<br>
//   Gülürəm, amma içimdə səsin çatmır.<br>
//   Bilirsən, mən sadəcə darıxmıram —<br>
//   səndən sonra heç kim kimi hiss eləmirəm…`,

//   `Sən gedəndən bəri, içimdə hər şey səssizdi.<br>
//   Darıxmaq deyil bu… sanki içimdən sən keçib getmisən.`,

//   `Bir baxışınla düzələn dünyam, indi sənin yoxluğunda dağılır.<br>
//   Bir dəfə bax ardına, mən hələ də ordayam – səni gözləyirəm.`,

//   `Ağlamaq hissini səndən öyrəndim,tək ağladığım qadın sənsən getmə deyə...<br>
//   Gecə ürəyim ağrıyanda rahatlığı sənin pəncərinin altında tapdım...`,

//   `Yanımda deyilsən amma gözümün daldığı hər yerdəsən`,

//   `Məsələ heç vaxt darıxmaq deyildi daha pis şeylərdə var həyatda.<br>
//   Məsələn ondan ötrü darıxdığımı deməyə utanmaq kimi.<br>
//   Məsələn o ümidin heç vaxt ölməyəcəyini bilmək kimi.<br>
//   Məsələn heç kimin yıxa bilmədiyi insanın onu ayaqda saxlayanın yıxması kimi.<br>
//   Məsələ sadəcə budu.`
// ];

// let say = 0;

// function changePoem() {
//   poemText.style.opacity = 0;
//   poemText.style.transform = "translateY(10px)";

//   setTimeout(() => {
//     say = (say + 1) % poems.length;
//     poemText.innerHTML = poems[say];
//     poemText.style.opacity = 1;
//     poemText.style.transform = "translateY(0)";
//   }, 800);
// }

// // hər 6 saniyədən bir bənd dəyişsin
// setInterval(changePoem, 6000);


const poemText = document.querySelector("#poemLines p");
const nextButn = document.getElementById("nextButn");
const prevButn = document.getElementById("prevButn");

const poemLines = [
  `Sən mənim ən gözəl təsadüfümsən<br>
  Gözlərinə baxanda dünyanın səsi kəsilir...<br>
  Ürəyim yalnız sənin üçün döyünür<br>
  Uzaq olsan belə, düşüncələrimdə həmişə yanımdasan`,

  `Sən yoxsan hər şey yerindədi,<br>
  amma mən deyiləm…<br>
  Darıxmaq elə səni sevməyin cəzasıymış,<br>
  mən indi hər gün o cəzanı çəkirəm`,

  `Hər kəs məni gülür sanır,<br>
  amma içimdə sənin adınla ağlayıram...`,

  `Sən yoxsan deyə hər şey boş gəlir…<br>
  Söhbət eləməyə adam da çoxdu,<br>
  amma sənin kimi dinləyən yoxdu.<br>
  Gülürəm, amma içimdə səsin çatmır.<br>
  Bilirsən, mən sadəcə darıxmıram —<br>
  səndən sonra heç kim kimi hiss eləmirəm…`,

  `Sən gedəndən bəri, içimdə hər şey səssizdi.<br>
  Darıxmaq deyil bu… sanki içimdən sən keçib getmisən.`,

  `Bir baxışınla düzələn dünyam, indi sənin yoxluğunda dağılır.<br>
  Bir dəfə bax ardına, mən hələ də ordayam – səni gözləyirəm.`,

  `Ağlamaq hissini səndən öyrəndim,tək ağladığım qadın sənsən getmə deyə...<br>
  Gecə ürəyim ağrıyanda rahatlığı sənin pəncərinin altında tapdım...`,

  `Yanımda deyilsən amma gözümün daldığı hər yerdəsən`,

  `Məsələ heç vaxt darıxmaq deyildi daha pis şeylərdə var həyatda.<br>
  Məsələn ondan ötrü darıxdığımı deməyə utanmaq kimi.<br>
  Məsələn o ümidin heç vaxt ölməyəcəyini bilmək kimi.<br>
  Məsələn heç kimin yıxa bilmədiyi insanın onu ayaqda saxlayanın yıxması kimi.<br>
  Məsələ sadəcə budu.`
];

let add = 0;

function showPoem(i) {
  poemText.style.opacity = 0;
  poemText.style.transform = "translateY(10px)";
  setTimeout(() => {
    poemText.innerHTML = poemLines[i];
    poemText.style.opacity = 1;
    poemText.style.transform = "translateY(0)";
  }, 300);
}

nextButn.addEventListener("click", () => {
  add = (add + 1) % poemLines.length;
  showPoem(add);
});

prevButn.addEventListener("click", () => {
  add = (add - 1 + poemLines.length) % poemLines.length;
  showPoem(add);
});
