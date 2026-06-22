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

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

const activatePage = function (name) {
  for (let i = 0; i < pages.length; i++) {
    pages[i].classList.toggle("active", name === pages[i].dataset.page);
  }
  for (let i = 0; i < navigationLinks.length; i++) {
    const isActive = name === navigationLinks[i].innerHTML.toLowerCase();
    navigationLinks[i].classList.toggle("active", isActive);
    if (isActive) {
      navigationLinks[i].setAttribute("aria-current", "page");
    } else {
      navigationLinks[i].removeAttribute("aria-current");
    }
  }
};

// activate tab from URL hash on load (e.g. index.html#blog); ignore unknown hashes
const hash = window.location.hash.slice(1);
const isKnownPage = Array.from(pages).some((page) => page.dataset.page === hash);
if (hash && isKnownPage) {
  activatePage(hash);
  window.scrollTo(0, 0);
}

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const name = this.innerHTML.toLowerCase();
    activatePage(name);
    history.replaceState(null, "", "#" + name);
    window.scrollTo(0, 0);
  });
}

