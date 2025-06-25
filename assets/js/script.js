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
    const rect = section.getBoundingClientRect();
    const offset = window.innerHeight / 2; // Middle of screen

    if (rect.top <= offset && rect.bottom >= offset) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
});


// invisible header for home section
const header = document.querySelector('header');
const home = document.querySelector('.home');

const observerHeader = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      header.classList.remove('visible');
    } else {
      header.classList.add('visible');
    }
  },
  { threshold: 0.1 }
);

observerHeader.observe(home);


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


// typewriter effect
const words = ['Game Developer', 'Software Engineer', 'Graphic Designer', 'Storyteller'];
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

type();


// timeline animation
(function ($) {
  $(function () {
    $(window).on('scroll', function () {
      fnOnScroll();
    });

    $(window).on('resize', function () {
      fnOnResize();
    });

    var agTimeline = $('.js-timeline'),
      agTimelineLine = $('.js-timeline_line'),
      agTimelineLineProgress = $('.js-timeline_line-progress'),
      agTimelinePoint = $('.js-timeline-card_point-box'),
      agTimelineItem = $('.js-timeline_item'),
      agOuterHeight = $(window).outerHeight(),
      agHeight = $(window).height(),
      f = -1,
      agFlag = false;

    function fnOnScroll() {
      agPosY = $(window).scrollTop();

      fnUpdateFrame();
    }

    function fnOnResize() {
      agPosY = $(window).scrollTop();
      agHeight = $(window).height();

      fnUpdateFrame();
    }

    function fnUpdateWindow() {
      agFlag = false;

      agTimelineLine.css({
        top: agTimelineItem.first().find(agTimelinePoint).offset().top - agTimelineItem.first().offset().top,
        bottom: agTimeline.offset().top + agTimeline.outerHeight() - agTimelineItem.last().find(agTimelinePoint).offset().top
      });

      f !== agPosY && (f = agPosY, agHeight, fnUpdateProgress());
    }

    function fnUpdateProgress() {
      var agTop = agTimelineItem.last().find(agTimelinePoint).offset().top;

      i = agTop + agPosY - $(window).scrollTop();
      a = agTimelineLineProgress.offset().top + agPosY - $(window).scrollTop();
      n = agPosY - a + agOuterHeight / 2;
      i <= agPosY + agOuterHeight / 2 && (n = i - a);
      agTimelineLineProgress.css({height: n + "px"});

      agTimelineItem.each(function () {
        var agTop = $(this).find(agTimelinePoint).offset().top;

        (agTop + agPosY - $(window).scrollTop()) < agPosY + .5 * agOuterHeight ? $(this).addClass('js-ag-active') : $(this).removeClass('js-ag-active');
      })
    }

    function fnUpdateFrame() {
      agFlag || requestAnimationFrame(fnUpdateWindow);
      agFlag = true;
    }


  });
})

(jQuery);


// skill bar animation
const observerSkills = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const spans = entry.target.querySelectorAll('.bar span');
      const percentages = entry.target.querySelectorAll('.percentage');
      spans.forEach(span => span.classList.add('animate'));
      percentages.forEach(perc => perc.classList.add('animate'));
    }
  });
});

// observe each skill container
document.querySelectorAll('.skill-container').forEach(container => {
  observerSkills.observe(container);

  container.addEventListener('mouseenter', () => {
    const span = container.querySelector('.bar span');
    const percentage = container.querySelector('.percentage');

    // remove and re-trigger animation
    span.classList.remove('animate');
    percentage.classList.remove('animate');

    // force reflow
    void span.offsetWidth;
    void percentage.offsetWidth;

    // add again
    span.classList.add('animate');
    percentage.classList.add('animate');
  });
});


// language skills handling
const circularSkills = document.querySelectorAll('.circular-skill');

function createDots(container, percentage) {
  const svg = container.querySelector('svg');
  svg.innerHTML = ''; // Clear any existing dots

  const totalDots = 30;
  const activeDots = Math.round(totalDots * (percentage / 100));
  const radius = 50;
  const center = 60;

  for (let i = 0; i < totalDots; i++) {
    const angle = (i / totalDots) * (2 * Math.PI);
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);

    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', 3);
    circle.setAttribute('fill', i < activeDots ? 'var(--main-color)' : '#ccc');
    circle.setAttribute('opacity', '0');
    circle.style.transition = `opacity 0.3s ease ${i * 0.02}s`;

    svg.appendChild(circle);
  }
}

function animateDots(container) {
  const circles = container.querySelectorAll('circle');
  circles.forEach(c => c.style.opacity = '1');
}

function resetDots(container) {
  const circles = container.querySelectorAll('circle');
  circles.forEach(c => c.style.opacity = '0');
}

// Intersection Observer logic
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const container = entry.target;
    if (entry.isIntersecting) {
      const percentage = parseInt(container.dataset.percentage, 10);
      createDots(container, percentage);
      animateDots(container);
    } else {
      resetDots(container);
    }
  });
}, { threshold: 0.6 });

circularSkills.forEach(skill => {
  observer.observe(skill);

  // Hover logic to re-trigger animation
  skill.addEventListener('mouseenter', () => {
    resetDots(skill);
    setTimeout(() => {
      animateDots(skill);
    }, 10);
  });
});
