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

export default togglePopUp;
