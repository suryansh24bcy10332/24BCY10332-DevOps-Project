/* =========================================================
   ABC Technologies - Main JavaScript
   ========================================================= */

/* ---------- Preloader ---------- */
window.addEventListener('load', () => {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => preloader.classList.add('hidden'), 500);
  }
});

/* ---------- Navbar Scroll Behaviour ---------- */
const navbar = document.querySelector('.navbar-custom');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  /* Back-to-top visibility */
  const btn = document.getElementById('backToTop');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
});

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);
revealEls.forEach(el => revealObserver.observe(el));

/* ---------- Animated Counters ---------- */
function animateCounter(el) {
  const target   = +el.dataset.target;
  const duration = 2000;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString();
  }, 16);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);
document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

/* ---------- Back to Top ---------- */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------- Active Nav Link ---------- */
(function setActiveNav() {
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-custom .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ---------- Contact Form ---------- */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = contactForm.querySelector('button[type="submit"]');
    const orig = btn.innerHTML;

    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Sending...';
    btn.disabled  = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Message Sent!';
      btn.style.background = 'linear-gradient(135deg, #10B981, #059669)';
      contactForm.reset();

      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
        btn.disabled  = false;
      }, 3000);
    }, 1800);
  });
}

/* ---------- Gallery Filter ---------- */
const filterBtns = document.querySelectorAll('.filter-btn');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.animation = 'fadeIn 0.4s ease both';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

/* ---------- Smooth Scroll (anchor links) ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const href = a.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    }
  });
});

/* ---------- Job Application Modal (Careers) ---------- */
document.querySelectorAll('.apply-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.closest('.job-card').querySelector('h5')?.textContent || 'Position';
    const modalTitle = document.getElementById('applyModalLabel');
    if (modalTitle) modalTitle.textContent = `Apply for: ${title}`;
  });
});

const applyForm = document.getElementById('applyForm');
if (applyForm) {
  applyForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn  = applyForm.querySelector('button[type="submit"]');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Submitting...';
    btn.disabled  = true;

    setTimeout(() => {
      btn.innerHTML = '<i class="fas fa-check-circle me-2"></i>Application Submitted!';
      setTimeout(() => {
        const modal = bootstrap.Modal.getInstance(document.getElementById('applyModal'));
        if (modal) modal.hide();
        applyForm.reset();
        btn.innerHTML = 'Submit Application';
        btn.disabled  = false;
      }, 2000);
    }, 1500);
  });
}

/* ---------- Hero Scroll Arrow ---------- */
const heroScroll = document.querySelector('.hero-scroll-btn');
if (heroScroll) {
  heroScroll.addEventListener('click', () => {
    const next = document.querySelector('#intro') || document.querySelector('section:nth-of-type(2)');
    if (next) window.scrollTo({ top: next.offsetTop - 60, behavior: 'smooth' });
  });
}
