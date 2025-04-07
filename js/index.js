// Импорт из файла контента

import { Anime, Manga, Japan, Top } from "./Content.js";

// Для запуска видео/////////////////////////////////////////////////////////////

const myAudioH = document.getElementById("audioH");
const audioClick = document.querySelector(".audio");
const video = document.getElementById("video");
const imgTyanLeftHentai = document.querySelector(".imgTyanLeftHentai");
const imgTyanRightHentai = document.querySelector(".imgTyanRightHentai");
let enableClicks;

imgTyanLeftHentai.addEventListener("click", function () {
  myAudioH.volume = 0.5;
  myAudioH.play();
  const currentCount = (Number(localStorage.getItem("keyEnterLeft")) || 0) + 1;
  localStorage.setItem("keyEnterLeft", currentCount);
  if (currentCount === 1) {
    imgTyanLeftHentai.style.opacity = "0";
    setTimeout(() => {
      imgTyanLeftHentai.style.display = "none";
    }, 1000);
    setTimeout(() => {
      video.style.display = "flex";
      video.style.opacity = "1";
      enableClicks = disableClicks();
      video.play().then(() => {
        console.log("Video started");
        localStorage.setItem("keyEnterLeft", 0);
      });
      video.addEventListener(
        "ended",
        () => {
          if (typeof enableClicks === "function") {
            enableClicks();
            enableClicks = null;
          }
          containerGrayEnd();
          video.style.display = "none";
          video.style.opacity = "0";
        },
        { once: true }
      );
    }, 2000);
  }
});
imgTyanRightHentai.addEventListener("click", function () {
  myAudioH.volume = 0.5;
  myAudioH.play();
  const currentCount = (Number(localStorage.getItem("keyEnterRight")) || 0) + 1;
  localStorage.setItem("keyEnterRight", currentCount);
  if (currentCount === 1) {
    imgTyanRightHentai.style.opacity = "0";
    setTimeout(() => {
      imgTyanRightHentai.style.display = "none";
    }, 1000);
    setTimeout(() => {
      video.style.display = "flex";
      video.style.opacity = "1";
      enableClicks = disableClicks();
      video.play().then(() => {
        console.log("Video started");
        localStorage.setItem("keyEnterRight", 0);
      });
      video.addEventListener(
        "ended",
        () => {
          if (typeof enableClicks === "function") {
            enableClicks();
            enableClicks = null;
          }
          containerGrayEnd();
          video.style.display = "none";
          video.style.opacity = "0";
        },
        { once: true }
      );
    }, 2000);
  }
});

// Функция блокировки кликов
function disableClicks() {
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.stopImmediatePropagation();
    return false;
  };
  // Блокируем события
  document.addEventListener("click", handler, true);
  document.addEventListener("mousedown", handler, true);
  document.addEventListener("mouseup", handler, true);
  document.addEventListener("contextmenu", handler, true);
  // Возвращаем функцию для разблокировки
  return () => {
    document.removeEventListener("click", handler, true);
    document.removeEventListener("mousedown", handler, true);
    document.removeEventListener("mouseup", handler, true);
    document.removeEventListener("contextmenu", handler, true);
  };
}

// Для запуска видео end/////////////////////////////////////////////////////////

// Для запуска музыки при клике //////////////////////////////////////////////
const myAudio = document.getElementById("audio");
const playMusic = document.querySelector(".PlayMusic");
const audioStop = document.querySelector(".StopPlayMusic");
// const volumeControl = document.getElementById("volumeControl");

// volumeControl.addEventListener("input", function () {
//   myAudio.volume = this.value;
// });
// myAudio.volume = volumeControl.value;

const volumeControl = document.getElementById("volumeControl");

// Убедимся, что аудио воспроизводится только после пользовательского взаимодействия
document.addEventListener(
  "click",
  () => {
    myAudio.play(); // Только один раз, если надо
  },
  { once: true }
);

volumeControl.addEventListener("input", function () {
  // Эта строка может быть проигнорирована на iOS, если нет активного воспроизведения
  myAudio.volume = parseFloat(this.value);
});

myAudio.volume = parseFloat(volumeControl.value);

playMusic.addEventListener("click", function () {
  myAudio.play();
  playMusic.style.display = "none";
  audioStop.style.display = "flex";
  myAudio.addEventListener("ended", function () {
    playMusic.style.display = "flex";
    audioStop.style.display = "none";
  });
});
audioStop.addEventListener("click", function () {
  myAudio.pause();
  playMusic.style.display = "flex";
  audioStop.style.display = "none";
});

// Для запуска музыки при клике end/////////////////////////////////////////

// JS Header/////////////////////////////////////////////////////////////////////

const navAnime = document.querySelector(".navAnime");
const navManga = document.querySelector(".navManga");
const navJapan = document.querySelector(".navJapan");
const navTop = document.querySelector(".navTop");
const navElement = document.querySelectorAll(".navElement");

function removeClaslist() {
  navElement.forEach(function (navRise) {
    navRise.classList.remove("rise");
  });
}

navAnime.addEventListener("click", function () {
  Anime();
  restartSlider();
  removeClaslist();
  navAnime.classList.add("rise");
});
navManga.addEventListener("click", function () {
  Manga();
  restartSlider();
  removeClaslist();
  navManga.classList.add("rise");
});

navJapan.addEventListener("click", function () {
  Japan();
  restartSlider();
  removeClaslist();
  navJapan.classList.add("rise");
});
navTop.addEventListener("click", function () {
  Top();
  restartSlider();
  removeClaslist();
  navTop.classList.add("rise");
});

// End Js Header////////////////////////////////////////////////////////////

// SliderList///////////////////////////////////////////////////////////////

function restartSlider() {
  const textContainer = document.querySelector(".textContainer");
  const sliderContainer = document.querySelector(".slider");
  const slides = document.querySelectorAll(".slide");
  const totalSlides = slides.length;
  const nextButton = document.querySelector(".sliderBtnNext");
  const prevButton = document.querySelector(".sliderBtnPrev");
  const sliderHead = document.querySelector(".sliderHead");
  const totalText = slides.length;
  let currentIndex = 0;

  function updateSliderPosition() {
    sliderHead.style.transition = "transform 0.5s ease-in-out";
    sliderHead.style.transform = `translateX(-${currentIndex * 100}%)`;
    sliderContainer.style.transition = "transform 0.5s ease-in-out";
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  function nextSlide() {
    if (currentIndex >= totalSlides - 1 && currentIndex >= totalText - 1) {
      sliderHead.style.transition = "none";
      sliderHead.style.transform = `translateX(0)`;

      sliderContainer.style.transition = "none";
      sliderContainer.style.transform = `translateX(0)`;

      currentIndex = 1;

      setTimeout(() => {
        sliderContainer.style.transition = "transform 0.5s ease-in-out";
        sliderHead.style.transition = "transform 0.5s ease-in-out";

        updateSliderPosition();
      }, 50);
    } else {
      currentIndex++;
      updateSliderPosition();
    }
    toggleButtons(false);
    setTimeout(() => {
      toggleButtons(true);
    }, 600);
  }

  function prevSlide() {
    if (currentIndex === 0) {
      if (textContainer.classList.contains("TopAnime")) {
        currentIndex = totalSlides - 1;

        sliderHead.style.transition = "none";
        sliderHead.style.transform = `translateX(-${currentIndex * 100}%)`;

        sliderContainer.style.transition = "none";
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        currentIndex = 5;

        setTimeout(() => {
          sliderHead.style.transition = "transform 0.5s ease-in-out";

          sliderContainer.style.transition = "transform 0.5s ease-in-out";

          updateSliderPosition();
        }, 50);
      } else {
        currentIndex = totalSlides - 1;

        sliderHead.style.transition = "none";
        sliderHead.style.transform = `translateX(-${currentIndex * 100}%)`;

        sliderContainer.style.transition = "none";
        sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

        currentIndex = 3;

        setTimeout(() => {
          sliderHead.style.transition = "transform 0.5s ease-in-out";

          sliderContainer.style.transition = "transform 0.5s ease-in-out";

          updateSliderPosition();
        }, 50);
      }
    } else {
      currentIndex--;
      updateSliderPosition();
    }
    toggleButtons(false);
    setTimeout(() => {
      toggleButtons(true);
    }, 600);
  }
  function toggleButtons(state) {
    const nextButton = document.querySelector(".sliderBtnNext");
    const prevButton = document.querySelector(".sliderBtnPrev");

    nextButton.disabled = !state;
    prevButton.disabled = !state;
  }

  if (nextButton && prevButton) {
    nextButton.addEventListener("click", nextSlide);
    prevButton.addEventListener("click", prevSlide);
  }
}
restartSlider();

// SliderList end////////////////////////////////////////////////

// Tyan Click start//////////////////////////////////////////////

const BtnTyanLeft = document.querySelector(".btnTyanLeft");
const BtnTyanRight = document.querySelector(".btnTyanRight");
const ContainerGray = document.querySelector(".ContainerGray");
const imgTyanLeft = document.querySelector(".imgTyanLeft");
const imgTyanRight = document.querySelector(".imgTyanRight");

BtnTyanLeft.addEventListener("click", function () {
  BtnTyanLeft.classList.add("active");
  if (BtnTyanLeft.classList.contains("active")) {
    BtnTyanLeft.style.opacity = "0";
    BtnTyanLeft.style.display = "none";
    BtnTyanRight.style.opacity = "0";
    BtnTyanRight.style.display = "none";
    ContainerGray.style.display = "flex";
    imgTyanLeft.style.display = "flex";
    setTimeout(() => {
      imgTyanLeft.style.opacity = "1";
    }, 10);
  }
});
imgTyanLeft.addEventListener("click", function () {
  imgTyanLeft.style.opacity = "0";
  imgTyanLeft.style.display = "none";
  imgTyanLeftHentai.style.display = "flex";
  setTimeout(() => {
    imgTyanLeftHentai.style.opacity = "1";
  }, 10);
});

BtnTyanRight.addEventListener("click", function () {
  BtnTyanRight.classList.add("active");
  if (BtnTyanRight.classList.contains("active")) {
    BtnTyanLeft.style.opacity = "0";
    BtnTyanLeft.style.display = "none";
    BtnTyanRight.style.opacity = "0";
    BtnTyanRight.style.display = "none";
    ContainerGray.style.display = "flex";
    imgTyanRight.style.display = "flex";
    setTimeout(() => {
      imgTyanRight.style.opacity = "1";
    }, 10);
  }
});
imgTyanRight.addEventListener("click", function () {
  imgTyanRight.style.opacity = "0";
  imgTyanRight.style.display = "none";
  imgTyanRightHentai.style.display = "flex";
  setTimeout(() => {
    imgTyanRightHentai.style.opacity = "1";
  }, 10);
});

ContainerGray.addEventListener("click", function () {
  containerGrayEnd();
});

function containerGrayEnd() {
  setTimeout(() => {
    ContainerGray.style.display = "none";
  }, 1000);
  BtnTyanLeft.classList.remove("active");
  BtnTyanRight.classList.remove("active");
  imgTyanLeft.style.opacity = "0";
  setTimeout(() => {
    imgTyanLeft.style.display = "none";
  }, 1000);
  imgTyanLeftHentai.style.opacity = "0";
  setTimeout(() => {
    imgTyanLeftHentai.style.display = "none";
  }, 1000);
  BtnTyanLeft.style.display = "flex";
  setTimeout(() => {
    BtnTyanLeft.style.opacity = "1";
  }, 1000);
  imgTyanRight.style.opacity = "0";
  setTimeout(() => {
    imgTyanRight.style.display = "none";
  }, 1000);
  imgTyanRightHentai.style.opacity = "0";
  setTimeout(() => {
    imgTyanRightHentai.style.display = "none";
  }, 1000);
  BtnTyanRight.style.display = "flex";
  setTimeout(() => {
    BtnTyanRight.style.opacity = "1";
  }, 1000);
  ContainerGray.addEventListener("click", containerGrayEnd);
  localStorage.setItem("keyEnterLeft", 0);
  localStorage.setItem("keyEnterRight", 0);
}
// Tyan Click end/////////////////////////////////////
