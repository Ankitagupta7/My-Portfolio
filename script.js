/* ===========================
   ADVANCED JAVASCRIPT FEATURES
   FOR PORTFOLIO WEBSITE
   =========================== */

// ===========================
// 1. SMOOTH SCROLL & NAVIGATION
// ===========================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle mobile menu
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===========================
// 2. SCROLL REVEAL ANIMATION
// ===========================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add scroll animation class to elements
document.querySelectorAll('.about-text, .about-stats, .skill-category, .project-card, .experience-item, .cert-card').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});

// ===========================
// 3. SKILL PROGRESS ANIMATION
// ===========================

let skillsAnimated = false;

const skillsSection = document.querySelector('.skills');
const skillProgressBars = document.querySelectorAll('.skill-progress');

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !skillsAnimated) {
            skillsAnimated = true;
            animateSkills();
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

function animateSkills() {
    skillProgressBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0';
            bar.offsetHeight; // Trigger reflow
            bar.style.transition = 'width 1.5s ease-out';
            bar.style.width = width;
        }, index * 100);
    });
}

if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// ===========================
// 4. PROJECT FILTER FUNCTIONALITY
// ===========================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filter projects with animation
        projectCards.forEach((card, index) => {
            const category = card.getAttribute('data-category');

            if (filter === 'all' || category === filter) {
                setTimeout(() => {
                    card.classList.remove('hidden');
                    card.style.animation = `slideUp 0.6s ease-out ${index * 0.1}s`;
                }, 0);
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ===========================
// 5. CONTACT FORM HANDLING
// ===========================

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;

        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        if (name.trim().length < 3) {
            showMessage('Name should be at least 3 characters long.', 'error');
            return;
        }

        // Simulate form submission (In real scenario, send to backend)
        showMessage('Message sent successfully! I\'ll get back to you soon.', 'success');

        // Reset form
        contactForm.reset();

        // Hide message after 3 seconds
        setTimeout(() => {
            formMessage.classList.remove('success', 'error');
        }, 3000);
    });
}

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.classList.add(type);
}

// ===========================
// 6. COUNTER ANIMATION FOR STATS
// ===========================

const statNumbers = document.querySelectorAll('.stat-number');

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
}

const aboutSection = document.querySelector('.about');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statsAnimated = true;
            statNumbers.forEach((stat, index) => {
                const targetNumber = parseInt(stat.textContent);
                setTimeout(() => {
                    animateCounter(stat, targetNumber, 2000);
                }, index * 200);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

if (aboutSection) {
    statsObserver.observe(aboutSection);
}

// ===========================
// 7. PARALLAX SCROLL EFFECT
// ===========================

const hero = document.querySelector('.hero');

window.addEventListener('scroll', () => {
    if (hero) {
        const scrollPosition = window.pageYOffset;
        const parallaxElements = hero.querySelectorAll('.floating-card');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrollPosition * speed}px)`;
        });
    }
});

// ===========================
// 8. ACTIVE NAVIGATION LINK
// ===========================

window.addEventListener('scroll', () => {
    let current = '';

    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// 9. TYPING EFFECT (HERO SUBTITLE)
// ===========================

const heroSubtitle = document.querySelector('.hero-subtitle');
if (heroSubtitle) {
    const text = heroSubtitle.textContent;
    heroSubtitle.textContent = '';
    
    let i = 0;
    function typeEffect() {
        if (i < text.length) {
            heroSubtitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeEffect, 50);
        }
    }

    // Start typing after page load
    window.addEventListener('load', () => {
        setTimeout(typeEffect, 500);
    });
}

// ===========================
// 10. DARK MODE TOGGLE (BONUS)
// ===========================

// Optional: Add dark mode functionality
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--text-dark', '#e5e7eb');
        document.documentElement.style.setProperty('--bg-white', '#1f2937');
        document.documentElement.style.setProperty('--bg-light', '#111827');
    } else {
        // Reset to light mode
        document.documentElement.style.setProperty('--text-dark', '#1f2937');
        document.documentElement.style.setProperty('--bg-white', '#ffffff');
        document.documentElement.style.setProperty('--bg-light', '#f9fafb');
    }
}

// ===========================
// 11. SMOOTH LINK BEHAVIOR
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===========================
// 12. PAGE LOAD ANIMATION
// ===========================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add staggered animation to nav items
    navLinks.forEach((link, index) => {
        link.style.animation = `slideDown 0.5s ease-out ${index * 0.1}s both`;
    });
});

// ===========================
// 13. UTILITY FUNCTIONS
// ===========================

// Debounce function for optimization
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===========================
// 14. LAZY LOADING IMAGES
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===========================
// 15. CONSOLE MESSAGE
// ===========================

console.log('%c Welcome to Ankita Gupta\'s Portfolio! ', 
    'background: linear-gradient(135deg, #6366f1, #ec4899); color: white; font-size: 14px; padding: 10px; border-radius: 5px; font-weight: bold;'
);
console.log('%c Built with HTML, CSS & JavaScript ', 
    'color: #6366f1; font-size: 12px; font-weight: bold;'
);

// ===========================
// 16. ACCESSIBILITY FEATURES
// ===========================

// Skip to main content link (for accessibility)
const skipLink = document.createElement('a');
skipLink.textContent = 'Skip to main content';
skipLink.href = '#projects';
skipLink.style.position = 'absolute';
skipLink.style.top = '-40px';
skipLink.style.left = '0';
skipLink.style.padding = '8px 16px';
skipLink.style.backgroundColor = 'var(--primary-color)';
skipLink.style.color = 'white';
skipLink.style.textDecoration = 'none';
skipLink.style.zIndex = '9999';

skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});

skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});

document.body.insertBefore(skipLink, document.body.firstChild);

// ===========================
// 17. FORM VALIDATION
// ===========================

const formInputs = document.querySelectorAll('.form-input, .form-textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '') {
            input.style.borderColor = '#ef4444';
        } else {
            input.style.borderColor = 'var(--border-color)';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = 'var(--primary-color)';
    });
});

// ===========================
// 18. PERFORMANCE OPTIMIZATION
// ===========================

// Use requestAnimationFrame for smooth animations
function smoothScroll(target, duration) {
    const startPosition = window.pageYOffset;
    const targetPosition = target.offsetTop;
    const distance = targetPosition - startPosition;
    let start = null;

    window.requestAnimationFrame(function animation(currentTime) {
        if (start === null) start = currentTime;
        const timeElapsed = currentTime - start;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) window.requestAnimationFrame(animation);
    });
}

// Easing function
function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
}

// ===========================
// 19. DYNAMIC YEAR IN FOOTER
// ===========================

const currentYear = new Date().getFullYear();
const footerCopyright = document.querySelector('.footer p');
if (footerCopyright) {
    footerCopyright.textContent = `© ${currentYear} Ankita Gupta. All rights reserved.`;
}

// ===========================
// 20. RESPONSIVE BEHAVIOR
// ===========================

let isMobile = window.innerWidth <= 768;

window.addEventListener('resize', debounce(() => {
    isMobile = window.innerWidth <= 768;
    
    // Adjust animations based on device
    if (isMobile) {
        document.querySelectorAll('[style*="animation"]').forEach(el => {
            el.style.animationDuration = '0.3s';
        });
    }
}, 250));

// ===========================
// 21. PREFERS REDUCED MOTION
// ===========================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-normal', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===========================
// 22. ELEMENT RESIZE OBSERVER
// ===========================

const resizeObserver = new ResizeObserver(entries => {
    for (let entry of entries) {
        // Handle responsive behavior
        if (entry.contentRect.width < 480) {
            entry.target.classList.add('mobile-view');
        } else {
            entry.target.classList.remove('mobile-view');
        }
    }
});

document.querySelectorAll('.container').forEach(container => {
    resizeObserver.observe(container);
});

// ===========================
// 23. CLIPBOARD COPY FUNCTION
// ===========================

function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard!');
        }).catch(() => {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        });
    }
}

// ===========================
// 24. CONSOLE ERRORS HANDLER
// ===========================

window.addEventListener('error', (event) => {
    console.error('Error:', event.error);
});

// ===========================
// 25. INIT FUNCTION
// ===========================

function initPortfolio() {
    console.log('Portfolio initialized successfully!');
    
    // Trigger initial animations
    document.querySelectorAll('.scroll-animate').forEach((el, index) => {
        if (el.getBoundingClientRect().top < window.innerHeight) {
            setTimeout(() => {
                el.classList.add('active');
            }, index * 50);
        }
    });
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPortfolio);
} else {
    initPortfolio();
}
// ===========================
// 26. VIEW MORE / VIEW LESS (EXPERIENCE)
// ===========================

const moreExp = document.getElementById("more-experience");
const toggleBtn = document.getElementById("toggle-btn");

if (moreExp && toggleBtn) {
    toggleBtn.addEventListener("click", function () {
        if (moreExp.style.display === "none" || moreExp.style.display === "") {
            moreExp.style.display = "block";
            toggleBtn.innerText = "View Less";
        } else {
            moreExp.style.display = "none";
            toggleBtn.innerText = "View More";
        }
    });
}

// ===========================
// CERTIFICATION HOVER PREVIEW
// ===========================
const cards = document.querySelectorAll(".cert-card");
const preview = document.getElementById("certPreview");
const previewImg = document.getElementById("previewImg");

cards.forEach(card => {
    card.addEventListener("mouseover", () => {
        const img = card.getAttribute("data-img");
        if (img) {
            previewImg.src = img;
            preview.style.display = "block";
        }
    });

    card.addEventListener("mousemove", (e) => {
        preview.style.top = (e.clientY + 20) + "px";
        preview.style.left = (e.clientX + 20) + "px";
    });

    card.addEventListener("mouseout", () => {
        preview.style.display = "none";
    });
});



/* =====================================================
   DARK / LIGHT MODE + STAR CURSOR 
   ===================================================== */

document.documentElement.classList.add("day"); // default light mode

const themeBtn = document.getElementById("themeToggle");

/* Toggle theme */
themeBtn.addEventListener("click", () => {
    if (document.documentElement.classList.contains("day")) {
        document.documentElement.classList.remove("day");
        document.documentElement.classList.add("night");
        themeBtn.textContent = "☀️";  // sun icon for light mode coming back
    } else {
        document.documentElement.classList.remove("night");
        document.documentElement.classList.add("day");
        themeBtn.textContent = "🌙";  // moon icon for dark mode
    }
});


/* STAR CURSOR EFFECT */
const canvas = document.getElementById('starCursor');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function random(min, max) {
    return Math.random() * (max - min) + min;
}

document.addEventListener("mousemove", e => {
    stars.push({
        x: e.clientX,
        y: e.clientY,
        radius: random(1, 3),
        alpha: 1,
        dx: random(-0.5, 0.5),
        dy: random(-0.5, -1)
    });
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach((s, i) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
        ctx.fill();

        s.x += s.dx;
        s.y += s.dy;
        s.alpha -= 0.02;

        if (s.alpha <= 0) stars.splice(i, 1);
    });

    requestAnimationFrame(animate);
}
animate();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
