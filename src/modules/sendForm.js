const createLoadAnim = () => {
    const loadAnim = document.createElement('div');
    loadAnim.className = 'sk-wave';
    loadAnim.insertAdjacentHTML('afterbegin', `
            <div class="sk-rect sk-rect-1"></div>
            <div class="sk-rect sk-rect-2"></div>
            <div class="sk-rect sk-rect-3"></div>
            <div class="sk-rect sk-rect-4"></div>
            <div class="sk-rect sk-rect-5"></div>
        `);
    document.head.insertAdjacentHTML("beforeend", `
            <style>
            .sk-wave {
                width: 6em;
                height: 4em;
                margin: auto;
                text-align: center;
                font-size: 1em;
                }
                .sk-wave .sk-rect {
                background-color: #337ab7;
                height: 100%;
                width: 0.5em;
                display: inline-block;
                -webkit-animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
                        animation: sk-wave-stretch-delay 1.2s infinite ease-in-out;
                }
                .sk-wave .sk-rect-1 {
                -webkit-animation-delay: -1.2s;
                        animation-delay: -1.2s;
                }
                .sk-wave .sk-rect-2 {
                -webkit-animation-delay: -1.1s;
                        animation-delay: -1.1s;
                }
                .sk-wave .sk-rect-3 {
                -webkit-animation-delay: -1s;
                        animation-delay: -1s;
                }
                .sk-wave .sk-rect-4 {
                -webkit-animation-delay: -0.9s;
                        animation-delay: -0.9s;
                }
                .sk-wave .sk-rect-5 {
                -webkit-animation-delay: -0.8s;
                        animation-delay: -0.8s;
                }
                @-webkit-keyframes sk-wave-stretch-delay {
                    0%, 40%, 100% {
                        transform: scaleY(0.4);
                    }
                    20% {
                        transform: scaleY(1);
                    }
                    }

                    @keyframes sk-wave-stretch-delay {
                    0%, 40%, 100% {
                        transform: scaleY(0.4);
                    }
                    20% {
                        transform: scaleY(1);
                    }
                    }
            </style>
        `);
    return loadAnim;
};
const sendForm = () => {
    const errorMessage = 'Что-то пошло не так...',
        successMessage = 'Спасибо! Мы скоро с вами свяжемся!';

    const forms = document.querySelectorAll("form");

    const statusMessage = document.createElement('div');
    const loadAnim = createLoadAnim();
    statusMessage.style.cssText = 'font-size: 2rem; color: white;';

    const postData = body => fetch('./server.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });

    forms.forEach(item => {
        item.addEventListener('submit', e => {
            e.preventDefault();
            item.appendChild(statusMessage);
            statusMessage.textContent = '';
            statusMessage.insertAdjacentElement('afterbegin', loadAnim);
            const formData = new FormData(item);
            const body = {};
            for (const val of formData.entries()) {
                body[val[0]] = val[1];
            }

            (async () => {
                const response = await postData(body);
                if (!response.ok) {
                    throw new Error('Ошибка при отправке данных на сервер');
                } else {
                    statusMessage.textContent = successMessage;
                    item.reset();
                    setTimeout(() => { statusMessage.textContent = ''; }, 3500);
                }
            })()
                .catch(err => {
                    statusMessage.textContent = errorMessage;
                    console.error(err);
                    setTimeout(() => { statusMessage.textContent = ''; }, 3500);
                });
        });
    });
};

export default sendForm;
