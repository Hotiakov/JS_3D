const slider = () => {

    const slides = document.querySelectorAll('.portfolio-item'),
        slider = document.querySelector('.portfolio-content');
    const addDots = () => {
        const portfolioDots = document.querySelector('.portfolio-dots');

        for (let i = 0; i < slides.length; i++) {
            if (i === 0) {
                portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot dot-active"></li>');
            } else
                portfolioDots.insertAdjacentHTML('beforeend', '<li class="dot"></li>');
        }
    };
    addDots();

    const dots = document.querySelectorAll('.dot');

    let currentSlide = 0,
        interval;

    const prevSlide = (elem, index, strClass) => {
        elem[index].classList.remove(strClass);
    };
    const nextSlide = (elem, index, strClass) => {
        elem[index].classList.add(strClass);
    };

    const autoPlaySlide = () => {
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');
        currentSlide++;
        if (currentSlide >= slides.length)
            currentSlide = 0;
        nextSlide(dots, currentSlide, 'dot-active');
        nextSlide(slides, currentSlide, 'portfolio-item-active');
    };

    const startSlide = (time = 3000) => {
        interval = setInterval(autoPlaySlide, time);
    };

    const stopSlide = () => {
        clearInterval(interval);
    };

    slider.addEventListener('click', e => {
        e.preventDefault();
        const target = e.target;
        if (!(target.matches('.portfolio-btn') || target.matches('.dot'))) {
            return;
        }
        prevSlide(slides, currentSlide, 'portfolio-item-active');
        prevSlide(dots, currentSlide, 'dot-active');

        if (target.matches('#arrow-right')) {
            currentSlide++;
            if (currentSlide >= slides.length)
                currentSlide = 0;
        } else if (target.matches('#arrow-left')) {
            if (currentSlide === 0)
                currentSlide = slides.length - 1;
            else {
                currentSlide--;
            }
        } else if (target.matches('.dot')) {
            dots.forEach((item, index) => {
                if (item === target) {
                    currentSlide = index;
                }
            });
        }
        nextSlide(dots, currentSlide, 'dot-active');
        nextSlide(slides, currentSlide, 'portfolio-item-active');
    });

    slider.addEventListener('mouseover', e => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
            stopSlide();
        }
    });
    slider.addEventListener('mouseout', e => {
        if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
            startSlide();
        }
    });

    startSlide(2000);
};

export default slider;
