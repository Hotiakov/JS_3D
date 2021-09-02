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

export default imgHover;
