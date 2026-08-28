// Main functionality for all pages
// Header and footer are now handled by components.js

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    // Preloader is now in components.js, but we need to hide it
    window.addEventListener('load', () => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('hidden');
        }
    });

    // Hero Slider (only on index page)
    initializeHeroSlider();
    
    // Testimonial Slider (only on index page)
    initializeTestimonialSlider();
    
    // Menu Tabs (only on menu page)
    initializeMenuTabs();
    
    // FAQ Accordion (only on contact page)
    initializeFAQ();
    
    // Back to Top button
    initializeBackToTop();
    
    // Smooth scroll for anchor links
    initializeSmoothScroll();
    
    // Form validation
    initializeFormValidation();
    
    // Phone number formatting
    initializePhoneFormatting();
    
    // Intersection Observer for animations
    initializeScrollAnimations();
});

// Hero Slider
function initializeHeroSlider() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const sliderDots = document.querySelector('.slider-dots');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    
    // Create dots
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        sliderDots.appendChild(dot);
    });
    
    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.remove('active');
        
        currentSlide = index;
        
        if (currentSlide >= slides.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = slides.length - 1;
        
        slides[currentSlide].classList.add('active');
        document.querySelectorAll('.slider-dot')[currentSlide].classList.add('active');
    }
    
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', prevSlide);
        nextBtn.addEventListener('click', nextSlide);
        
        // Auto slide
        setInterval(nextSlide, 5000);
    }
}

// Testimonial Slider
function initializeTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length === 0) return;
    
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach((testimonial) => {
            testimonial.classList.remove('active');
        });
        
        testimonials[index].classList.add('active');
    }
    
    setInterval(() => {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Menu Tabs
function initializeMenuTabs() {
    const menuTabs = document.querySelectorAll('.menu-tab');
    const menuCategories = document.querySelectorAll('.menu-category');
    
    if (menuTabs.length === 0) return;
    
    menuTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            menuTabs.forEach(t => t.classList.remove('active'));
            menuCategories.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Show corresponding category
            const category = tab.getAttribute('data-category');
            const categoryElement = document.getElementById(category);
            if (categoryElement) {
                categoryElement.classList.add('active');
            }
        });
    });
}

// FAQ Accordion
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', () => {
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Toggle current item
                item.classList.toggle('active');
            });
        }
    });
}

// Back to Top Button
function initializeBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    if (!backToTopBtn) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth scroll for anchor links
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Form validation
function initializeFormValidation() {
    document.querySelectorAll('input, select, textarea').forEach(field => {
        field.addEventListener('blur', () => {
            if (field.hasAttribute('required') && !field.value.trim()) {
                field.style.borderColor = '#ff4444';
            } else {
                field.style.borderColor = '';
            }
        });
        
        field.addEventListener('input', () => {
            field.style.borderColor = '';
        });
    });
    
    // Date input minimum value
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
}

// Phone number formatting
function initializePhoneFormatting() {
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value.length <= 3) {
                    value = `(${value}`;
                } else if (value.length <= 6) {
                    value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
                } else {
                    value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
                }
            }
            e.target.value = value;
        });
    });
}

// Scroll animations
function initializeScrollAnimations() {
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
    document.querySelectorAll('.dish-card, .value-card, .team-member, .event-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Reservation Form Submission
function submitReservation(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    const guests = document.getElementById('guests').value;
    const occasion = document.getElementById('occasion').value;
    const requests = document.getElementById('requests').value;
    
    // Create reservation object
    const reservation = {
        name,
        email,
        phone,
        date,
        time,
        guests,
        occasion,
        requests,
        timestamp: new Date().toISOString()
    };
    
    // Store in localStorage
    const reservations = JSON.parse(localStorage.getItem('reservations')) || [];
    reservations.push(reservation);
    localStorage.setItem('reservations', JSON.stringify(reservations));
    
    // Show success message
    showNotification(`Thank you, ${name}! Your reservation for ${guests} guests on ${date} at ${time} has been confirmed.`, 'success');
    
    // Reset form
    document.getElementById('reservationForm').reset();
    
    return false;
}

// Contact Form Submission
function submitContactForm(event) {
    event.preventDefault();
    
    // Get form data
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create contact object
    const contactMessage = {
        name,
        email,
        subject,
        message,
        date: new Date().toISOString()
    };
    
    // Store in localStorage
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(contactMessage);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Show success message
    showNotification(`Thank you for your message, ${name}! We'll get back to you within 24 hours.`, 'success');
    
    // Reset form
    document.getElementById('contactForm').reset();
    
    return false;
}

// Notification system
function showNotification(message, type = 'success') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles if not already in CSS
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#4caf50' : '#f44336'};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
        margin-left: 15px;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Add notification animations
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Console message
console.log('%c🍽️ Guru Palace Restaurant', 'font-size: 24px; font-weight: bold; color: #c9a96e;');
console.log('%cExperience the finest Indian cuisine!', 'font-size: 14px; color: #333;');