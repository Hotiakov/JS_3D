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
            if (e.target.closest(".menu") || e.target.classList.contains("close-btn")) {
                actionMenu();
            } else if (e.target.tagName === "A") {
                menu.style.transition = '0s';
                menu.classList.remove('active-menu');
            }
        } else {
            menu.style.transition = '1s';
            menu.classList.remove('active-menu');
        }
    });
};

export default toggleMenu;
