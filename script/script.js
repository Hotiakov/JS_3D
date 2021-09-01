document.addEventListener("DOMContentLoaded", () => {

    //Таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector("#timer-hours"),
            timerMinutes = document.querySelector("#timer-minutes"),
            timerSeconds = document.querySelector("#timer-seconds"),
            dateStop = new Date(deadline).getTime();
        // eslint-disable-next-line prefer-const
        let timerId;

        const getTimeRemaining = () => {
            const dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor(timeRemaining / 60) % 60,
                hours = Math.floor(timeRemaining / 3600);
            return { hours, minutes, seconds, timeRemaining };
        };
        const updateTime = () => {
            const timer = getTimeRemaining();
            if (timer.timeRemaining > 0) {
                timerHours.textContent = ("00" + timer.hours).slice(-2);
                timerMinutes.textContent = ("00" + timer.minutes).slice(-2);
                timerSeconds.textContent = ("00" + timer.seconds).slice(-2);
            } else {
                timerHours.textContent = "00";
                timerMinutes.textContent = "00";
                timerSeconds.textContent = "00";
                document.querySelector("#timer").style.color = "red";
                clearInterval(timerId);
            }
        };

        timerId = setInterval(updateTime, 1000);
    };
    countTimer("18 august 2021, 12:40:00");

    //Меню
    const toggleMenu = () => {
        const menu = document.querySelector("menu");

        const actionMenu = () => {
            if (document.documentElement.clientWidth >= 768) {
                menu.style.transition = '1s';
                menu.classList.toggle('active-menu');
            } else {
                menu.style.transition = '0s';
                menu.classList.toggle('active-menu');
            }
        };

        document.body.addEventListener('click', e => {
            if (e.target.closest(".menu") || e.target.closest('menu')) {
                e.preventDefault();
                if (e.target.tagName === "A" || e.target.closest(".menu")) {
                    actionMenu();
                }
            } else {
                menu.style.transition = '1s';
                menu.classList.remove('active-menu');
            }
        });
    };
    toggleMenu();


    //pop-up окно
    const popUpAnimationOpen = () => {
        if (document.documentElement.clientWidth > 768) {
            const popUpContent = document.querySelector(".popup-content");
            popUpContent.style.top = '-25%';
            let curPosition = -25;
            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate);
                if (curPosition <= 10) {
                    curPosition += 2;
                    popUpContent.style.top = curPosition + '%';
                } else {
                    cancelAnimationFrame(animationId);
                }
            };
            animationId = requestAnimationFrame(animate);
        }
    };
    const popUpAnimationClose = () => {
        if (document.documentElement.clientWidth >= 768) {
            const popUpContent = document.querySelector(".popup-content");
            let curPosition = 10;
            let animationId;
            const animate = () => {
                animationId = requestAnimationFrame(animate);
                if (curPosition > -25) {
                    curPosition -= 4;
                    popUpContent.style.top = curPosition + '%';
                } else {
                    cancelAnimationFrame(animationId);
                }
            };
            animationId = requestAnimationFrame(animate);
        }
    };
    const togglePopUp = () => {
        const popup = document.querySelector('.popup'),
            popupBtn = document.querySelectorAll('.popup-btn');

        popupBtn.forEach(item => {
            item.addEventListener('click', e => {
                e.preventDefault();
                popUpAnimationOpen();
                popup.style.display = 'block';
            });
        });
        popup.addEventListener('click', e => {
            let target = e.target;

            if (target.classList.contains('popup-close')) {
                e.preventDefault();
                popUpAnimationClose();
                setTimeout(() => { popup.style.display = 'none'; }, 200);
            } else {
                target = target.closest('.popup-content');
                if (!target) {
                    popUpAnimationClose();
                    setTimeout(() => { popup.style.display = 'none'; }, 200);
                }
            }
        });
    };
    togglePopUp();

    //табы
    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tabs = tabHeader.querySelectorAll('.service-header-tab'),
            tabsContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabsContent.length; i++) {
                if (i === index) {
                    tabsContent[i].classList.remove('d-none');
                    tabs[i].classList.add('active');
                } else {
                    tabsContent[i].classList.add('d-none');
                    tabs[i].classList.remove('active');
                }
            }
        };

        tabHeader.addEventListener('click', e => {
            let target = e.target;
            target = target.closest('.service-header-tab');
            if (target) {
                tabs.forEach((item, index) => {
                    if (item === target) {
                        toggleTabContent(index);
                    }
                });
            }
        });

    };
    tabs();

    //Слайдер
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
    slider();
    //эффект при наведении
    const imgHover = () => {
        const images = document.querySelectorAll('.command__photo');
        images.forEach(item => {
            const img = item.src;
            item.addEventListener('mouseenter', () => {
                item.src = item.dataset.img;
            });
            item.addEventListener('mouseleave', () => {
                item.src = img;
            });
        });
    };
    imgHover();

    //Калькулятор
    const calc = (price = 100) => {
        const calcBlock = document.querySelector('.calc-block'),
            calcType = calcBlock.querySelector('.calc-type'),
            calcSquare = calcBlock.querySelector('.calc-square'),
            calcCount = calcBlock.querySelector('.calc-count'),
            calcDay = calcBlock.querySelector('.calc-day'),
            totalValue = document.getElementById('total');



        const countSum = () => {
            let total = 0,
                countValue = 1,
                dayValue = 1;
            let animationId;
            const animationCalc = (step = 10) => {
                animationId = requestAnimationFrame(() => animationCalc(step));
                if (+totalValue.textContent < total) {
                    if (total - totalValue.textContent > step) {
                        totalValue.textContent = Math.round(+totalValue.textContent + step);
                    } else {
                        totalValue.textContent = Math.round(total);
                    }
                } else {
                    cancelAnimationFrame(animationId);
                }

            };
            const typeValue = calcType.value, squareValue = +calcSquare.value;
            if (calcCount.value > 1) {
                countValue += (+calcCount.value - 1) / 10;
            }

            if (calcDay.value && calcDay.value < 5) {
                dayValue = 2;
            } else if (calcDay.value && calcDay.value < 10) {
                dayValue = 1.5;
            }

            if (!!typeValue && !!squareValue) {
                total = price * typeValue * squareValue * countValue * dayValue;
            }
            totalValue.textContent = 0;
            animationId = requestAnimationFrame(() => animationCalc(10 ** (total.toString().length - 2)));
        };

        calcBlock.addEventListener('change', e => {
            const target = e.target;
            if (target.matches('select') || target.matches('input')) {
                countSum();
            }
        });

    };
    calc();

    //Валидация
    const validation = () => {
        const style = document.createElement('style');
        style.textContent = `
            .validator-error{
                display: inline-block;
                font-size: 12px;
                font-family: sans-serif;
                color: red;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
            }
        `;
        document.head.appendChild(style);
        const showError = elem => {
            elem.style.border = '3px solid red';
            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                return;
            }
            const errorDiv = document.createElement('div');
            errorDiv.textContent = 'Ошибка в этом поле';
            errorDiv.classList.add('validator-error');
            elem.insertAdjacentElement('afterend', errorDiv);
        };
        const showSuccess = elem => {
            elem.style.border = '3px solid green';

            if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
                elem.nextElementSibling.remove();
            }
        };
        const numReg = /^\d*$/,
            strReg = /^[а-яё\- ]*$/i,
            emailReg = /^([a-z]+[-_!~*'.]*[a-z]*)+@([a-z]+[-_!~*']*[a-z]*)+\.[a-z]{2,3}$/i,
            phoneReg = /^(\+7|8)([-()]*\d){10}$/;
        const calcItems = document.querySelectorAll('input.calc-item');
        calcItems.forEach(item => {
            item.addEventListener('blur', () => {
                if (!numReg.test(item.value)) {
                    alert('В полях калькулятора должны быть введены числа!');
                }
                item.value = item.value.replace(/\D/g, '');
            });
        });

        const userStringInputs = [...document.querySelectorAll('[name="user_name"]')];
        userStringInputs.forEach(item => {
            const subBtn = item.closest('form').querySelector('button');
            item.addEventListener('blur', () => {
                if (!strReg.test(item.value)) {
                    showError(item);
                    subBtn.disabled = true;
                } else {
                    showSuccess(item);
                    subBtn.disabled = false;
                }
                item.value = item.value.replace(/\s+/g, ' ')
                    .replace(/-+/g, '-')
                    .replace(/^\s/g, '')
                    .replace(/^-+/g, '');
            });
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^а-яё\- ]/gi, '');

            });
        });
        const msgInputs = document.querySelector(".mess");
        msgInputs.addEventListener('blur', () => {
            msgInputs.value = msgInputs.value.replace(/\s+/g, ' ')
                .replace(/-+/g, '-')
                .replace(/^\s/g, '')
                .replace(/^-+/g, '');
        });
        msgInputs.addEventListener('input', () => {
            msgInputs.value = msgInputs.value.replace(/[^а-яё\-,.!? ]/gi, '');
        });
        const emailInputs = document.querySelectorAll('[name="user_email"]');
        emailInputs.forEach(item => {
            const subBtn = item.closest('form').querySelector('button');
            item.addEventListener('blur', () => {
                if (!emailReg.test(item.value)) {
                    showError(item);
                    subBtn.disabled = true;
                } else {
                    showSuccess(item);
                    subBtn.disabled = false;
                }
                item.value = item.value.replace(/-+/g, '-');
            });
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^a-z\-_!~*'.@]/gi, '');
            });
        });

        const phoneInputs = document.querySelectorAll('[name="user_phone"]');
        phoneInputs.forEach(item => {
            const subBtn = item.closest('form').querySelector('button');
            item.addEventListener('blur', () => {
                if (!phoneReg.test(item.value)) {
                    showError(item);
                    subBtn.disabled = true;
                } else {
                    showSuccess(item);
                    subBtn.disabled = false;
                }
                item.value = item.value.replace(/\++/g, '+');
            });
            item.addEventListener('input', () => {
                item.value = item.value.replace(/[^+\d()-]/g, '');
            });
        });
    };
    validation();

    //send-ajax-form
    const createLoadAnim = () => {
        const loadAnim = document.createElement('div');
        loadAnim.className = 'sk-wave';
        loadAnim.insertAdjacentHTML('afterbegin', `
            <div class="sk-rect sk-rect-1"></div>
            <div class="sk-rect sk-rect-2"></div>
            <div class="sk-rect sk-rect-3"></div>
            <div class="sk-rect sk-rect-4"></div>
            <div class="sk-rect sk-rect-5"></div>
        `);
        document.head.insertAdjacentHTML("beforeend", `
            <style>
            .sk-wave {
                width: 6em;
                height: 4em;
                margin: auto;
                text-align: center;
                font-size: 1em;
                }
                .sk-wave .sk-rect {
                background-color: #337ab7;
                height: 100%;
                width: 0.5em;
                display: inline-block;
                -webkit-animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
                        animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
                }
                .sk-wave .sk-rect-1 {
                -webkit-animation-delay: -1.2s;
                        animation-delay: -1.2s;
                }
                .sk-wave .sk-rect-2 {
                -webkit-animation-delay: -1.1s;
                        animation-delay: -1.1s;
                }
                .sk-wave .sk-rect-3 {
                -webkit-animation-delay: -1s;
                        animation-delay: -1s;
                }
                .sk-wave .sk-rect-4 {
                -webkit-animation-delay: -0.9s;
                        animation-delay: -0.9s;
                }
                .sk-wave .sk-rect-5 {
                -webkit-animation-delay: -0.8s;
                        animation-delay: -0.8s;
                }
                @-webkit-keyframes sk-wave-stretch-delay {
                    0%, 40%, 100% {
                        transform: scaleY(0.4);
                    }
                    20% {
                        transform: scaleY(1);
                    }
                    }

                    @keyframes sk-wave-stretch-delay {
                    0%, 40%, 100% {
                        transform: scaleY(0.4);
                    }
                    20% {
                        transform: scaleY(1);
                    }
                    }
            </style>
        `);
        return loadAnim;
    };
    const sendForm = () => {
        const errorMessage = 'Что-то пошло не так...',
            successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

        const forms = document.querySelectorAll("form");

        const statusMessage = document.createElement('div');
        const loadAnim = createLoadAnim();
        statusMessage.style.cssText = 'font-size: 2rem; color: white;';

        const postData = body => fetch('./server.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });

        forms.forEach(item => {
            item.addEventListener('submit', e => {
                e.preventDefault();
                item.appendChild(statusMessage);
                statusMessage.textContent = '';
                statusMessage.insertAdjacentElement('afterbegin', loadAnim);
                const formData = new FormData(item);
                const body = {};
                for (const val of formData.entries()) {
                    body[val[0]] = val[1];
                }
                postData(body)
                    .then(request => {
                        if (request.status !== 200) throw new Error('Ошибка при отправке данных на сервер');
                        statusMessage.textContent = successMessage;
                        item.reset();
                        setTimeout(() => { statusMessage.textContent = ''; }, 3500);
                    })
                    .catch(err => {
                        statusMessage.textContent = errorMessage;
                        console.error(err);
                        setTimeout(() => { statusMessage.textContent = ''; }, 3500);
                    });
            });
        });
    };
    sendForm();

    //плавный скролл
    const smoothScroll = finish => {
        const scrollLength = finish - document.documentElement.scrollTop;
        const pixelToScroll = scrollLength / 10;
        let animationId;
        let sum = document.documentElement.scrollTop;
        const pageHeight = Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            if (document.documentElement.scrollTop + 2 < finish &&
                (pageHeight - window.pageYOffset) > document.documentElement.clientHeight) {
                sum = parseFloat((sum + pixelToScroll).toFixed(10));
                document.documentElement.scrollTop = parseFloat(sum.toFixed(10));
            } else {
                cancelAnimationFrame(animationId);
            }
        };
        animationId = requestAnimationFrame(animate);
    };
    const setScrollAnimation = () => {
        const menuLinks = [...document.querySelectorAll("menu>ul a")];
        menuLinks.push(document.querySelector("main>a"));
        menuLinks.forEach(item => {
            const targetToScroll = document.querySelector(item.getAttribute("href"));
            item.addEventListener('click', e => {
                e.preventDefault();
                smoothScroll(targetToScroll.offsetTop);
            });
        });
    };
    setScrollAnimation();

});
