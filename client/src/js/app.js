import '../scss/styles.scss';


import { createCheckoutForm, createElement, createProductCard, updateProductPrice, myBurger} from './helpers/domHelpers.js';
import {API_CATEGORIES_LIST, API_PRODUCTS_BY_CATEGORY_ID} from './urls.js';

let productsArr = [];
let currentProduct = {};


const changeSizeHandler = function(event) {
  const size = event.target.value; //
  myBurger.changeSize(size);
  currentProduct.updatedPrice = myBurger.calculatePrice(currentProduct.price);
  updateProductPrice(currentProduct.updatedPrice);
}

const changeToppingHandler = function(event) {
  const toppingName = event.target.value;
  myBurger.changeStuffing(toppingName);
  currentProduct.updatedPrice = myBurger.calculatePrice(currentProduct.price);
  updateProductPrice(currentProduct.updatedPrice);
}

const clickBuyHandler = function(event) {
  const productId = event.target.getAttribute('data-product-id'); // ok
  currentProduct = productsArr.find(product => product.id === productId);
  currentProduct.updatedPrice = currentProduct.price;
  createCheckoutForm(currentProduct, changeSizeHandler, changeToppingHandler);
}

const menuItemClickHandler = function(event) {
  const currentId = event.target.getAttribute('data-menu-item');
  
  fetch(API_PRODUCTS_BY_CATEGORY_ID.replace(':category', currentId))
    .then(res => res.json())
    .then(products => {
      productsArr = products;

      document.querySelector('#content').innerHTML = '';
      for(let product of products) {
        createProductCard(product, clickBuyHandler);
      }
    })
}

// onload:
fetch(API_CATEGORIES_LIST)
  .then(res => res.json())
  .then(categories => {

    for(let category of categories) {
      createElement(
        'li',
        category.name, 
        {
          'data-menu-item': category.id,
          // className: 'navbar navbar-expand-lg bg-body-tertiary'
        },
        {
          click: menuItemClickHandler
        },
        '#menu ul'
      );
    }
  })