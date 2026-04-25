const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

const animateCursor = () => {
    // Smooth interpolation
    cursorX += (mouseX - cursorX) * 1;
    cursorY += (mouseY - cursorY) * 1;
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0)`;
    follower.style.transform = `translate3d(${followerX - 20}px, ${followerY - 20}px, 0)`;

    requestAnimationFrame(animateCursor);
};
animateCursor();

document.addEventListener('mousedown', () => {
    follower.style.transform += ' scale(0.5)';
});

document.addEventListener('mouseup', () => {
    follower.style.transform = follower.style.transform.replace(' scale(0.5)', '');
});

// Hover effect for links
const links = document.querySelectorAll('a, button, input, select, textarea, .material-card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        follower.style.transform = follower.style.transform + ' scale(2)';
        follower.style.background = 'rgba(161, 74, 42, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        follower.style.transform = follower.style.transform.replace(' scale(2)', '');
        follower.style.background = 'transparent';
    });
});

const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach(el => {
        const elTop = el.getBoundingClientRect().top;

        if (elTop < triggerBottom) {
            el.classList.add('active');
        }
    });
};

// Initial check
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// Parallax effect for hero
const heroImg = document.querySelector('.hero-bg img');
window.addEventListener('scroll', () => {
    const scrollValue = window.scrollY;
    if (heroImg) {
        heroImg.style.transform = `translateY(${scrollValue * 0.4}px)`;
    }
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(249, 245, 240, 0.9)';
        nav.style.backdropFilter = 'blur(10px)';
        nav.style.mixBlendMode = 'normal';
        nav.style.color = 'var(--color-green)';
        nav.style.padding = '1rem 0';
    } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.mixBlendMode = 'difference';
        nav.style.color = 'white';
        nav.style.padding = '2rem 0';
    }
});
