"use strict";

var w = window.innerWidth;
if (w > 1050) {
  alert(
    "14 inch screen plus users please zoom in (By clicking ctrl and +) your browser window till fits your screen for better experiance"
  );
}

const btnScrollTo = document.querySelector(".section1_btn");
const section2 = document.querySelector("#section2");

btnScrollTo.addEventListener("click", function (e) {
  section2.scrollIntoView({
    behavior: "smooth",
  });
});

// Implementing smooth scrolling
document.querySelector(".nav_links").addEventListener("click", function (e) {
  e.preventDefault();

  //Matching Stratergy
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

// smooth scrolling for bottom btn
const btnScrollUp = document.querySelector(".btn_up");
const section1 = document.querySelector(".section1");

btnScrollUp.addEventListener("click", function (e) {
  section1.scrollIntoView({
    behavior: "smooth",
  });
});

//Implementation of Sticky Navigation
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
    btnScrollUp.classList.remove("hide_btn");
  } else {
    nav.classList.remove("sticky");
    btnScrollUp.classList.add("hide_btn");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveealing elements on scroll
const allSections = document.querySelectorAll(".section");
const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Implementing slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;

const creatDots = function () {
  slides.forEach(function (s, i) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};

creatDots();

const activateDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activateDot(0);
const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};

goToSlide(0);

//Next slide
const nextSlide = function () {
  if (curSlide === maxSlide - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activateDot(curSlide);
};

const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = maxSlide - 1;
  } else {
    curSlide--;
  }
  goToSlide(curSlide);
  activateDot(curSlide);
};

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

// Also working with button events
document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key == "ArrowRight") {
    nextSlide();
  }
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const { slide } = e.target.dataset;
    goToSlide(slide);
    activateDot(slide);
  }
});

//////////////////////////////////////////////////
//// Dates

// Changing year according to date
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
const yearSec = document.querySelector(".year");
const dateSec = document.querySelector(".date");
const monthSec = document.querySelector(".month");

const now = new Date();
const year = now.getFullYear();
const month = months[now.getMonth()];
const date = now.getDate();
let hour = now.getHours();
let minute = now.getMinutes();






if (hour < 10) {
  hour = "0" + hour;
}
if (minute < 10) {
  minute = "0" + minute;
}

const Time = hour + ":" + minute;
yearSec.textContent = year + "";
dateSec.textContent = date + "";
monthSec.textContent = month + " " + Time;
