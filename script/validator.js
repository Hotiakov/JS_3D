class Validator {
    constructor({ selector, pattern = {}, method }) {
        this.form = document.querySelector(selector);
        this.pattern = pattern;
        this.method = method;
        this.elementsForm = [...this.form.elements].filter(item => item.tagName.toLowerCase() !== 'BUTTON' && item.type !== 'button');
        this.error = new Set();
    }

    init() {
        this.applyStyle();
        this.setPattern();
        this.elementsForm.forEach(elem => elem.addEventListener('input', this.checkIt.bind(this)));
        this.form.addEventListener('submit', e => {
            this.elementsForm.forEach(elem => this.checkIt({ target: elem }));
            if (this.error.size) {
                e.preventDefault();
            }
        });
    }

    isValid(elem) {
        const validatorMethod = {
            notEmpty(elem) {
                if (elem.value.trim() === '') {
                    return false;
                }
                return true;
            },
            pattern(elem, _pattern) {
                return _pattern.test(elem.value);
            },
            acceptRusOnly(elem, _pattern) {
                if (!_pattern.test(elem.value)) {
                    elem.value = elem.value.replace(/[^а-яё\- ]/gi, '');
                    return false;
                }
                return true;
            }
        };

        if (this.method) {
            const method = this.method[elem.id];

            if (method) {
                return method.every(item => validatorMethod[item[0]](elem, this.pattern[item[1]]));
            }
        } else {
            console.warn("Необходимо передать id полей ввода и метод проверки этих полей");
        }

        return true;
    }

    checkIt(e) {
        const target = e.target;

        if (this.isValid(target)) {
            this.showSuccess(target);
            this.error.delete(target);
        } else {
            this.showError(target);
            this.error.add(target);
        }
    }


    showError(elem) {
        elem.classList.remove('success');
        elem.classList.add('error');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            return;
        }
        const errorDiv = document.createElement('div');
        errorDiv.textContent = 'Ошибка в этом поле';
        errorDiv.classList.add('validator-error');
        elem.insertAdjacentElement('afterend', errorDiv);
    }

    showSuccess(elem) {
        elem.classList.remove('error');
        elem.classList.add('success');
        if (elem.nextElementSibling && elem.nextElementSibling.classList.contains('validator-error')) {
            elem.nextElementSibling.remove();
        }
    }

    applyStyle() {
        const style = document.createElement('style');
        style.textContent = `
            input.success{
                border: 2px solid green !important;
            }
            input.error{
                border: 2px solid red !important;
            }
            .validator-error{
                font-size: 12px !important;
                font-family: sans-serif !important;
                color: red !important;
            }
        `;
        document.head.insertAdjacentElement('beforeend', style);
    }

    setPattern() {
        if (!this.pattern.phone)
            this.pattern.phone = /^\+?[78]([-()]*\d){10}$/;
        if (!this.pattern.email)
            this.pattern.email = /^\w+@\w+\.\w{2,}$/;
    }
}

const validator1 = new Validator({
    selector: '#form1',
    pattern: {
        "phone": /^(\+7|8)([-()]*\d){10}$/,
        "email": /^([a-z]+[-_!~*'.]*[a-z]*)+@([a-z]+[-_!~*']*[a-z]*)+\.[a-z]{2,3}$/i,
        "user_name": /^[а-яё\- ]*$/i
    },
    method: {
        'form1-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form1-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form1-name': [
            ['notEmpty'],
            // ['pattern', 'user_name'],
            ['acceptRusOnly', 'user_name']
        ]
    }
});
validator1.init();

const validator2 = new Validator({
    selector: '#form2',
    pattern: {
        "phone": /^(\+7|8)([-()]*\d){10}$/,
        "email": /^([a-z]+[-_!~*'.]*[a-z]*)+@([a-z]+[-_!~*']*[a-z]*)+\.[a-z]{2,3}$/i,
        "user_name": /^[а-яё\- ]*$/i
    },
    method: {
        'form2-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form2-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form2-name': [
            ['notEmpty'],
            ['pattern', 'user_name'],
            ['acceptRusOnly']
        ],
        'form2-message': [
            ['notEmpty'],
            // ['pattern', 'user_name'],
            ['acceptRusOnly', 'user_name']
        ]
    }
});
validator2.init();

const validator3 = new Validator({
    selector: '#form3',
    pattern: {
        "phone": /^(\+7|8)([-()]*\d){10}$/,
        "email": /^([a-z]+[-_!~*'.]*[a-z]*)+@([a-z]+[-_!~*']*[a-z]*)+\.[a-z]{2,3}$/i,
        "user_name": /^[а-яё\- ]*$/i
    },
    method: {
        'form3-phone': [
            ['notEmpty'],
            ['pattern', 'phone']
        ],
        'form3-email': [
            ['notEmpty'],
            ['pattern', 'email']
        ],
        'form3-name': [
            ['notEmpty'],
            // ['pattern', 'user_name'],
            ['acceptRusOnly']
        ],
    }
});
validator3.init();
