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

export default toggleMenu;
