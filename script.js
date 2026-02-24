document.addEventListener('DOMContentLoaded', ()=>{
  // set year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if(yearEl) yearEl.textContent = y;

  // dark mode toggle
  const darkModeToggle = document.createElement('button');
  darkModeToggle.className = 'dark-mode-toggle';
  darkModeToggle.innerHTML = '🌙';
  darkModeToggle.setAttribute('aria-label', 'Toggle dark mode');
  document.body.appendChild(darkModeToggle);
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if(isDarkMode){
    document.documentElement.classList.add('dark-mode');
    document.body.classList.add('dark-mode');
    darkModeToggle.innerHTML = '☀️';
  }
  darkModeToggle.addEventListener('click', ()=>{
    const el = document.documentElement;
    el.classList.toggle('dark-mode');
    document.body.classList.toggle('dark-mode');
    const isNowDark = el.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isNowDark);
    darkModeToggle.innerHTML = isNowDark ? '☀️' : '🌙';
  });

  // lightbox gallery
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-image');
  const lightboxClose = document.querySelector('.lightbox-close');
  const photos = document.querySelectorAll('.gallery-grid .photo');

  // Only attach the full lightbox behavior if the lightbox elements exist.
  if(lightbox && lightboxImg && lightboxClose){
    photos.forEach(photo=>{
      photo.addEventListener('click', ()=>{
        let src = '';
        if(photo.tagName === 'IMG') src = photo.src;
        else {
          const m = photo.style.backgroundImage.match(/url\(["']?([^"']*)["']?\)/);
          src = m ? m[1] : '';
        }
        if(src){
          lightboxImg.src = src;
          lightbox.classList.add('active');
        }
      });
    });

    lightboxClose.addEventListener('click', ()=>lightbox.classList.remove('active'));
    lightbox.addEventListener('click', (e)=>{
      if(e.target === lightbox) lightbox.classList.remove('active');
    });
  } else {
    // Fallback: if there is no lightbox markup, still make image thumbnails usable.
    photos.forEach(photo=>{
      if(photo.tagName === 'IMG'){
        photo.style.cursor = 'pointer';
        photo.addEventListener('click', ()=>{
          // open image in new tab as a simple fallback
          window.open(photo.src, '_blank');
        });
      }
    });
  }

  // FAQ accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(q=>{
    q.addEventListener('click', ()=>{
      const item = q.parentElement;
      const answer = item.querySelector('.faq-answer');
      item.classList.toggle('active');
      if(item.classList.contains('active')){
        answer.style.display = 'block';
      } else {
        answer.style.display = 'none';
      }
    });
  });

  // newsletter form
  const newsForm = document.getElementById('newsletterForm');
  if(newsForm){
    newsForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = newsForm.querySelector('button');
      btn.textContent = 'Subscribed! ✓';
      btn.disabled = true;
      setTimeout(()=>{
        btn.textContent = 'Subscribe';
        btn.disabled = false;
        newsForm.reset();
      }, 2000);
    });
  }

  // menu filters
  const filters = document.querySelectorAll('.filter');
  const cards = document.querySelectorAll('.menu-grid .card');
  filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filters.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c=>{
        if(f==='all' || c.dataset.type===f) c.style.display = '';
        else c.style.display = 'none';
      });
    });
  });

  // contact form enhanced
  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const btn = form.querySelector('button[type=submit]');
      btn.textContent = 'Sent ✓';
      btn.disabled = true;
      setTimeout(()=>{
        btn.textContent = 'Send';
        btn.disabled = false;
        form.reset();
      },2000);
    });
  }

  // scroll animations - fade in sections on scroll
  const observerOptions = {threshold:.1};
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  document.querySelectorAll('.section').forEach(s=>observer.observe(s));

  // smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href && href.startsWith('#')){
        const target = document.querySelector(href);
        if(target){
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
        }
      }
    });
  });
});
