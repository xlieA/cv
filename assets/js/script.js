// nav bar manager
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark')
    navbar.classList.toggle('active');
}

// invisible header for home section
const header = document.querySelector('header');
const home = document.querySelector('.home');

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove('visible');
    } else {
      header.classList.add('visible');
    }
  },
  { threshold: 0.1 }
);

observer.observe(home);



// move home section images
let mountain_back = document.getElementById("mountain_back");
let mountain_moon = document.getElementById("mountain_moon");
let mountain_middle = document.getElementById("mountain_middle");
let mountain_front = document.getElementById("mountain_front");
let greeting = document.getElementById("greeting");

window.addEventListener('scroll', function() {
    var value = window.scrollY;

    mountain_back.style.top = -value * 0.5 + 'px';
    mountain_moon.style.left = -value * 0.9 + 'px';
    mountain_moon.style.top = -value * 0.3 + 'px';
    mountain_middle.style.top = -value * 0.15 + 'px';
    mountain_front.style.top = value * 0.15 + 'px';
    greeting.style.top = value * 1 + 'px';
})
