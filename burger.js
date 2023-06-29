"use strict"

const burger = document.querySelector('.main__burger');
const nav = document.querySelector('.nav');
const navExit = document.querySelector('.nav__exit');
const opacity = document.querySelector('.nav__opacity');
const navLinks = document.querySelectorAll('.nav__link');

burger.addEventListener('click', () => {
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
});

navExit.addEventListener('click', () => {
	nav.classList.remove('active');
    document.body.style.overflow = 'visible';
});

opacity.addEventListener('click', () => {
	nav.classList.remove('active');
    document.body.style.overflow = 'visible';
});

navLinks.forEach((item) => {
    item.addEventListener('click', () => {
			nav.classList.remove('active');
        document.body.style.overflow = 'visible';
    });
});
