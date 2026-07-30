/* ============================================
   Abishek R V - Premium Portfolio JavaScript
   ============================================ */

(function () {
    'use strict';

    /* ============ Loading Screen ============ */
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });

    /* ============ Current Year ============ */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* ============ Custom Cursor ============ */
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (!isMobile && cursorDot && cursorOutline) {
        let mouseX = 0, mouseY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        function animateCursor() {
            outlineX += (mouseX - outlineX) * 0.15;
            outlineY += (mouseY - outlineY) * 0.15;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect on interactive elements
        const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, .project-card, .service-card, .skill-card, .why-card, .testimonial-card');
        interactiveElements.forEach((el) => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
        });
    }

    /* ============ Navbar Scroll Effects ============ */
    const navbar = document.getElementById('navbar');
    const scrollProgress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    function updateScroll() {
        const scrollY = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = (scrollY / docHeight) * 100;

        if (scrollProgress) scrollProgress.style.width = progress + '%';

        if (navbar) {
            if (scrollY > 50) {
                navbar.classList.add('glass-card');
                navbar.style.padding = '0.5rem 0';
            } else {
                navbar.classList.remove('glass-card');
                navbar.style.padding = '1rem 0';
            }
        }

        if (backToTop) {
            if (scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.pointerEvents = 'auto';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.pointerEvents = 'none';
            }
        }
    }
    window.addEventListener('scroll', updateScroll);

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    /* ============ Mobile Menu ============ */
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.className = 'fa-solid fa-bars text-xl';
                } else {
                    icon.className = 'fa-solid fa-xmark text-xl';
                }
            }
        });

        // Close menu on link click
        mobileMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const icon = menuBtn.querySelector('i');
                if (icon) icon.className = 'fa-solid fa-bars text-xl';
            });
        });
    }

    /* ============ Active Nav Link on Scroll ============ */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function setActiveLink() {
        const scrollY = window.scrollY + 150;
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    window.addEventListener('scroll', setActiveLink);

    /* ============ Reveal on Scroll ============ */
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    reveals.forEach((el) => revealObserver.observe(el));

    /* ============ Counter Animation ============ */
    const counters = document.querySelectorAll('.counter');
    let counterStarted = false;

    const counterObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !counterStarted) {
                    counterStarted = true;
                    counters.forEach((counter) => {
                        const target = parseInt(counter.dataset.target);
                        const duration = 2000;
                        const stepTime = 30;
                        const steps = duration / stepTime;
                        const increment = target / steps;
                        let current = 0;

                        const updateCounter = () => {
                            current += increment;
                            if (current < target) {
                                counter.textContent = Math.ceil(current);
                                setTimeout(updateCounter, stepTime);
                            } else {
                                counter.textContent = target;
                            }
                        };
                        updateCounter();
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));

    /* ============ Typewriter Effect ============ */
    const typewriterEl = document.querySelector('.typewriter');
    if (typewriterEl) {
        const phrases = [
            'AI Engineer',
            'Full Stack Developer',
            'Founder of ABI',
            'Machine Learning Enthusiast',
            'Problem Solver'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = isDeleting ? 50 : 100;

            if (!isDeleting && charIndex === currentPhrase.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }

    /* ============ Smooth Scroll ============ */
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId.length <= 1) return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                e.preventDefault();
                window.scrollTo({
                    top: targetEl.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    /* ============ Contact Form ============ */
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            // Simulate sending
            formMessage.classList.remove('hidden');
            formMessage.style.color = '#06B6D4';
            formMessage.textContent = '⏳ Sending your message...';

            setTimeout(() => {
                formMessage.style.color = '#10B981';
                formMessage.innerHTML = '✓ Thank you, ' + (data.name || 'there') + '! Your message has been sent successfully. I\'ll get back to you within 24 hours.';
                contactForm.reset();

                setTimeout(() => {
                    formMessage.classList.add('hidden');
                }, 5000);
            }, 1500);
        });
    }

    /* ============ Parallax on Mouse Move ============ */
    const heroSection = document.querySelector('#home');
    if (heroSection && !isMobile) {
        heroSection.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;
            const blobs = heroSection.querySelectorAll('.animate-blob');
            blobs.forEach((blob, i) => {
                const factor = (i + 1) * 0.5;
                blob.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });
    }

    /* ============ Lazy Load Images ============ */
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach((img) => imageObserver.observe(img));
    }

    /* ============ Console Signature ============ */
    console.log('%c👋 Hello there!', 'color: #7C3AED; font-size: 24px; font-weight: bold;');
    console.log('%cI\'m Abishek R V — AI Engineer & Full Stack Developer.', 'color: #06B6D4; font-size: 16px;');
    console.log('%cInterested in working together? Let\'s connect!', 'color: #A1A1AA; font-size: 14px;');
    console.log('%c📧 abhishekvadivelrv@gamil.com', 'color: #06B6D4; font-size: 14px;');

})();
