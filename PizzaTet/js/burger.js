const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.menu');
burger.addEventListener('click', function () {
    burger.classList.toggle('active');
    menu.classList.toggle('active');

    document.querySelector('main').onclick = function () {
        burger.classList.remove('active');
        menu.classList.remove('active');
    };

    document.querySelector('.menu__list').onclick = function () {
        burger.classList.remove('active');
        menu.classList.remove('active');
    };
});