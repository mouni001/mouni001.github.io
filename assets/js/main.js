/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')


/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillsContent = document.getElementsByClassName('skills__content'),
      skillsHeader = document.querySelectorAll('.skills__header')

function toggleSkills(){
    let itemClass = this.parentNode.className
    
    for(i = 0; i < skillsContent.length; i++){
        skillsContent[i].className = 'skills__content skills__close'
    }
    if(itemClass === 'skills__content skills__close'){
        this.parentNode.className = 'skills__content skills__open'
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})

/*==================== QUALIFICATION & JOURNEY TABS (scoped) ====================*/
function observeTimeline(scope = document) {
  const items = scope.querySelectorAll('.timeline__item:not(.is-visible)');
  if (!items.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((it) => io.observe(it));
}

// 1) Qualification (Experience) container — same behavior as before, but scoped
document.querySelectorAll('.qualification__container').forEach((container) => {
  const tabs = container.querySelectorAll('[data-target]');
  const contents = container.querySelectorAll('[data-content]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = container.querySelector(tab.dataset.target);

      tabs.forEach((t) => t.classList.remove('qualification__active'));
      tab.classList.add('qualification__active');

      contents.forEach((c) => c.classList.remove('qualification__active'));
      target.classList.add('qualification__active');
    });
  });
});

// 2) Journey tabs inside #journey
const journey = document.getElementById('journey');
if (journey) {
  const jTabs = journey.querySelectorAll('.qualification__button[data-target]');
  const jContents = journey.querySelectorAll('.journey__content[data-content]');

  jTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = journey.querySelector(tab.dataset.target);

      // active tab state
      jTabs.forEach((t) => t.classList.remove('qualification__active'));
      tab.classList.add('qualification__active');

      // toggle which panel is visible
      jContents.forEach((c) => c.classList.remove('journey__active'));
      target.classList.add('journey__active');

      // ensure inline display isn't blocking visibility
      target.style.display = '';

      // re-observe timeline items in the newly shown panel so they animate from the sides
      observeTimeline(target);
    });
  });

  // initial observe for the default visible panel
  observeTimeline(journey.querySelector('.journey__content.journey__active') || journey);
}

// Also run once on page load for any timelines visible initially
document.addEventListener('DOMContentLoaded', () => observeTimeline(document));



/*==================== SERVICES MODAL ====================*/
const modalViews = document.querySelectorAll('.services__modal'),
      modalBtns = document.querySelectorAll('.services__button'),
      modalCloses = document.querySelectorAll('.services__modal-close')

let modal = function(modalClick){
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})

/*==================== PORTFOLIO SWIPER  ====================*/
let swiperPortfolio = new Swiper('.portfolio__container', {
    cssMode: true,
    loop: true,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
})

/*==================== TESTIMONIAL ====================*/
let swiperTestimonial = new Swiper('.testimonial__container', {
    loop: true,
    grabCursor: true,
    spaceBetween: 48,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },
    breakpoints: {
        568: {
            slidesPerView: 2,
        },
    }
})


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

document.addEventListener("DOMContentLoaded", () => {
    const githubStarsElements = document.querySelectorAll(".github-stars");

    githubStarsElements.forEach(element => {
        const repo = element.getAttribute("data-repo");
        const starsCountElement = element.querySelector(".stars-count");

        if (repo) {
            fetch(`https://api.github.com/repos/${repo}`)
                .then(response => response.json())
                .then(data => {
                    const starCount = data.stargazers_count || 0;
                    starsCountElement.textContent = starCount;
                })
                .catch(error => {
                    console.error(`Error fetching stars for ${repo}:`, error);
                    starsCountElement.textContent = "N/A";
                });
        } else {
            starsCountElement.textContent = "N/A";
        }
    });
});

/*==================== CHANGE BACKGROUND HEADER ====================*/ 
function scrollHeader(){
    const nav = document.getElementById('header');
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL TOP ====================*/ 
function scrollTop(){
    let scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 200) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/*==================== DARK LIGHT THEME ====================*/ 
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
/* Journey reveal on scroll */
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".timeline__item");
  if (!items.length) {
    console.warn("No timeline items found!");
    return;
  }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        // Optional: stop observing once revealed
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(it => io.observe(it));
});
/*==================== COUNT-UP (animated counters) ====================*/
(function setupCountUp() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  // Accessibility: if user prefers reduced motion, set values immediately
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    counters.forEach(setFinalValue);
    return;
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      // make sure each counter runs once
      if (el.dataset.counted === 'true') { io.unobserve(el); return; }
      el.dataset.counted = 'true';
      animateCount(el);
      io.unobserve(el);
    });
  }, { threshold: 0.35 });

  counters.forEach((el) => io.observe(el));

  function setFinalValue(el) {
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    el.textContent = prefix + formatNumber(target, decimals) + suffix;
  }

  function animateCount(el) {
    el.style.transform = 'scale(1.03)';
    const target = parseFloat(el.getAttribute('data-target') || '0');
    const duration = parseInt(el.getAttribute('data-duration') || '1200', 10); // ms
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';
    const start = performance.now();
    const startVal = 0;
    const endVal = target;
    el.style.transform = '';

    function tick(now) {
    el.style.transform = 'scale(1.03)';
      const progress = Math.min((now - start) / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (endVal - startVal) * eased;
      el.textContent = prefix + formatNumber(current, decimals) + suffix;
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // snap to final (avoids rounding drift)
        el.textContent = prefix + formatNumber(endVal, decimals) + suffix;
      }
    }
    
    requestAnimationFrame(tick);
    el.style.transform = '';
  }

  function formatNumber(num, decimals) {
    const fixed = Number(num).toFixed(decimals);
    // add thousands separators without affecting decimals
    const parts = fixed.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }
})();


