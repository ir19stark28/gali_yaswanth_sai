// Portfolio Application JavaScript
class PortfolioApp {
    constructor() {
        this.currentPage = 'home';
        this.init();
    }

    init() {
        this.initParticles();
        this.initNavigation();
        this.initTypingAnimation();
        this.initMobileMenu();
        this.initContactForm();
        this.initScrollAnimations();
        this.handlePageLoad();
    }

    // Initialize particle system
    initParticles() {
        if (typeof particlesJS !== 'undefined') {
            particlesJS('particles-js', {
                particles: {
                    number: {
                        value: 80,
                        density: {
                            enable: true,
                            value_area: 800
                        }
                    },
                    color: {
                        value: ['#00d4ff', '#8b5cf6', '#ffffff']
                    },
                    shape: {
                        type: 'circle',
                        stroke: {
                            width: 0,
                            color: '#000000'
                        }
                    },
                    opacity: {
                        value: 0.6,
                        random: false,
                        anim: {
                            enable: false,
                            speed: 1,
                            opacity_min: 0.1,
                            sync: false
                        }
                    },
                    size: {
                        value: 3,
                        random: true,
                        anim: {
                            enable: false,
                            speed: 40,
                            size_min: 0.1,
                            sync: false
                        }
                    },
                    line_linked: {
                        enable: true,
                        distance: 150,
                        color: '#00d4ff',
                        opacity: 0.4,
                        width: 1
                    },
                    move: {
                        enable: true,
                        speed: 2,
                        direction: 'none',
                        random: false,
                        straight: false,
                        out_mode: 'out',
                        bounce: false,
                        attract: {
                            enable: false,
                            rotateX: 600,
                            rotateY: 1200
                        }
                    }
                },
                interactivity: {
                    detect_on: 'canvas',
                    events: {
                        onhover: {
                            enable: true,
                            mode: 'repulse'
                        },
                        onclick: {
                            enable: true,
                            mode: 'push'
                        },
                        resize: true
                    },
                    modes: {
                        grab: {
                            distance: 400,
                            line_linked: {
                                opacity: 1
                            }
                        },
                        bubble: {
                            distance: 400,
                            size: 40,
                            duration: 2,
                            opacity: 8,
                            speed: 3
                        },
                        repulse: {
                            distance: 200,
                            duration: 0.4
                        },
                        push: {
                            particles_nb: 4
                        },
                        remove: {
                            particles_nb: 2
                        }
                    }
                },
                retina_detect: true
            });
        }
    }

    // Initialize navigation system
    initNavigation() {
        const navLinks = document.querySelectorAll('.nav-link');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        
        // Add click handlers to navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = link.getAttribute('data-page');
                this.navigateToPage(targetPage);
            });
        });

        // Add click handlers to hero buttons
        heroButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = button.getAttribute('data-page');
                if (targetPage) {
                    this.navigateToPage(targetPage);
                }
            });
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || 'home';
            this.navigateToPage(page, false);
        });
    }

    // Navigate to specific page
    navigateToPage(targetPage, updateHistory = true) {
        if (targetPage === this.currentPage) return;

        // Update navigation active state
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-page') === targetPage) {
                link.classList.add('active');
            }
        });

        // Hide current page
        const currentPageElement = document.getElementById(this.currentPage);
        if (currentPageElement) {
            currentPageElement.classList.remove('active');
        }

        // Show target page with animation
        setTimeout(() => {
            const targetPageElement = document.getElementById(targetPage);
            if (targetPageElement) {
                targetPageElement.classList.add('active');
                
                // Scroll to top
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Close mobile menu if open
                this.closeMobileMenu();
            }
        }, 150);

        // Update history
        if (updateHistory) {
            history.pushState({ page: targetPage }, '', `#${targetPage}`);
        }

        this.currentPage = targetPage;
    }

    // Initialize typing animation
    initTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        if (!typingElement) return;

        const texts = [
            'Hi, I\'m Gali Yaswanth Sai',
            'AI Enthusiast',
            'Computer Vision Developer',
            'Problem Solver'
        ];
        
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typingElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                // Pause at end
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        };

        // Start typing animation
        setTimeout(type, 1000);
    }

    // Initialize mobile menu
    initMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (navToggle && navMenu) {
            navToggle.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking on a link
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    this.closeMobileMenu();
                }
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }
    }

    toggleMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    }

    closeMobileMenu() {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');

        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }

    // Initialize contact form
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactFormSubmit(contactForm);
        });

        // Add input validation
        const inputs = contactForm.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });

            input.addEventListener('input', () => {
                this.clearInputError(input);
            });
        });
    }
    
    handleContactFormSubmit(form) {
    const formData = new FormData(form);

    // Validate all fields
    let isValid = true;
    const inputs = form.querySelectorAll('.form-control');
    inputs.forEach(input => {
        if (!this.validateInput(input)) {
            isValid = false;
        }
    });

    if (!isValid) return;

    // Send to Formspree
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    fetch("https://formspree.io/f/mdkzzddv", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData
    })
    .then(response => {
        if (response.ok) {
            form.reset();
            this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
        } else {
            this.showFormMessage('Oops! Something went wrong. Please try again later.', 'error');
        }
    })
    .catch(() => {
        this.showFormMessage('Network error. Please check your connection and try again.', 'error');
    })
    .finally(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}


    // handleContactFormSubmit(form) {
    //     const formData = new FormData(form);
    //     const data = {
    //         name: formData.get('name'),
    //         email: formData.get('email'),
    //         subject: formData.get('subject'),
    //         message: formData.get('message')
    //     };

    //     // Validate all fields
    //     let isValid = true;
    //     const inputs = form.querySelectorAll('.form-control');
    //     inputs.forEach(input => {
    //         if (!this.validateInput(input)) {
    //             isValid = false;
    //         }
    //     });

    //     if (!isValid) return;

    //     // Simulate form submission
    //     const submitBtn = form.querySelector('button[type="submit"]');
    //     const originalText = submitBtn.textContent;
        
    //     submitBtn.textContent = 'Sending...';
    //     submitBtn.disabled = true;

    //     setTimeout(() => {
    //         // Reset form
    //         form.reset();
            
    //         // Show success message
    //         this.showFormMessage('Thank you! Your message has been sent successfully.', 'success');
            
    //         // Reset button
    //         submitBtn.textContent = originalText;
    //         submitBtn.disabled = false;
    //     }, 2000);
    // }

    validateInput(input) {
        const value = input.value.trim();
        let isValid = true;

        // Clear previous errors
        this.clearInputError(input);

        // Required field validation
        if (!value) {
            this.showInputError(input, 'This field is required');
            isValid = false;
        }

        // Email validation
        if (input.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                this.showInputError(input, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Message length validation
        if (input.name === 'message' && value && value.length < 10) {
            this.showInputError(input, 'Message must be at least 10 characters long');
            isValid = false;
        }

        return isValid;
    }

    showInputError(input, message) {
        input.style.borderColor = '#ff5459';
        
        // Remove existing error message
        const existingError = input.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Add error message
        const errorElement = document.createElement('span');
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        errorElement.style.color = '#ff5459';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '4px';
        errorElement.style.display = 'block';
        
        input.parentNode.appendChild(errorElement);
    }

    clearInputError(input) {
        input.style.borderColor = '';
        const errorMessage = input.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }

    showFormMessage(message, type) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            padding: 12px 16px;
            margin-bottom: 16px;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            background-color: ${type === 'success' ? 'rgba(0, 212, 255, 0.1)' : 'rgba(255, 84, 89, 0.1)'};
            color: ${type === 'success' ? '#00d4ff' : '#ff5459'};
            border: 1px solid ${type === 'success' ? 'rgba(0, 212, 255, 0.3)' : 'rgba(255, 84, 89, 0.3)'};
        `;

        // Insert message
        const form = document.getElementById('contact-form');
        form.insertBefore(messageElement, form.firstChild);

        // Auto remove after delay
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }

    // Initialize scroll animations
    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, observerOptions);

        // Observe elements for scroll animations
        const animateElements = document.querySelectorAll(
            '.timeline-item, .skill-category, .experience-item, .project-card, .publication-item, .accomplishment-item'
        );

        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    }

    // Handle initial page load
    handlePageLoad() {
        // Get page from URL hash
        const hash = window.location.hash.substring(1);
        const initialPage = hash || 'home';
        
        // Navigate to initial page
        this.navigateToPage(initialPage, false);
        
        // Set initial history state
        if (!hash) {
            history.replaceState({ page: 'home' }, '', '#home');
        }
    }

    // Utility methods
    debounce(func, wait) {
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

    // Smooth scroll to element
    scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
});

// Handle window resize for responsive adjustments
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (window.innerWidth > 768) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Add CSS for loading state
    const style = document.createElement('style');
    style.textContent = `
        body:not(.loaded) {
            overflow: hidden;
        }
        
        body:not(.loaded) .main-content {
            opacity: 0;
        }
        
        body.loaded .main-content {
            opacity: 1;
            transition: opacity 0.5s ease;
        }
        
        /* Loading animation for particles */
        #particles-js {
            opacity: 0;
            animation: fadeInParticles 1s ease forwards;
        }
        
        @keyframes fadeInParticles {
            to {
                opacity: 1;
            }
        }
        
        /* Enhance button hover effects */
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
            transition: left 0.5s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        /* Enhance card hover effects */
        .project-card,
        .experience-item,
        .accomplishment-item,
        .publication-item,
        .timeline-item,
        .skill-category {
            position: relative;
            overflow: hidden;
        }
        
        .project-card::before,
        .experience-item::before,
        .accomplishment-item::before,
        .publication-item::before,
        .timeline-item::before,
        .skill-category::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(0,212,255,0.03), rgba(139,92,246,0.03));
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        }
        
        .project-card:hover::before,
        .experience-item:hover::before,
        .accomplishment-item:hover::before,
        .publication-item:hover::before,
        .timeline-item:hover::before,
        .skill-category:hover::before {
            opacity: 1;
        }
        
        /* Enhance typing cursor animation */
        .cursor {
            display: inline-block;
            background-color: var(--color-primary);
            margin-left: 2px;
            width: 2px;
            animation: blink 1s infinite;
        }
        
        @keyframes blink {
            0%, 49% { opacity: 1; }
            50%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});

// Add focus management for accessibility
document.addEventListener('keydown', (e) => {
    // Handle Escape key to close mobile menu
    if (e.key === 'Escape') {
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        
        if (navMenu.classList.contains('active')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy load animations
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
    // Disable animations for users who prefer reduced motion
    const style = document.createElement('style');
    style.textContent = `
        *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
    `;
    document.head.appendChild(style);
}