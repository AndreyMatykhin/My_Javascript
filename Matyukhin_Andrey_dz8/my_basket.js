'use strict';

const Basket = {};
const cartIconEl = document.querySelector('.cartIconWrap');
const basketEl = document.querySelector('.basket');
let totalBasketCount = document.querySelector('.cartIconWrap').lastElementChild;
const basketTotalEl = document.querySelector('.basketTotal');
const basketValueEl = document.querySelector('.basketTotalValue');

cartIconEl.addEventListener('click', () => { basketEl.classList.toggle('hidden'); });
updateBasket();

const addToCartList = [...document.querySelectorAll('button')].
    filter(el => el.textContent.includes('Add to Cart'));
addToCartList.forEach(element => { element.addEventListener('click', (event) => { checkToCard(event.target) }); });

function checkToCard(element) {
    if (element != document.body) {
        if (element.parentElement.dataset.id != undefined &&
            element.parentElement.dataset.name != undefined &&
            element.parentElement.dataset.price != undefined) {
            addToBasket(element.parentElement);
        } else {
            checkToCard(element.parentElement);
        };
    };
};

function addToBasket(el) {
    if (!Basket[+el.dataset.id]) {
        Basket[+el.dataset.id] = {
            id: +el.dataset.id,
            name: el.dataset.name,
            price: +el.dataset.price,
            count: 0
        };
    };
    Basket[+el.dataset.id].count++;
    updateBasket();
};

function createBasketRow(element) {
    return `<div class="basketRow" data-id="${element.id}" >
      <div>${element.name}</div>
      <div class="productCount">${element.count} шт.</div>
      <div>$${element.price}</div>
      <div class="productTotalRow">$${(element.price * element.count).toFixed(2)}</div>
    </div > `;
}

function updateBasket() {
    let temp = 0;
    let totalCoast = 0;
    for (let el in Basket) {
        temp += Basket[el].count;
        totalCoast += Basket[el].price * Basket[el].count;
        let basketRowEl = basketEl.querySelector(`.basketRow[data-id="${el}"]`);
        if (!basketRowEl) {
            basketTotalEl.insertAdjacentHTML("beforebegin", createBasketRow(Basket[el]))
        } else {
            basketRowEl.querySelector('.productCount').innerText = `${Basket[el].count} шт.`;
            basketRowEl.querySelector('.productTotalRow').innerText = `$${(Basket[el].price * Basket[el].count).toFixed(2)}`;
        }
    }
    totalBasketCount.innerText = temp;
    basketValueEl.innerText = temp;
    basketTotalEl.childNodes[0].textContent = `Товаров в корзине на сумму:
                            $${totalCoast.toFixed(2)}`;
};






