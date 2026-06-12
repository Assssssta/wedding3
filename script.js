/* =====================================
   ЕКАТЕРИНА & ДАНИЛ
   script.js
   ===================================== */

/* =====================================
   ДАТА СВАДЬБЫ
   ===================================== */

const weddingDate = new Date("2026-06-20T13:00:00+03:00");

/* =====================================
   ЭЛЕМЕНТЫ
   ===================================== */

const welcomeScreen = document.getElementById("welcomeScreen");
const siteContent = document.getElementById("siteContent");

const openInviteBtn = document.getElementById("openInviteBtn");

const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

const rsvpForm = document.getElementById("rsvpForm");
const statusEl = document.getElementById("status");

/* =====================================
   СОСТОЯНИЕ МУЗЫКИ
   ===================================== */

let musicPlaying = false;

/* =====================================
   ОТКРЫТИЕ КОНВЕРТА
   ===================================== */

openInviteBtn.addEventListener("click", async () => {

  welcomeScreen.classList.add("opening");

  setTimeout(() => {

    welcomeScreen.style.display = "none";

    siteContent.classList.remove("hidden");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }, 900);

  try {

    await bgMusic.play();

    musicPlaying = true;

    musicBtn.textContent = "❚❚";

  } catch (err) {

    console.log("Автовоспроизведение заблокировано браузером");

  }

});

/* =====================================
   КНОПКА МУЗЫКИ
   ===================================== */

musicBtn.addEventListener("click", async () => {

  try {

    if (musicPlaying) {

      bgMusic.pause();

      musicPlaying = false;

      musicBtn.textContent = "♫";

    } else {

      await bgMusic.play();

      musicPlaying = true;

      musicBtn.textContent = "❚❚";

    }

  } catch (err) {

    console.log(err);

  }

});

/* =====================================
   ТАЙМЕР
   ===================================== */

function updateCountdown() {

  const now = new Date();

  const difference = weddingDate - now;

  if (difference <= 0) {

    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";

    return;

  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  document.getElementById("days").textContent = days;
  document.getElementById("hours").textContent = hours;
  document.getElementById("minutes").textContent = minutes;
  document.getElementById("seconds").textContent = seconds;

}

updateCountdown();

setInterval(updateCountdown, 1000);

/* =====================================
   АНИМАЦИЯ ПОЯВЛЕНИЯ БЛОКОВ
   ===================================== */

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach((entry) => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

      }

    });

  },
  {
    threshold: 0.15
  }
);

document
  .querySelectorAll(".reveal")
  .forEach((el) => observer.observe(el));

/* =====================================
   ОТПРАВКА RSVP
   ===================================== */

if (rsvpForm) {

  rsvpForm.addEventListener("submit", () => {

    statusEl.textContent = "Отправляем ответ...";

    setTimeout(() => {

      statusEl.textContent =
        "Спасибо! Ваш ответ успешно отправлен ❤️";

      rsvpForm.reset();

    }, 1500);

  });

}

/* =====================================
   ПЛАВНОЕ ПОЯВЛЕНИЕ HERO
   ===================================== */

window.addEventListener("load", () => {

  document.body.classList.add("loaded");

});

/* =====================================
   ПАРАЛЛАКС ФОТО
   ===================================== */

window.addEventListener("scroll", () => {

  const hero = document.querySelector(".hero");

  if (!hero) return;

  const offset = window.pageYOffset;

  hero.style.backgroundPositionY =
    offset * 0.4 + "px";

});

/* =====================================
   ПЛАВНЫЙ СКРОЛЛ
   ===================================== */

document
  .querySelectorAll('a[href^="#"]')
  .forEach(anchor => {

    anchor.addEventListener("click", function (e) {

      e.preventDefault();

      const target = document.querySelector(
        this.getAttribute("href")
      );

      if (!target) return;

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

/* =====================================
   ЛЕПЕСТКИ (ОПЦИОНАЛЬНО)
   ===================================== */

// Если захотите добавить падающие лепестки,
// позже можно подключить отдельный petals.js

/* =====================================
   ГОТОВО
   ===================================== */

console.log(
  "Wedding Invite Loaded ❤️"
);