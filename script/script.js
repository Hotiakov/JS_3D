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

    //плавный скролл
    const smoothScroll = finish => {
        const scrollLength = finish - document.documentElement.scrollTop;
        const pixelToScroll = scrollLength / 10;
        let animationId;
        let sum = document.documentElement.scrollTop;
        const animate = () => {
            animationId = requestAnimationFrame(animate);
            if (document.documentElement.scrollTop + 2 < finish &&
                window.innerHeight + window.pageYOffset < document.body.offsetHeight) {
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
