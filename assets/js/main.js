window.onload = () => { setTimeout(() => { document.querySelector('.preloader').classList.add('fade-out'); }, 1500); };
function toggleMenu() { document.querySelector('.nav-links').classList.toggle('active'); }
function closeMenu() { document.querySelector('.nav-links').classList.remove('active'); }

let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
setInterval(() => {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3500);

function toggleFaq(element) { element.classList.toggle('active'); }

// SCROLL SPY (Active Link Highlighter)
const sections = document.querySelectorAll('section');
const navLi = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollY = window.scrollY; // optimization

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // Trigger when section is 30% visible or top
        if (scrollY >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLi.forEach(a => {
        a.classList.remove('active');
        // Check if link href contains the current section id (handle both #id and page.html#id)
        if (current && a.getAttribute('href').includes('#' + current)) {
            a.classList.add('active');
        }
    });
});

// WHATSAPP FORM HANDLER
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // 1. Capture Data
    const name = this.querySelector('input[type="text"]').value;
    const email = this.querySelector('input[type="email"]').value;
    const phoneInput = this.querySelector('input[type="tel"]');
    const phone = phoneInput.value.trim();

    /* PHONE VALIDATION */
    // Check for valid digit count (10-15 digits)
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
        alert("Please enter a valid phone number (10-15 digits). E.g. +91 90000 12345");
        phoneInput.focus();
        return;
    }

    const interest = this.querySelector('select').value;
    const details = this.querySelector('textarea').value;

    // 2. Format Message
    const message = `*New Inquiry via Website*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Phone:* ${phone}%0A*Interest:* ${interest}%0A*Details:* ${details}`;

    // 3. Open WhatsApp
    const whatsappUrl = `https://wa.me/919908799084?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // 4. Reset
    this.reset();
});

/* HEADER SCROLL EFFECT */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

/* VIDEO PLAYLIST SCRIPT */
function playVideo(videoId, element) {
    // Update Iframe
    const iframe = document.getElementById('mainPlayer');
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&autoplay=1`;

    // Update Active State in List
    document.querySelectorAll('.playlist-item').forEach(item => item.classList.remove('active'));
    element.classList.add('active');
}

window.addEventListener('load', () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                if (entry.target.classList.contains('stats-wrapper')) {
                    document.querySelectorAll('.counter').forEach(c => {
                        const t = +c.getAttribute('data-target');
                        const inc = t / 50;
                        const update = () => {
                            const val = +c.innerText;
                            if (val < t) { c.innerText = Math.ceil(val + inc); setTimeout(update, 30); }
                            else { c.innerText = t + "+"; }
                        };
                        update();
                    });
                }
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
});
