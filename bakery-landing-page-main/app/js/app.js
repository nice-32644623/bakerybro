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

        swiperElement.addEventListener('wheel', (e) => {
            if (e.deltaY > 0 && !swiper.isEnd) {
                e.preventDefault();
                swiper.slideNext();
            } else if (e.deltaY < 0 && !swiper.isBeginning) {
                e.preventDefault();
                swiper.slidePrev();
            }
        }, { passive: false });
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

    if (header) {
        window.addEventListener('scroll', () => {
            if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
                header.classList.add('shrink');
            } else {
                header.classList.remove('shrink');
            }
        });
    }
});
