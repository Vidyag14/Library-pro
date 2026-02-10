// ===========================
// About Page JavaScript (FINAL FIXED VERSION)
// ===========================

document.addEventListener('DOMContentLoaded', function () {

    console.log('🚀 Initializing About Page JS');

    // ===========================
    // Navbar Scroll Effect
    // ===========================
    const navbar = document.getElementById('mainNav');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.pageYOffset > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // ===========================
    // Back to Top Button
    // ===========================
    const backToTop = document.getElementById('backToTop');

    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.style.display =
                window.pageYOffset > 300 ? 'flex' : 'none';
        });

        backToTop.addEventListener('click', function (e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===========================
    // Intersection Observer (Fade-in Sections)
    // ===========================
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });
    }

    // ===========================
    // Floating Particles
    // ===========================
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const count = window.innerWidth < 768 ? 30 : 50;

        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            particle.style.left = Math.random() * 100 + '%';
            particle.style.setProperty('--drift', ((Math.random() - 0.5) * 100) + 'px');
            particle.style.animationDuration = (15 + Math.random() * 20) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';

            const size = 2 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            container.appendChild(particle);
        }
    }

    createParticles();

    // ===========================
    // Animated Counters
    // ===========================
    function animateCounter(el, target) {
        let current = 0;
        const increment = target / 100;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, 30);
    }

    if ('IntersectionObserver' in window) {
        const counterObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.dataset.counted) {
                    entry.target.dataset.counted = 'true';
                    const target = parseInt(entry.target.dataset.target);

                    if (!isNaN(target)) {
                        animateCounter(entry.target, target);
                    }
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.counter').forEach(counter => {
            counterObserver.observe(counter);
        });
    }

    // ===========================
    // Smooth Anchor Scroll
    // ===========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ===========================
    // Glass Card Tilt Effect (Desktop Only)
    // ===========================
    if (window.innerWidth > 768) {
        document.querySelectorAll('.glass-card').forEach(card => {

            card.addEventListener('mousemove', function (e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const rotateX = (y - rect.height / 2) / 20;
                const rotateY = (rect.width / 2 - x) / 20;

                this.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
            });

            card.addEventListener('mouseleave', function () {
                this.style.transform = '';
            });
        });
    }

    // ===========================
    // Hero Parallax Effect
    // ===========================
    const hero = document.querySelector('.about-hero');

    if (hero) {
        window.addEventListener('scroll', function () {
            hero.style.transform =
                `translateY(${window.pageYOffset * 0.5}px)`;
        });
    }

    console.log('✨ About page loaded successfully!');
});
