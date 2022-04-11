/** open/close cart -------- Start **/
const cartLinkBtn = document.querySelector('.header__cart-link');
const cartWrapperOpened = document.querySelector('.cart-wrapper');
const cartClose = document.querySelector('.cart__close');
const body = document.querySelector('body');

cartLinkBtn.addEventListener('click', function () {
   cartWrapperOpened.classList.add('active');
   body.classList.add('active');

   if (cartWrapper.children.length === 0) {  
      cartWrapperOpened.classList.remove('active');
      body.classList.remove('active');
   };
});

cartClose.addEventListener('click', function () {
   cartWrapperOpened.classList.remove('active');
   body.classList.remove('active');
});
/** open/close cart -------- End **/

const cartWrapper = document.querySelector('.cart__products');
const totalPriceDiv = document.querySelector('.cart__total-price span');
const counter = document.querySelector('.header__cart-link span');
document.addEventListener('click', function (e) {
	if (e.target.hasAttribute('data-cart')) {
/** Fly cart -------- Start **/
		const card = e.target.closest('.product');
		const cartIcon = document.querySelector('.header__cart-link img');
		const img = card.querySelector('.product__img');

		const imgFly = img.cloneNode(true);

		const imgFlyWidth = img.offsetWidth;
		const imgFlyHeight = img.offsetHeight;
		const imgFlyLeft = img.getBoundingClientRect().left;
		const imgFlyTop = img.getBoundingClientRect().top;

		imgFly.setAttribute('class', 'flyImage');

		imgFly.style.cssText = `
		top: ${imgFlyTop}px;
		left: ${imgFlyLeft}px;
		width: ${imgFlyWidth}px;
		heigth: ${imgFlyHeight}px;`

		document.body.append(imgFly);

		const cartFlyLeft = cartIcon.getBoundingClientRect().right;
		const cartFlyTop = cartIcon.getBoundingClientRect().top;

		imgFly.style.cssText = `
		top: ${cartFlyTop}px;
		left: ${cartFlyLeft}px;
		width: 10px;
		heigth: 10px;
		opacity: 0;`
/** Fly cart -------- End **/

		const productInfo = {
			imgSrc: card.querySelector('.product__img').getAttribute('src'),
			title: card.querySelector('.product__title').innerText,
			price: card.querySelector('.product__price').innerText
		};

		const cartItemHtml = `<div class="cart__item">
			<img class="cart__img" src="${productInfo.imgSrc}" alt="">
			<div class="cart__item-content">
   			<div class="cart__title">${productInfo.title}</div>
   			<div class="cart__price">${productInfo.price}</div>
			</div>
			<button data-delete class="cart__item-delete">&#10005;</button>
			</div>`
		cartWrapper.insertAdjacentHTML('beforeend', cartItemHtml);

		calcTotalPrice();

		setTimeout(function () {
			counter.innerText++
		}, 800);	
	};	
});	

function calcTotalPrice() {
	const items = document.querySelectorAll('.cart__item');
	let totalPriceSum = 0;
	items.forEach(function (item) {
		const priceEl = item.querySelector('.cart__price').innerText;
		totalPriceSum += parseInt(priceEl);
		totalPriceDiv.innerText = totalPriceSum;
	});	
};	

document.addEventListener('click', function (e) {
	if (e.target.hasAttribute('data-delete')) {
		e.target.closest('.cart__item').remove();
		calcTotalPrice();
		counter.innerText--

		if (cartWrapper.children.length === 0) {
			totalPriceSum = 0;
			cartWrapperOpened.classList.remove('active');
			body.classList.remove('active');
			totalPriceDiv.innerText = totalPriceSum;
		};	
	};	
});	

/* Validation ----------------------------Start*/
let selector = document.querySelectorAll('input[type="tel"]');
let im = new Inputmask('+7 (999) 999-99-99');
im.mask(selector);

let validateForms = function (selector, rules, succesModal, yaGoal) {
	new window.JustValidate(selector, {
		rules: rules,
		submitHandler: function(form) {
		
			/* Добавление товаров в массив для отправки на почту ---Start*/
			let productArray = [];
			let i = 0
			const cardProducts =  document.querySelectorAll('.cart__title')
			cardProducts.forEach(function () {
				productArray.push(cardProducts[i].innerText)
				i++
			})
			/* Добавление товара в массив для отправки на почту ------End*/
		
			let formData = new FormData(form);
			formData.append('Товары', JSON.stringify(productArray));
			formData.append('Итого', totalPriceDiv.innerText);
		
			let xhr = new XMLHttpRequest();
		
			xhr.onreadystatechange = function() {
				if (xhr.readyState === 4) {
					if (xhr.status === 200) {
						document.location.href = 'thanks.html';
					}else {
						document.location.href = 'error.html';
					}
				}
			}
			
			xhr.open('POST', 'mail.php', true);
			xhr.send(formData);
		}
	});
}
validateForms('.form', { adress: {required: true, minLength: true}, tel: {required: true} });
/* Validation ------------------------------End*/



