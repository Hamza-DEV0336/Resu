// Header and Footer Components
class WebsiteComponents {
    constructor() {
        this.headerHTML = `
            <!-- Preloader -->
            <div class="preloader">
                <div class="loader">
                    <img src="images/logo.png" alt="Guru Palace" onerror="this.style.display='none'">
                </div>
            </div>

            <!-- Navigation -->
            <nav class="navbar">
                <div class="nav-container">
                    <a href="index.html" class="nav-logo">
                        <img src="images/logo.png" alt="Guru Palace Logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%2250%22%3E%3Crect width=%22150%22 height=%2250%22 fill=%22%23c9a96e%22/%3E%3Ctext x=%2275%22 y=%2230%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2216%22 font-family=%22serif%22%3EGuru Palace%3C/text%3E%3C/svg%3E'">
                    </a>
                    <ul class="nav-menu">
                        <li class="nav-item"><a href="index.html" class="nav-link" data-page="index">Home</a></li>
                        <li class="nav-item"><a href="menu.html" class="nav-link" data-page="menu">Menu</a></li>
                        <li class="nav-item"><a href="about.html" class="nav-link" data-page="about">About</a></li>
                        <li class="nav-item"><a href="reservations.html" class="nav-link" data-page="reservations">Reservations</a></li>
                        <li class="nav-item"><a href="contact.html" class="nav-link" data-page="contact">Contact</a></li>
                    </ul>
                    <div class="nav-actions">
                        <a href="tel:+1234567890" class="nav-phone">
                            <i class="fas fa-phone"></i> (123) 456-7890
                        </a>
                        <a href="reservations.html" class="btn-reserve">Reserve Now</a>
                    </div>
                    <div class="nav-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </nav>
        `;

        this.footerHTML = `
            <!-- Footer -->
            <footer class="footer">
                <div class="container">
                    <div class="footer-grid">
                        <div class="footer-col">
                            <img src="images/logo.png" alt="Guru Palace" class="footer-logo" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22150%22 height=%2250%22%3E%3Crect width=%22150%22 height=%2250%22 fill=%22%23c9a96e%22/%3E%3Ctext x=%2275%22 y=%2230%22 text-anchor=%22middle%22 fill=%22white%22 font-size=%2216%22 font-family=%22serif%22%3EGuru Palace%3C/text%3E%3C/svg%3E'">
                            <p>Experience the finest Indian cuisine in an elegant and welcoming atmosphere.</p>
                            <div class="social-links">
                                <a href="#" aria-label="Facebook"><i class="fab fa-facebook"></i></a>
                                <a href="#" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
                                <a href="#" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
                                <a href="#" aria-label="Yelp"><i class="fab fa-yelp"></i></a>
                            </div>
                        </div>
                        <div class="footer-col">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><a href="index.html">Home</a></li>
                                <li><a href="menu.html">Menu</a></li>
                                <li><a href="about.html">About Us</a></li>
                                <li><a href="reservations.html">Reservations</a></li>
                                <li><a href="contact.html">Contact</a></li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h3>Contact Info</h3>
                            <ul class="contact-info">
                                <li><i class="fas fa-map-marker-alt"></i> 123 Main Street, City, State 12345</li>
                                <li><i class="fas fa-phone"></i> (123) 456-7890</li>
                                <li><i class="fas fa-envelope"></i> info@gurupalace.com</li>
                            </ul>
                        </div>
                        <div class="footer-col">
                            <h3>Opening Hours</h3>
                            <ul class="opening-hours">
                                <li><span>Monday - Thursday</span> 11:00 AM - 10:00 PM</li>
                                <li><span>Friday - Saturday</span> 11:00 AM - 11:00 PM</li>
                                <li><span>Sunday</span> 12:00 PM - 9:00 PM</li>
                            </ul>
                        </div>
                    </div>
                    <div class="footer-bottom">
                        <p>&copy; 2024 Guru Palace Restaurant. All rights reserved.</p>
                        <div class="footer-links">
                            <a href="#">Privacy Policy</a>
                            <a href="#">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </footer>

            <!-- Back to Top Button -->
            <button class="back-to-top" id="backToTop" aria-label="Back to top">
                <i class="fas fa-arrow-up"></i>
            </button>
        `;
    }

    // Initialize components
    init() {
        this.injectHeader();
        this.injectFooter();
        this.setActiveNavLink();
        this.initializeNavigation();
    }

    // Inject header at the beginning of body
    injectHeader() {
        const body = document.body;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.headerHTML;
        
        // Insert header elements at the beginning of body
        while (tempDiv.firstChild) {
            body.insertBefore(tempDiv.firstChild, body.firstChild);
        }
    }

    // Inject footer at the end of body
    injectFooter() {
        const body = document.body;
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = this.footerHTML;
        
        // Insert footer elements at the end of body
        while (tempDiv.firstChild) {
            body.appendChild(tempDiv.firstChild);
        }
    }

    // Set active navigation link based on current page
    setActiveNavLink() {
        const currentPage = this.getCurrentPage();
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            const linkPage = link.getAttribute('data-page');
            if (linkPage === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Get current page from URL
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        
        if (!page || page === '' || page === 'index.html') {
            return 'index';
        } else {
            return page.replace('.html', '');
        }
    }

    // Initialize navigation functionality
    initializeNavigation() {
        const navbar = document.querySelector('.navbar');
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        // Add scrolled class on scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Mobile navigation toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                navToggle.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }
}

// Initialize components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    const components = new WebsiteComponents();
    components.init();
});