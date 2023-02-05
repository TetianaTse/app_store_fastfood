import {API_ORDERS} from '../urls.js';

export let myBurger;
export let myOrder = {};
class Hamburger {
    constructor(burger, sizeHamb, stuffHamb) {
        this.burger = burger;
        this.sizeHamb = sizeHamb;
        this.stuffHamb = stuffHamb;
    }

    static size = [
        {name: "Small", price: 50, calories: 20,},
        {name: "Big", price: 100, calories: 40,}
    ];
 
    static stuffing = [
        {name: 'Tomatoes', price: 10, calories: 10,},
        {name: 'Salad', price: 15, calories: 5,},
        {name: 'Potatoes', price: 20, calories: 20,},
        {name: 'Cheese', price: 20, calories: 20,}
    ];

    #totalPrice = 0;

    showBurger() {
      let myOrderHamb = {};
        if (this.stuffHamb !== undefined && this.stuffHamb !== null) {
          myOrderHamb = {name: this.burger, size: this.sizeHamb.name, stuffing: this.stuffHamb.name, price: this.#totalPrice};
          console.log(`Name: ${this.burger} Size: ${this.sizeHamb.name}, Stuffing: ${this.stuffHamb.name}, Price: ${this.#totalPrice}`);
        } else {
          myOrderHamb = {name: this.burger, size: this.sizeHamb.name, stuffing: 'no', price: this.#totalPrice};
          console.log(`Name: ${this.burger} Size: ${this.sizeHamb.name}, Stuffing: no, Price: ${this.#totalPrice}`);
        }
        return myOrderHamb;
    }
    changeSize(value) {
      if(value === 'big') {
        this.sizeHamb = Hamburger.size[1];
      } else {
        this.sizeHamb = Hamburger.size[0];
      }
    }
    changeStuffing(value) {
      if(value == 'Potatoes') {
        this.stuffHamb = Hamburger.stuffing[2];
      } else if (value == 'Salad') {
        this.stuffHamb = Hamburger.stuffing[1];
      } else if (value == 'Cheese') {
        this.stuffHamb = Hamburger.stuffing[3];
      } else if (value == 'Tomatoes') {
        this.stuffHamb = Hamburger.stuffing[0];
      } else {
        this.stuffHamb == undefined;
      }
    }

    calculatePrice(value) {
        let stuffPrice = 0;
        if (this.stuffHamb !== undefined) {
          stuffPrice += this.stuffHamb.price;
        }
        this.#totalPrice = value + this.sizeHamb.price + stuffPrice;
        return this.#totalPrice;
    }
}


export function createElement(tagName, content, attributes, eventHandlers, parent) {
  const parentElem = 
    typeof parent === 'string' ?
      document.querySelector(parent) :
      parent;
  const element = document.createElement(tagName);
  element.textContent = content;

  if (attributes && Object.keys(attributes).length > 0) {
    for (let key in attributes) {
      if (key === 'className') {
        element.setAttribute('class', attributes[key]);
      } else {
        element.setAttribute(key, attributes[key]);
      }
    }
  }

  if (eventHandlers && Object.keys(eventHandlers).length > 0) {
    for (let eventNameKey in eventHandlers) {
      element.addEventListener(eventNameKey, eventHandlers[eventNameKey]);
    }
  }

  parentElem.appendChild(element);
  return element;
}


export function createProductCard(product, clickBuyHandler) {
  document.querySelector('#content').classList.remove('hidden');
  document.querySelector('#order').classList.add('hidden');
  document.querySelector('.main_img').classList.add('hidden');
  
  const parentElem = createElement('div', '', {className: 'product_card card-body'}, null, '#content');
  createElement('img', null, {className: 'card-img-top', src: product.images}, null, parentElem);
  createElement('h3', product.name, {className: 'card-title'}, null, parentElem);
  createElement('p', `${product.price} UAH`, {className: 'card-text'}, null, parentElem);
  createElement(
    'input',
    '',
    {
      type: 'button',
      value: 'Buy',
      'data-product-id': product.id,
      className: "btn btn-success",
    },
    {click: clickBuyHandler},
    parentElem
  );

  /*
  <div class="product_card">
        <h3>Product name</h3>
        <p>UAH 150</p>
        <input type="button" data-product-id= value="Buy" />
      </div>
  */
}
let myProduct;

export function createCheckoutForm(product, changeSizeHandler, changeToppingHandler) {
  document.querySelector('#popup').classList.add('open');
  document.querySelector('#modal_details').innerHTML = '';
  document.querySelector('#modal_price').innerHTML = '';

  for (let key in myOrder) {delete myOrder[key];}
  for (let key in myBurger) {delete myBurger[key];}
  myProduct = product;
  
  myBurger = new Hamburger(product.name,Hamburger.size[0]);
  let startPrice = myBurger.calculatePrice(product.price);
  updateProductPrice(startPrice);
  

  createElement('p', product.name, {className: 'product_name'}, null, '#modal_details');

  const sizeP = createElement('p', '', null, null, '#modal_details');
  createElement('h4', 'Size:', null, null, sizeP);
  // Radio "small"
  createElement(
    'input',
    '',
    { type: 'radio', name: 'size', value: 'small', checked: 'checked', className: 'checked' },
    { change: changeSizeHandler },
    sizeP
  );
  createElement('span', 'Small', {className: 'product_text _text_mod'}, null, sizeP);
  
  // Radio "big"
  createElement(
    'input',
    '',
    { type: 'radio', name: 'size', value: 'big' },
    { change: changeSizeHandler },
    sizeP
  );
  createElement('span', 'Big', {className: 'product_text'}, null, sizeP);

  const toppingsP = createElement('p', '', null, null, '#modal_details');
  createElement('h4', 'Toppings:', null, null, toppingsP);

  for(let topping of product.available_toppings) {
    const p = createElement('p', '', null, null, toppingsP);
    createElement('input', '', { type: 'radio', name: 'toppings', value: topping.name }, {change: changeToppingHandler}, p);
    createElement('span', `${topping.name} ${topping.price} UAH`, {className: 'product_text'}, null, p)
  }

  const nameP = createElement('p', '', null, null, '#modal_details');
  createElement('input', '', {type: 'text', name: 'client_name', placeholder: 'Enter your name'}, null, nameP);
}

document.querySelector('#popup_order').addEventListener ('click', function() {
  document.querySelector('#popup').classList.remove('open');
  document.querySelector('#content').classList.add('hidden');
  document.querySelector('#order').classList.remove('hidden');
  document.querySelector('#order').innerHTML = '';

  myOrder = myBurger.showBurger();
  let clientName = document.querySelector('input[name="client_name"]').value;
  if(clientName ==='' || clientName === " ") {
    clientName = 'Dear client';
  }
  
  const parentOrder = createElement('div', '', {className: 'card_order'}, null, '#order');
  createElement('h2', 'Your order', {className: 'card-title _order'}, null, parentOrder);
  createElement('img', null, {className: 'card-img-top', src: myProduct.images}, null, parentOrder);
  createElement('h3', myOrder.name, {className: 'card-title_order'}, null, parentOrder);
  createElement('p', `SIZE: ${myOrder.size}`, {className: 'card-text_order'}, null, parentOrder);
  createElement('p', `STUFFING: ${myOrder.stuffing}`, {className: 'card-text_order'}, null, parentOrder);
  createElement('p', `PRICE: ${myOrder.price}`, {className: 'card-text_order'}, null, parentOrder);
  createElement('p', `${clientName}, thank you for your order!`, {className: 'card-text_mod'}, null, parentOrder);

// send
  fetch(API_ORDERS, {
    method: 'POST',
    body: JSON.stringify(myOrder),
    headers: {
      'Content-Type': 'application/json'
    },
  }).then(response => console.log(response));
});

document.querySelector('#popup_cancel').addEventListener ('click', function() {
  document.querySelector('#popup').classList.remove('open');
});

export function updateProductPrice(newPrice) {
  document.querySelector('#modal_price').innerHTML = '';
  createElement('span', `UAH ${newPrice}`, {className: 'product_price'}, null, '#modal_price');
}