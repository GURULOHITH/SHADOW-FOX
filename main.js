// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

function toggleTheme() {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    htmlElement.setAttribute('data-theme', newTheme);
    themeIcon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    htmlElement.setAttribute('data-theme', savedTheme);
    themeIcon.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

themeToggle.addEventListener('click', toggleTheme);

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Profile image scroll animation
const mainProfileImage = document.getElementById('mainProfileImage');
const navProfile = document.querySelector('.nav-profile');
let isNavProfileVisible = false;

window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const scrollPosition = window.scrollY;
    const heroHeight = document.querySelector('.hero').offsetHeight;
    
    // Navbar blur effect
    if (scrollPosition > 50) {
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.backdropFilter = 'blur(5px)';
    }
    
    // Profile image animation
    if (scrollPosition > heroHeight * 0.5 && !isNavProfileVisible) {
        navProfile.classList.add('visible');
        isNavProfileVisible = true;
        
        // Animate main profile image
        mainProfileImage.style.transform = 'scale(0.8)';
        mainProfileImage.style.opacity = '0.8';
    } else if (scrollPosition <= heroHeight * 0.5 && isNavProfileVisible) {
        navProfile.classList.remove('visible');
        isNavProfileVisible = false;
        
        // Reset main profile image
        mainProfileImage.style.transform = 'scale(1)';
        mainProfileImage.style.opacity = '1';
    }
});

// Enhanced scroll animations
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, {
    threshold: 0.1
});

// Apply animations to elements
document.querySelectorAll('.project-card, .skill-category, .stat-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    animateOnScroll.observe(element);
});

// Add hover effect for project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.querySelector('.project-hover').style.bottom = '0';
    });
    
    card.addEventListener('mouseleave', () => {
        card.querySelector('.project-hover').style.bottom = '-50px';
    });
    
    card.addEventListener('click', () => {
        window.location.href = 'projects.html';
    });
});

// Contact form handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(contactForm);
        // Add your form submission logic here
        alert('Message sent successfully!');
        contactForm.reset();
    });
}