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

export default calc;
