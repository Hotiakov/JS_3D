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
            item.value = item.value.replace(/((?<=-| )[а-яё]+|[а-яё]+)/gi, mathes => mathes[0].toUpperCase() + mathes.slice(1).toLowerCase());
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

export default validation;
