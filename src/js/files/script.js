// // Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
import { isMobile } from "./functions.js";
import { formsModules } from "./forms/forms.js";

//===========================DROPDOWN MENU=====================================================================================================================================================================================================================================================================================

function show(anything) {
	let inputValue = document.querySelector('.dropdown__input')
	let optionsValue = document.querySelectorAll('.dropdown__item')  
	optionsValue.forEach((item, key) => {
		item.addEventListener('click', function(show){
			inputValue.value = item.textContent
		})
	})
}
show();

let dropDowns = document.querySelectorAll('.dropdown')

for(let dropDown of dropDowns) {
	dropDown.addEventListener('click', ()=> {
		dropDown.classList.toggle('_active')
		window.addEventListener('click', (e) => {
			let inputValue = document.querySelector('.dropdown__input'),
				optionsValue = document.querySelectorAll('.dropdown__item')  
			if(e.target == inputValue || e.target == optionsValue) {
				return
			} else {
				dropDown.classList.remove('_active')
			}
		})
	})
}

//===========================THUMB GALLERY=====================================================================================================================================================================================================================================================================================
const current = document.querySelector('#current'),
	imgs = document.querySelectorAll('.card__thumb-gallery img'),
	opacity = 0.3

	imgs[0].style.opacity = opacity;

	imgs.forEach(img => img.addEventListener('click', imgClick));

	function imgClick(e) {
		imgs.forEach(img => (img.style.opacity = 1))
		current.src = e.target.src;
		current.classList.add('fade-in')
		setInterval(()=> current.classList.remove('fade-in'), 500)
		e.target.style.opacity = opacity;
	}
//===========================CLEAR BTN=====================================================================================================================================================================================================================================================================================
	const footerForm = document.querySelector('.footer-nav__input'),
		footerBtn = document.querySelector('.footer-nav__input-button')
		
	footerForm.addEventListener('click', ()=> {
		footerBtn.classList.add('_active')

		window.onclick = (e)=> {
			if(e.target == footerForm) {
				return
			} else {
				footerBtn.classList.remove('_active')
			}
		}
	})
	footerForm.addEventListener('blur', e => {
		const hasValid = ~e.target.value.indexOf('@') !== 0
		console.log(hasValid);
		!hasValid ? footerForm.classList.add('_error') : footerForm.classList.remove('_error')
	})
	//===========================HEADER=MOVED====================================================================================================================================================================================================================================================================================
	
	let lastScrollTop = 0,
		header = document.querySelector('.header');

		window.addEventListener('scroll', ()=> {
			let scrollTop = window.scrollY || document.documentElement.scrollTop;
			if(scrollTop > lastScrollTop) {
				header.style.top = '-44px';
			} else {
				header.style.top = '0';
			}
			lastScrollTop = scrollTop;
		})
//==========================COUNTER====================================================================================================================================================================================================================================================================================
	const totalCount = document.querySelector('.total-counter'),
		  productsQuantity = document.querySelector('.to-cart__quantity-value'),
		  incrementBtn = document.querySelector('.increment'),
		  decrementBtn = document.querySelector('.decrement'),
		  addToCartBtn = document.querySelector('.to-cart__add'),
		  productName = document.querySelector('.details__title');

		  productsQuantity.value = 0

			incrementBtn.addEventListener('click', function increment(){
				productsQuantity.value++
			})
			decrementBtn.addEventListener('click', function decrement(){
				productsQuantity.value--
				if(productsQuantity.value > 0) {
					return
				} else if (productsQuantity.value < 0) {
					productsQuantity.value = 0
				}
			})
			addToCartBtn.addEventListener('click', function addToCart(){
				totalCount.textContent = productsQuantity.value
                productsQuantity.value = 0
				
				
			})