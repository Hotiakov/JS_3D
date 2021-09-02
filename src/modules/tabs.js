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

export default tabs;
