const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

const setTheme = (theme) => {
    if (theme === 'light') {
        htmlElement.classList.add('light-mode');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.remove('light-mode');
        localStorage.setItem('theme', 'dark');
    }
};

const savedTheme = localStorage.getItem('theme');
const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

if (savedTheme) {
    setTheme(savedTheme);
} else {
    setTheme('dark');
}

themeToggle.addEventListener('click', () => {
    const isLight = htmlElement.classList.contains('light-mode');
    setTheme(isLight ? 'dark' : 'light');
});

let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > navbar.offsetHeight) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

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

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const hiddenElements = document.querySelectorAll('.hidden');
hiddenElements.forEach((el) => observer.observe(el));

const mobileToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

mobileToggle.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});