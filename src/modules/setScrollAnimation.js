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

export default setScrollAnimation;
