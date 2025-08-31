document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    const overlay = document.querySelector('.mobile-overlay');
    const header = document.querySelector('header');

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (nav) nav.classList.toggle('active');
            if (overlay) overlay.classList.toggle('active');
            if (header) header.classList.toggle('active');
        });
    }

    const swiperElement = document.querySelector('.swiper');
    if (swiperElement) {
        const swiper = new Swiper('.swiper', {
            direction: 'horizontal',
            loop: false,
            slidesPerView: 3,
            centeredSlides: true,
            initialSlide: 1,
            speed: 500,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                clickable: true
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    centeredSlides: false
                },
                600: {
                    slidesPerView: 3,
                    centeredSlides: true
                }
            }
        });
    }

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.addEventListener('mousemove', (e) => {
            heroSection.querySelectorAll('.btn').forEach(btn => {
                const speed = btn.getAttribute('data-speed');
                const percent = 300;
                const x = (window.innerWidth - e.pageX * speed) / percent;
                const y = (window.innerHeight - e.pageY * speed) / percent;
                btn.style.transform = `translateX(${x}px) translateY(${y}px)`;
            });
        });
    }

    const sections = Array.from(document.querySelectorAll('.snap-section'));
    if (sections.length) {
        let activeSection = 0;
        let isScrollingSection = false;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    activeSection = sections.indexOf(entry.target);
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));

        window.addEventListener('wheel', (e) => {
            if (isScrollingSection) return;

            if (e.deltaY > 0 && activeSection < sections.length - 1) {
                e.preventDefault();
                isScrollingSection = true;
                sections[activeSection + 1].scrollIntoView({ behavior: 'smooth' });
            } else if (e.deltaY < 0 && activeSection > 0) {
                e.preventDefault();
                isScrollingSection = true;
                sections[activeSection - 1].scrollIntoView({ behavior: 'smooth' });
            }

            if (isScrollingSection) {
                setTimeout(() => {
                    isScrollingSection = false;
                }, 1000);
            }
        }, { passive: false });
    }

    const parallaxItems = document.querySelectorAll('[data-parallax]');
    let lastScrollY = window.pageYOffset;
    let blurTimeout;

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        if (header) {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        }

        if (parallaxItems.length) {
            parallaxItems.forEach(el => {
                const speed = parseFloat(el.dataset.parallax);
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
        }

        const diff = Math.abs(scrolled - lastScrollY);
        document.body.style.filter = `blur(${Math.min(diff / 40, 3)}px)`;
        clearTimeout(blurTimeout);
        blurTimeout = setTimeout(() => {
            document.body.style.filter = 'blur(0)';
        }, 100);

        lastScrollY = scrolled;
    });
});
