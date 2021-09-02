import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopUp from './modules/togglePopUp';
import tabs from './modules/tabs';
import slider from './modules/slider';
import imgHover from './modules/imgHover';
import calc from './modules/calc';
import validation from './modules/validation';
import sendForm from './modules/sendForm';
import setScrollAnimation from './modules/setScrollAnimation';

document.addEventListener("DOMContentLoaded", () => {

    //Таймер
    countTimer("18 august 2021, 12:40:00");

    //Меню
    toggleMenu();

    //pop-up окно
    togglePopUp();

    //табы
    tabs();

    //Слайдер
    slider();

    //эффект при наведении
    imgHover();

    //Калькулятор
    calc();

    //Валидация
    validation();

    //send-ajax-form
    sendForm();

    //плавный скролл
    setScrollAnimation();
});
