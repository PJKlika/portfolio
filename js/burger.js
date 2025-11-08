// /js/burger.js
(function () {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('#site-nav');
    const header = document.querySelector('#site-header');
  
    if (!toggle || !nav) return;
  
    // Ensure correct initial state based on viewport
    const mq = window.matchMedia('(max-width: 1024px)');
    function setInitial() {
      if (mq.matches) {
        nav.hidden = true;
        nav.dataset.open = 'false';
        toggle.setAttribute('aria-expanded', 'false');
      } else {
        nav.hidden = false;      // visible inline on desktop
        nav.removeAttribute('data-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    }
    setInitial();
    mq.addEventListener('change', setInitial);
  
    function openMenu() {
      toggle.setAttribute('aria-expanded', 'true');
      nav.hidden = false;
      nav.dataset.open = 'true';
      const firstLink = nav.querySelector('a');
      firstLink && firstLink.focus();
      document.addEventListener('click', onOutsideClick);
      document.addEventListener('keydown', onKeydown);
    }
  
    function closeMenu() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.dataset.open = 'false';
      setTimeout(() => { 
        if (mq.matches) nav.hidden = true; 
      }, 150);
      document.removeEventListener('click', onOutsideClick);
      document.removeEventListener('keydown', onKeydown);
    }
  
    function onOutsideClick(e) {
      if (!nav.contains(e.target) && !toggle.contains(e.target) && !header.contains(e.target)) {
        closeMenu();
      }
    }
  
    function onKeydown(e) {
      if (e.key === 'Escape') closeMenu();
    }
  
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });
  
    // Close after clicking a link (nice UX)
    nav.addEventListener('click', (e) => {
      if (e.target.closest('a') && mq.matches) closeMenu();
    });
  })();
  