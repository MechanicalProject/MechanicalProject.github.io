'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;

document.addEventListener('scroll', () => {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition > navbarHeight) {
    navbar.classList.add('navbar--dark');
  } else {
    navbar.classList.remove('navbar--dark');
  }
});

// Handle scrolling when tapping on the navbar menu
function scrollToLink(event) {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  const option = { behavior: 'smooth', block: 'start' };
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView(option);
}

const menus = document.querySelector('.navbar__menu');
menus.addEventListener('click', (event) => {
  menus.classList.add('close');
  scrollToLink(event);
});

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  menus.classList.toggle('close');
});

// Handle click on "Contact Me" button on home
const contactMeBtn = document.querySelector('.home__contact');
contactMeBtn.addEventListener('click', (event) => scrollToLink(event));

// Make home slowly fade to transparent as the window scrolls down
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  home.style.opacity = 1 - scrollPosition / homeHeight;
});

//Show "arrow up" button when scrolling down
const arrowBtn = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;
  if (scrollPosition < homeHeight / 2) {
    arrowBtn.classList.remove('visible');
  } else {
    arrowBtn.classList.add('visible');
  }
});
// Handle click one the "arrow up" button
arrowBtn.addEventListener('click', (event) => {
  scrollToLink(event);
});

const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
workBtnContainer.addEventListener('click', (e) => {
  const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }
  // Remove selection from the previous item and select the new one
  const active = document.querySelector('.category__btn.active');
  const target =
    e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode;
  active.classList.remove('active');
  target.classList.add('active');

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    filterProjectView(filter);
    projectContainer.classList.remove('anim-out');
  }, 300);
});

function filterProjectView(type) {
  const projectsNum = projectContainer.children.length;
  for (let i = 0; i < projectsNum; i++) {
    const child = projectContainer.children[i];
    if (type === '*' || child.dataset.type === type) {
      child.classList.remove('invisible');
    } else {
      child.classList.add('invisible');
    }
  }
}
