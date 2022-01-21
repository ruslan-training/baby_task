// // Импорт функционала ==============================================================================================================================================================================================================================================================================================================================
// import { isMobile } from "./functions.js";
// import { formsModules } from "./forms/forms.js";

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
	const footerInput = document.querySelector('.footer-nav__input'),
		footerBtn = document.querySelector('.footer-nav__input-button'),
		footerPopup = document.querySelector('.footer-nav__button'),
		popupErr = document.querySelector('.footer-nav__error');
		
		footerInput.addEventListener('click', ()=> {
		footerBtn.classList.add('_active')

		window.onclick = (e)=> {
			if(e.target == footerInput) {
				return
			} else {
				footerBtn.classList.remove('_active')
			}
		}
	})
	footerInput.addEventListener('blur', e => {
		const hasValid = ~e.target.value.indexOf('@') !== 0
		!hasValid ? footerInput.classList.add('_error') : footerInput.classList.remove('_error')
		if(footerInput.classList.contains('_error')) {
			popupErr.textContent = (`Вы ввели не верный адрес электронной почты`)
		}

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
		  addToFavorite = document.querySelector('.to-cart__favorite')
		

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
				const cartIcon = document.querySelector('.cartIcon'),
					  cartQuantity = cartIcon.querySelector('span'),
					  productName = document.querySelector('.details__title'),
					  popupTextAlertAdd = document.querySelector('.popup__addAlert'),
					  popupQuantity = document.querySelector('.popup__quantity')

				if(productName) {
					popupTextAlertAdd.textContent = (`Товар ${productName.textContent} в количестве ${productsQuantity.value}шт, добавлен в корзину`)
				}
					  
				if(cartQuantity) {
					cartQuantity.innerHTML = productsQuantity.value
					
				} else if (productsQuantity.value > 0) {
					cartIcon.insertAdjacentHTML('beforeend', `<span>${productsQuantity.value}</span>`)
				}
			})

			addToFavorite.addEventListener('click', function addToFavorite(){
				const popupTextAlerFav = document.querySelector('.popup__favoriteAlert'),
					  productName = document.querySelector('.details__title'),
					  favIcon = document.querySelector('.to-cart__favorite svg')

				popupTextAlerFav.textContent = (`Товар ${productName.textContent}, добавлен в избранное`)
				favIcon.style.fill = '#fff'
			})
//=============================================POPUP===============================================================================================================================================================================================================================================
	const popupLinks = document.querySelectorAll('.popup-link');
	const body = document.querySelector('body');
	const lockPadding = document.querySelectorAll(".lock-padding");

	let unlock = true;

	const timeout = 800;

	if (popupLinks.length > 0) {
		for (let index = 0; index < popupLinks.length; index++) {
			const popupLink = popupLinks[index];
			popupLink.addEventListener("click", function (e) {
				const popupName = popupLink.getAttribute('href').replace('#', '');
				const curentPopup = document.getElementById(popupName);
				popupOpen(curentPopup);
				e.preventDefault();
			});
		}
	}
	const popupCloseIcon = document.querySelectorAll('.close-popup');
	if (popupCloseIcon.length > 0) {
		for (let index = 0; index < popupCloseIcon.length; index++) {
			const el = popupCloseIcon[index];
			el.addEventListener('click', function (e) {
				popupClose(el.closest('.popup'));
				e.preventDefault();
			});
		}
	}
	function popupOpen(curentPopup) {
		if (curentPopup && unlock) {
			const popupActive = document.querySelector('.popup.open');
			console.log(curentPopup)
			if (popupActive) {
				popupClose(popupActive, false);
			} else {
				bodyLock();
			}
			curentPopup.classList.add('open');
			curentPopup.addEventListener("click", function (e) {
				if (!e.target.closest('.popup__content')) {
					popupClose(e.target.closest('.popup'));
				}
			});
		}
	}

	function popupClose(popupActive, doUnlock = true) {
		if (unlock) {
			popupActive.classList.remove('open');
			if (doUnlock) {
				bodyUnLock();
			}
		}
	}

	function bodyLock() {
		const lockPaddingValue = window.innerWidth - document.querySelector('.main-wrapper').offsetWidth + 'px';

		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = lockPaddingValue;
			}
		}
		body.style.paddingRight = lockPaddingValue;
		body.classList.add('lock');

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	function bodyUnLock() {
		setTimeout(function () {
			if (lockPadding.length > 0) {
				for (let index = 0; index < lockPadding.length; index++) {
					const el = lockPadding[index];
					el.style.paddingRight = '0px';
				}
			}
			body.style.paddingRight = '0px';
			body.classList.remove('lock');
		}, timeout);

		unlock = false;
		setTimeout(function () {
			unlock = true;
		}, timeout);
	}

	document.addEventListener('keydown', function (e) {
		if (e.which === 27) {
			const popupActive = document.querySelector('.popup.open');
			popupClose(popupActive);
		}
	});

	(function () {
		// проверяем поддержку
		if (!Element.prototype.closest) {
			// реализуем
			Element.prototype.closest = function (css) {
				var node = this;
				while (node) {
					if (node.matches(css)) return node;
					else node = node.parentElement;
				}
				return null;
			};
		}
	})();
	(function () {
		// проверяем поддержку
		if (!Element.prototype.matches) {
			// определяем свойство
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.msMatchesSelector;
		}
	})();
