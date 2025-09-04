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
const containers = document.querySelectorAll('.skill-container');

  function restartBar(container) {
    // prevent re-trigger while animating
    if (container.dataset.animating === '1') return;
    container.dataset.animating = '1';

    const span = container.querySelector('.bar span');
    const percentage = container.querySelector('.percentage');

    // remove & force reflow to restart
    span.classList.remove('animate');
    percentage.classList.remove('animate');
    void span.offsetWidth;      // reflow
    void percentage.offsetWidth;

    // add back to start animation
    span.classList.add('animate');
    percentage.classList.add('animate');

    // wait for BOTH to finish before allowing another restart
    let ended = 0;
    const onEnd = () => {
      ended += 1;
      if (ended >= 2) {
        container.dataset.animating = '0';
        span.removeEventListener('animationend', onEnd);
        percentage.removeEventListener('animationend', onEnd);
      }
    };
    span.addEventListener('animationend', onEnd);
    percentage.addEventListener('animationend', onEnd);

    // safety unlock in case animationend doesn't fire
    setTimeout(() => {
      if (container.dataset.animating === '1') {
        container.dataset.animating = '0';
        span.removeEventListener('animationend', onEnd);
        percentage.removeEventListener('animationend', onEnd);
      }
    }, 4000); // animation duration
  }

  // re-animate when it comes into view (but only after previous finished)
  const observerSkills = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        restartBar(entry.target);
      } else {
        // optional: reset so it starts from zero next time
        const span = entry.target.querySelector('.bar span');
        const percentage = entry.target.querySelector('.percentage');
        span.classList.remove('animate');
        percentage.classList.remove('animate');
      }
    });
  }, { threshold: 0.5 });

  containers.forEach(container => {
    observerSkills.observe(container);

    // re-animate on hover, but only if not already running
    container.addEventListener('mouseenter', () => restartBar(container));
  });


// handling circle skills
const dots = 20;  // fixed dots count for all circles
const circles = document.querySelectorAll('.circular-skill');

circles.forEach(elem => {
  const marked = elem.getAttribute('data-percent') || 0;
  const percent = Math.floor(dots * marked / 100);
  const rotate = 360 / dots;
  let points = '';

  for (let i = 0; i < dots; i++) {
    points += `<div class="points" style="--i:${i}; --rot:${rotate}deg"></div>`;
  }

  elem.innerHTML = points;

  // apply permanent marked state
  const pointsMarked = elem.querySelectorAll('.points');
  for (let i = 0; i < percent; i++) {
    pointsMarked[i].classList.add('marked');
  }
});

document.querySelectorAll('.circular-skill').forEach(elem => {
  let animating = false;
  const animationDuration = 0.04 * 20 + 0.1; // match delay * dots + extra

  function animateDots() {
    if (animating) return;
    animating = true;

    const pointsMarked = elem.querySelectorAll('.points.marked');

    pointsMarked.forEach((point, idx) => {
      point.classList.remove('animate');
      void point.offsetWidth; // force reflow
      point.style.setProperty('--delay', `${idx * 0.04}s`); // per-dot delay
      point.classList.add('animate');
    });

    setTimeout(() => { animating = false; }, animationDuration * 1000);
  }

  // intersection observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) animateDots();
    });
  }, { threshold: 0.5 });

  observer.observe(elem);

  // hover
  elem.addEventListener('mouseenter', animateDots);
});


// scroll effect for skills image
$(window).on("scroll", function() {
  var scrollTop = $(window).scrollTop();

  $(".skills-img").each(function() {
    let $container = $(this);
    let containerTop = $container.offset().top;
    let windowHeight = $(window).height();
    let progress = (scrollTop + windowHeight/2 - containerTop) / windowHeight;

    // clamp between 0 and 1
    progress = Math.max(0, Math.min(1, progress));

    // zoom (applied to all images equally)
    let scale = 1 + 0.9 * progress;
    $container.find(".zoom-image").css("transform", "scale(" + scale + ")");

    // image switching with custom thresholds
    let $images = $container.find(".zoom-image");
    $images.removeClass("active");

    if (progress < 0.05) {
      $images.eq(0).addClass("active");  // top image
    } else if (progress < 0.3) {
      $images.eq(1).addClass("active");  // middle image
    } else {
      $images.eq(2).addClass("active");  // bottom image
    }
  });
});


// avatar following cusor
//const avatar = document.getElementById("avatar-follower");
const avatar = document.createElement("div");

let avatarPosX = 0, avatarPosY = 0;
let mousePosX = 0, mousePosY = 0;

let frameCount = 0;
const numberOfFrames = 4;   // number of frames per animation
const frameWidth = 128;     // width of each frame
const frameHeight = 128;    // height of each frame (row spacing in spritesheet)
const avatarSpeed = 10;

 function init() {
  avatar.id = "oneko";
  avatar.ariaHidden = true;
  avatar.style.width = "32px";
  avatar.style.height = "32px";
  avatar.style.position = "fixed";
  avatar.style.pointerEvents = "none";
  avatar.style.imageRendering = "pixelated";
  avatar.style.left = `${nekoPosX - 16}px`;
  avatar.style.top = `${nekoPosY - 16}px`;
  avatar.style.zIndex = 2147483647;

  let avatarFile = "assets/img/avatar_sp.png"

  avatar.style.backgroundImage = `url(${avatarFile})`;

  document.body.appendChild(avatar);

  document.addEventListener("mousemove", function (event) {
    mousePosX = event.clientX;
    mousePosY = event.clientY;
  });

  window.requestAnimationFrame(frame);
}

function idle() {
  setSprite(2, 0);
}

function setSprite(row, frame) {
  avatar.style.backgroundPosition = `-${frame * frameWidth}px -${row * frameHeight}px`;
}

function frame() {
  frameCount += 1;
  const diffX = avatarPosX - mousePosX;
  const diffY = avatarPosY - mousePosY;
  const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

  if (distance < avatarSpeed || distance < 48) {
    idle();
    return;
  }

  let row;
  if (Math.abs(diffX) > Math.abs(diffY)) {
    row = diffX > 0 ? 0 : 1; // 0 = right, 1 = left
  } else {
    row = diffY > 0 ? 2 : 2; // 2 = down, 2 = up
  }

  // animate frame
  const currentFrame = frameCount % numberOfFrames;
  setSprite(row, currentFrame);

  avatarPosX -= (diffX / distance) * avatarSpeed;
  avatarPosY -= (diffY / distance) * avatarSpeed;

  avatarPosX = Math.min(Math.max(frameWidth/2, avatarPosX), window.innerWidth - frameWidth/2);
  avatarPosY = Math.min(Math.max(frameHeight/2, avatarPosY), window.innerHeight - frameHeight/2);

  avatar.style.left = `${avatarPosX - frameWidth/2}px`;
  avatar.style.top = `${avatarPosY - frameHeight/2}px`;

  window.requestAnimationFrame(frame);
} init();
