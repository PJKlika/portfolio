// I used AI to help me with script below//

console.log('Scroll.js loaded successfully!');

(() => {
  window.addEventListener('load', function() {
    console.log('Page loaded, initializing parallax...');
    
    const heroSection = document.getElementById('hero');
    const aboutSection = document.getElementById('about');
    const heroImageContainer = document.querySelector('.hero-image');
    const aboutImageContainer = document.querySelector('#about .section-image');
    
    if (!heroImageContainer || !aboutImageContainer) {
      console.error('Missing elements for parallax effect!');
      return;
    }
    
    const mugshotImg = heroImageContainer.querySelector('img');
    if (!mugshotImg) {
      console.error('Mugshot image not found!');
      return;
    }
    
    console.log('Mugshot found - elevator parallax ready!');
    
    let ticking = false;
    
    function updateParallax() {
      const scrollY = window.scrollY;
      const heroTop = heroSection.offsetTop;
      const aboutTop = aboutSection.offsetTop;
      const totalJourney = aboutTop - heroTop;
      const journeyProgress = Math.min(Math.max((scrollY - heroTop) / totalJourney, 0), 1);

      if (journeyProgress < 0.3) {
        if (mugshotImg.parentElement !== heroImageContainer) {
          heroImageContainer.appendChild(mugshotImg);
          console.log('Image in hero frame');
        }
        mugshotImg.style.position = 'absolute';
        mugshotImg.style.left = '0';
        mugshotImg.style.width = '100%';
        mugshotImg.style.height = '100%';

        const heroSlide = (journeyProgress / 0.3) * 200; 
        mugshotImg.style.top = heroSlide + '%';
      } else {
        if (mugshotImg.parentElement !== aboutImageContainer) {
          aboutImageContainer.appendChild(mugshotImg);
          console.log('Image entered about frame from top');
        }
        mugshotImg.style.position = 'absolute';
        mugshotImg.style.left = '0';
        mugshotImg.style.width = '100%';
        mugshotImg.style.height = '100%';

        const aboutProgress = (journeyProgress - 0.3) / 0.7;
        const aboutSlide = -100 + (aboutProgress * 100);
        mugshotImg.style.top = Math.min(aboutSlide, 0) + '%';

        if (aboutSlide >= -10) { 
          aboutImageContainer.classList.add('glasses-visible');
        } else {
          aboutImageContainer.classList.remove('glasses-visible');
        }
      }
      ticking = false;
    }
    
    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    window.addEventListener('resize', requestTick, { passive: true });
    
    updateParallax();
    console.log('Elevator parallax initialized!');
  });
  

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce) return;

  const heroText = document.querySelector('.hero-text');

  function animateHero() {
    const heroSection = document.getElementById('hero');
    if (!heroSection || !heroText) return;
    
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.max(0, Math.min(1, -rect.top / window.innerHeight));
    
    const textOpacity = 1 - (progress * 1.5);
    const textTranslate = progress * 30;
    heroText.style.transform = `translateY(-${textTranslate}px)`;
    heroText.style.opacity = Math.max(0, textOpacity);
  }

  const sections = document.querySelectorAll('.full-section');
  const navLinks = document.querySelectorAll('.primary-nav a');
  
  function updateActiveNav() {
    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  const header = document.getElementById('site-header');
  
  function updateHeader() {
    const scrolled = window.pageYOffset;
    
    if (scrolled > 100) {
      header.style.background = 'rgba(0, 0, 0, 0.9)';
      header.style.borderBottom = '1px solid rgba(255, 255, 255, 0.1)';
    } else {
      header.style.background = 'color-mix(in srgb, #000 70%, transparent)';
      header.style.borderBottom = '1px solid var(--line)';
    }
  }

  let ticking = false;

  function onScroll() {
    animateHero();
    updateActiveNav();
    updateHeader();
    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });

  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');
      
      console.log('Form submitted:', { name, email, message });
      
      const button = this.querySelector('button[type="submit"]');
      const originalText = button.textContent;
      button.textContent = '✓ Message Sent!';
      button.style.background = '#34c759';
      
      setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
      }, 3000);
      
      this.reset();
    });
  }

  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  let currentSlide = 0;
  const slideInterval = 4000;

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[index]) {
      slides[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }
    
    currentSlide = index;
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  let slideshowTimer;
  if (slides.length > 0) {
    showSlide(0);
    slideshowTimer = setInterval(nextSlide, slideInterval);
  }

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      showSlide(index);
      clearInterval(slideshowTimer);
      slideshowTimer = setInterval(nextSlide, slideInterval);
    });
  });

  const slideshowContainer = document.querySelector('.project-slideshow');
  if (slideshowContainer) {
    slideshowContainer.addEventListener('mouseenter', () => {
      clearInterval(slideshowTimer);
    });

    slideshowContainer.addEventListener('mouseleave', () => {
      slideshowTimer = setInterval(nextSlide, slideInterval);
    });
  }

  // ------------------------------
  // UPDATED: controlled smooth scroll for in-page links
  // ------------------------------
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const SCROLL_DURATION = 1400; // ms — increase for slower (e.g., 1600–1800)
  const HEADER_OFFSET = header?.offsetHeight || 0;
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);

  function smoothScrollToY(targetY, duration = SCROLL_DURATION, offset = HEADER_OFFSET) {
    if (prefersReduced) { window.scrollTo(0, targetY - offset); return; }
    const startY = window.scrollY;
    const dist = (targetY - offset) - startY;
    const startT = performance.now();
    function step(now) {
      const t = Math.min(1, (now - startT) / duration);
      window.scrollTo(0, startY + dist * easeOutCubic(t));
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Make nav links (#projects, #about, #resume, #contact) scroll slowly
  document.querySelectorAll('.primary-nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.querySelector(hash);
      if (!target) return;
      e.preventDefault();
      smoothScrollToY(target.offsetTop);
      history.pushState(null, '', hash); // optional keep-hash
    });
  });

  // Back to top uses the same controlled scroll
  const backToTopLinks = document.querySelectorAll('a[href="#top"]');
  backToTopLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      smoothScrollToY(0);
    });
  });

// Arrow click: land at ABOUT section top so the mugshot fully fits the frame
const scrollArrow = document.querySelector('.scroll-arrow');
if (scrollArrow) {
  scrollArrow.addEventListener('click', function (e) {
    e.preventDefault();

    const aboutSection = document.getElementById('about');
    if (!aboutSection) return;

    // Exact Y for the About section (NOT adjusted by header on purpose)
    const targetY = aboutSection.offsetTop;

    // Small extra push so the whole image is comfortably inside the frame.
    // NOTE: smoothScrollToY subtracts the "offset", so a NEGATIVE value scrolls a little farther.
    const EXTRA_PUSH = -12; // increase in steps of -16/-24 if you still see a sliver

    // Important: pass offset = 0 (or a small NEGATIVE) so we actually reach/aboutTop+extra
    smoothScrollToY(targetY, SCROLL_DURATION, EXTRA_PUSH);
  });
}


  // ------------------------------

  const filterButtons = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.category;
      
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

})();

const style = document.createElement('style');
style.textContent = `
  .primary-nav a.active {
    color: var(--text);
    position: relative;
  }
  
  .primary-nav a.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -8px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px;
  }
  
  .hero-image img,
  #about .section-image img {
    transition: top 0.1s linear;
  }
`;
document.head.appendChild(style);
