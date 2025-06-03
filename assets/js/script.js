// nav bar manager
const menuIcon = document.getElementById('menu-icon');
const mobileNavbar = document.querySelector('.mobile-navbar');
const mNavLinks = document.querySelectorAll('.mobile-navbar a');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('fa-bars');
    menuIcon.classList.toggle('fa-xmark');
    menuIcon.classList.toggle('open');
    mobileNavbar.classList.toggle('active');

    document.documentElement.classList.toggle('no-scroll');
    document.body.classList.toggle('no-scroll');
});

// close mobile menu when a nav link is clicked
mNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNavbar.classList.remove('active');
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
        menuIcon.classList.remove('open');

        document.documentElement.classList.remove('no-scroll');
        document.body.classList.remove('no-scroll');
    });
});


// highlight current section
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
  let currentSectionId = '';

  sections.forEach(section => {
    // get section position relative to viewport top
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    // scrollY is past this section's top (with some offset)
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active'); // remove active class from all links
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active'); // add active class to current section's link
    }
  });
});


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


const words = ['Game Developer', 'Software Engineer', 'Storyteller'];
const typeSpeed = 100;   // ms per character typing
const deleteSpeed = 50;  // ms per character deleting
const delayBetweenWords = 1500; // pause after full word typed

const element = document.getElementById('typewriter-text');

let wordIndex = 0;
let charIndex = 0;
let typing = true;

function type() {
  const currentWord = words[wordIndex];
  
  if (typing) {
    // type character
    element.textContent = currentWord.slice(0, charIndex + 1);
    charIndex++;
    
    if (charIndex === currentWord.length) {
      // word fully typed, wait and then start deleting
      typing = false;
      setTimeout(type, delayBetweenWords);
    } else {
      setTimeout(type, typeSpeed);
    }
  } else {
    // delete character
    element.textContent = currentWord.slice(0, charIndex - 1);
    charIndex--;
    
    if (charIndex === 0) {
      // word fully deleted, move to next word
      typing = true;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(type, typeSpeed);
    } else {
      setTimeout(type, deleteSpeed);
    }
  }
}

// start the effect
type();
