"use strict";

// element toggle function
const elementToggleFunc = function (elem) {
  elem.classList.toggle("active");
};

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
});

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalDate = document.querySelector("[data-modal-date]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
};

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalDate.dateTime = this.querySelector(
      "[data-testimonials-date]",
    ).dateTime;
    modalDate.innerHTML = this.querySelector(
      "[data-testimonials-date]",
    ).innerHTML;
    modalTitle.innerHTML = this.querySelector(
      "[data-testimonials-title]",
    ).innerHTML;
    modalText.innerHTML = this.querySelector(
      "[data-testimonials-text]",
    ).innerHTML;

    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = function (name) {
  for (let i = 0; i < pages.length; i++) {
    if (name === pages[i].dataset.page) {
      pages[i].classList.add("active");
      navigationLinks[i].classList.add("active");
    } else {
      pages[i].classList.remove("active");
      navigationLinks[i].classList.remove("active");
    }
  }
};

// activate tab from URL hash on load (e.g. index.html#blog)
const hash = window.location.hash.slice(1);
if (hash) activatePage(hash);

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    activatePage(this.innerHTML.toLowerCase());
    window.scrollTo(0, 0);
  });
}

