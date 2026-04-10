// Hide Navbar on Scroll Down, Show on Scroll Up
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    // Add glass background color when scrolling past hero
    if (scrollTop > 50) {
        navbar.style.background = 'var(--glass-bg)';
        navbar.style.boxShadow = '0 10px 30px -10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'transparent';
        navbar.style.boxShadow = 'none';
        navbar.style.borderBottom = 'none';
    }

    lastScrollTop = scrollTop;
});

// Intersection Observer for scroll animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Stop observing once it's visible
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));
