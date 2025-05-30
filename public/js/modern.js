// ===== Trajecta Modern JavaScript =====

// Performance-first approach with debouncing
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Smooth parallax effect for hero sections
class ParallaxController {
  constructor() {
    this.elements = document.querySelectorAll('[data-parallax]');
    this.init();
  }

  init() {
    if (this.elements.length === 0) return;
    
    // Use RAF for smooth animations
    let ticking = false;
    const updateParallax = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.updateElements();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', updateParallax);
  }

  updateElements() {
    const scrolled = window.pageYOffset;
    
    this.elements.forEach(element => {
      const speed = element.dataset.parallax || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
  }
}

// Intersection Observer for fade-in animations
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), this.observerOptions);
    this.observeElements();
  }

  observeElements() {
    const elements = document.querySelectorAll('.fade-in, .glass-card, .timeline-item');
    elements.forEach(element => {
      this.observer.observe(element);
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        this.observer.unobserve(entry.target);
      }
    });
  }
}

// Number counter animation
class NumberCounter {
  constructor() {
    this.counters = document.querySelectorAll('[data-counter]');
    this.observer = new IntersectionObserver(this.handleIntersection.bind(this), {
      threshold: 0.5
    });
    
    this.counters.forEach(counter => {
      this.observer.observe(counter);
    });
  }

  handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.animateCounter(entry.target);
        this.observer.unobserve(entry.target);
      }
    });
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.counter);
    const duration = parseInt(element.dataset.duration) || 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const updateCounter = () => {
      current += increment;
      if (current < target) {
        element.textContent = Math.floor(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  }
}

// Smooth scroll for anchor links
class SmoothScroll {
  constructor() {
    this.links = document.querySelectorAll('a[href^="#"]');
    this.init();
  }

  init() {
    this.links.forEach(link => {
      link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
          const offset = 80; // Account for fixed navbar
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Typewriter effect for hero text
class TypeWriter {
  constructor(element, texts, speed = 50) {
    this.element = element;
    this.texts = texts;
    this.speed = speed;
    this.textIndex = 0;
    this.charIndex = 0;
    this.isDeleting = false;
    this.init();
  }

  init() {
    this.type();
  }

  type() {
    const currentText = this.texts[this.textIndex];
    const currentChar = this.isDeleting 
      ? currentText.substring(0, this.charIndex - 1)
      : currentText.substring(0, this.charIndex + 1);

    this.element.textContent = currentChar;
    
    let typeSpeed = this.speed;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = 2000; // Pause at end
      this.isDeleting = true;
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false;
      this.textIndex = (this.textIndex + 1) % this.texts.length;
      typeSpeed = 500; // Pause before new text
    }

    this.charIndex += this.isDeleting ? -1 : 1;

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Form validation with modern UX
class FormValidator {
  constructor(form) {
    this.form = form;
    this.inputs = form.querySelectorAll('input, textarea');
    this.init();
  }

  init() {
    this.inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateInput(input));
      input.addEventListener('input', debounce(() => this.validateInput(input), 500));
    });

    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  validateInput(input) {
    const isValid = input.checkValidity();
    
    if (isValid) {
      input.classList.remove('is-invalid');
      input.classList.add('is-valid');
    } else {
      input.classList.remove('is-valid');
      input.classList.add('is-invalid');
    }
  }

  handleSubmit(e) {
    if (!this.form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
      
      // Focus first invalid input
      const firstInvalid = this.form.querySelector(':invalid');
      if (firstInvalid) {
        firstInvalid.focus();
      }
    }

    this.form.classList.add('was-validated');
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modules
  new ParallaxController();
  new AnimationObserver();
  new NumberCounter();
  new SmoothScroll();

  // Initialize typewriter if element exists
  const typewriterElement = document.querySelector('[data-typewriter]');
  if (typewriterElement) {
    const texts = JSON.parse(typewriterElement.dataset.typewriter);
    new TypeWriter(typewriterElement, texts);
  }

  // Initialize form validators
  document.querySelectorAll('form').forEach(form => {
    new FormValidator(form);
  });

  // Add loading animation removal
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });

  // Performance monitoring (development only)
  if (window.location.hostname === 'localhost') {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        console.log('LCP:', entry.startTime);
      }
    });
    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
});

// Service Worker registration for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => console.log('SW registered'))
      .catch(err => console.log('SW registration failed'));
  });
} 