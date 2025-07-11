// Hero Slider Functionality
const heroSlides = document.querySelectorAll('.hero-slide');
let currentSlide = 0;

function showSlide(n) {
    heroSlides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + heroSlides.length) % heroSlides.length;
    heroSlides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);

// Initialize the slider
showSlide(0);

// Scroll Animation Functionality
const animateElements = document.querySelectorAll('.animate-on-scroll');
const sectionHeadings = document.querySelectorAll('.section-heading');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            if (entry.target.classList.contains('section-heading')) {
                setTimeout(() => {
                    entry.target.classList.add('animated');
                }, 300);
            }
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

animateElements.forEach(el => observer.observe(el));
sectionHeadings.forEach(el => observer.observe(el));

// ✅ Swiper Initialization
var swiper = new Swiper(".testimonials-slider", {
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false,
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 0,
});

// ✅ AOS Init (Only if AOS is included in HTML!)
if (typeof AOS !== 'undefined') {
    AOS.init({
        once: true,
        duration: 800,
    });
}

// ✅ Menu & Dropdown
function toggleMenu() {
    document.getElementById("navLinks").classList.toggle("show");
}

function closeMenu() {
    document.getElementById("navLinks").classList.remove("show");
    document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
}

function toggleDropdown(e) {
    if (window.innerWidth <= 991) {
        const content = e.target.nextElementSibling;
        const isOpen = content && content.classList.contains("show");

        if (!isOpen) {
            e.preventDefault();
            document.querySelectorAll(".dropdown-content").forEach(dc => dc.classList.remove("show"));
            if (content) content.classList.add("show");
        }
    }
}
