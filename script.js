const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwG_R935o8rMeZjZ-EGXP0hhAx9fX8VQG8HAd1kt48SAs8t3FRGW4Wr6T5bNFYb7eWb/exec";

// Обратный отсчёт
const weddingDate = new Date("2026-07-31T13:00:00+03:00");

function updateCountdown() {
  const now = new Date();
  const diff = Math.max(0, weddingDate - now);

  const days = Math.floor(diff / 86400000);
  const hours = Math.floor(diff / 3600000) % 24;
  const minutes = Math.floor(diff / 60000) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Музыка
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");
let isPlaying = false;

musicBtn.addEventListener("click", async () => {
  try {
    if (isPlaying) {
      music.pause();
      musicBtn.textContent = "♫";
      musicBtn.setAttribute("aria-label", "Включить музыку");
    } else {
      await music.play();
      musicBtn.textContent = "❚❚";
      musicBtn.setAttribute("aria-label", "Выключить музыку");
    }

    isPlaying = !isPlaying;
  } catch (error) {
    alert("Нажмите ещё раз, чтобы включить музыку.");
  }
});

// Форма гостей — исправленная версия
const form = document.getElementById("rsvpForm");
const statusEl = document.getElementById("status");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  statusEl.textContent = "Отправляем...";

  try {
    const formData = new FormData(form);

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: formData
    });

    form.reset();
    statusEl.textContent = "Спасибо! Ваш ответ отправлен.";
  } catch (error) {
    console.error(error);
    statusEl.textContent = "Ошибка отправки. Попробуйте позже.";
  }
});

// Анимация блоков
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.16
});

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
