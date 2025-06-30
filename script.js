// Theme Management
class ThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 
                    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        this.init();
    }

    init() {
        this.applyTheme();
        this.bindEvents();
    }

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.theme);
        localStorage.setItem('theme', this.theme);
    }

    toggle() {
        this.theme = this.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
    }

    bindEvents() {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
    }
}

// Custom Cursor
class CustomCursor {
    constructor() {
        this.cursor = document.getElementById('customCursor');
        this.init();
    }

    init() {
        if (!this.cursor) return;
        
        document.addEventListener('mousemove', (e) => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
        });

        // Add hover effects
        const hoverElements = document.querySelectorAll('a, button, .logo-card, .feature-card, .skill-item');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('hover');
            });
        });
    }
}

// Loading Screen
class LoadingScreen {
    constructor() {
        this.loadingScreen = document.getElementById('loadingScreen');
        this.init();
    }

    init() {
        // Simulate loading time
        setTimeout(() => {
            this.hide();
        }, 2000);
    }

    hide() {
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }
}

// Mobile Menu
class MobileMenu {
    constructor() {
        this.mobileMenu = document.getElementById('mobileMenu');
        this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
        this.mobileMenuBackdrop = document.querySelector('.mobile-menu-backdrop');
        this.mobileNavLinks = document.querySelectorAll('.mobile-nav a');
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        if (this.mobileMenuToggle) {
            this.mobileMenuToggle.addEventListener('click', () => this.toggle());
        }

        if (this.mobileMenuBackdrop) {
            this.mobileMenuBackdrop.addEventListener('click', () => this.close());
        }

        this.mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => this.close());
        });

        // Close on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    toggle() {
        if (this.mobileMenu.classList.contains('active')) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.mobileMenu.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.mobileMenu.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Smooth Scrolling
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// Scroll to Top Button
class ScrollToTop {
    constructor() {
        this.scrollToTopBtn = document.getElementById('scrollToTop');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
    }

    bindEvents() {
        if (this.scrollToTopBtn) {
            this.scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }

        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.pageYOffset > 300) {
            this.scrollToTopBtn.classList.add('visible');
        } else {
            this.scrollToTopBtn.classList.remove('visible');
        }
    }
}

// Header Scroll Effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('.header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleScroll() {
        if (window.pageYOffset > 100) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
    }
}

// Skills Animation
class SkillsAnimation {
    constructor() {
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.init();
    }

    init() {
        this.observeSkills();
    }

    observeSkills() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillBar = entry.target;
                    const width = skillBar.getAttribute('data-width');
                    skillBar.style.width = width + '%';
                }
            });
        }, { threshold: 0.5 });

        this.skillBars.forEach(bar => observer.observe(bar));
    }
}

// Sponsors Slider
class SponsorsSlider {
    constructor() {
        this.slidesWrapper = document.getElementById('slidesWrapper');
        this.slides = document.querySelectorAll('.slide');
        this.prevBtn = document.getElementById('prevSlide');
        this.nextBtn = document.getElementById('nextSlide');
        this.indicators = document.querySelectorAll('.indicator');
        this.autoplayToggle = document.getElementById('autoplayToggle');
        
        this.currentSlide = 0;
        this.isAutoPlaying = true;
        this.autoplayInterval = null;
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.startAutoplay();
        this.updateSlider();
    }

    bindEvents() {
        if (this.prevBtn) {
            this.prevBtn.addEventListener('click', () => this.prevSlide());
        }

        if (this.nextBtn) {
            this.nextBtn.addEventListener('click', () => this.nextSlide());
        }

        this.indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => this.goToSlide(index));
        });

        if (this.autoplayToggle) {
            this.autoplayToggle.addEventListener('click', () => this.toggleAutoplay());
        }

        // Pause autoplay on hover
        const sliderContainer = document.querySelector('.slider-container');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', () => this.pauseAutoplay());
            sliderContainer.addEventListener('mouseleave', () => this.resumeAutoplay());
        }
    }

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
        this.pauseAutoplay();
    }

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
        this.pauseAutoplay();
    }

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
        this.pauseAutoplay();
    }

    updateSlider() {
        if (this.slidesWrapper) {
            this.slidesWrapper.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        }

        // Update active slide
        this.slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === this.currentSlide);
        });

        // Update indicators
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentSlide);
        });
    }

    startAutoplay() {
        if (this.isAutoPlaying) {
            this.autoplayInterval = setInterval(() => {
                this.nextSlide();
            }, 4000);
        }
    }

    pauseAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    resumeAutoplay() {
        if (this.isAutoPlaying && !this.autoplayInterval) {
            this.startAutoplay();
        }
    }

    toggleAutoplay() {
        this.isAutoPlaying = !this.isAutoPlaying;
        
        if (this.autoplayToggle) {
            this.autoplayToggle.textContent = this.isAutoPlaying 
                ? 'Avtomatik o\'tish yoqilgan' 
                : 'Avtomatik o\'tish o\'chirilgan';
            this.autoplayToggle.classList.toggle('active', this.isAutoPlaying);
        }

        if (this.isAutoPlaying) {
            this.startAutoplay();
        } else {
            this.pauseAutoplay();
        }
    }
}

// Contact Form
class ContactForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.init();
    }

    init() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Simulate form submission
        console.log('Form submitted:', data);
        alert('Xabaringiz yuborildi! Tez orada javob beraman.');
        
        // Reset form
        this.form.reset();
    }
}

// Intersection Observer for Animations
class AnimationObserver {
    constructor() {
        this.init();
    }

    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationPlayState = 'running';
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });

        // Observe elements that should animate on scroll
        const animatedElements = document.querySelectorAll('.feature-card, .skill-item, .sponsor-content');
        animatedElements.forEach(el => {
            el.style.animationPlayState = 'paused';
            observer.observe(el);
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all components
    new ThemeManager();
    new CustomCursor();
    new LoadingScreen();
    new MobileMenu();
    new SmoothScroll();
    new ScrollToTop();
    new HeaderScroll();
    new SkillsAnimation();
    new SponsorsSlider();
    new ContactForm();
    new AnimationObserver();

    // Add some additional interactive effects
    addHoverEffects();
    addScrollAnimations();
});

// Additional hover effects
function addHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .skill-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Add scroll-triggered animations
function addScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Elements to animate on scroll
    const elementsToAnimate = document.querySelectorAll('.section-title, .section-description, .about-text, .contact-info');
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Utility functions
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

// Performance optimization
window.addEventListener('load', () => {
    // Preload critical images
    const criticalImages = [
        'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Handle resize events
window.addEventListener('resize', debounce(() => {
    // Recalculate any size-dependent elements
    const customCursor = document.getElementById('customCursor');
    if (window.innerWidth <= 768 && customCursor) {
        customCursor.style.display = 'none';
        document.body.style.cursor = 'auto';
    } else if (customCursor) {
        customCursor.style.display = 'block';
        document.body.style.cursor = 'none';
    }
}, 250));