'use strict';

class CheckoutProductList {
  productsStoreKey = 'cart-products';

  constructor(parentElement) {
    this.el = parentElement;

    this.parseData();

    // added event for button
    this._btn = document.querySelector('.product-list-box-wrapper');
    this._btn.addEventListener('click', event => this.clickBtnDelete(event));
  }

  parseData() {
    let orderTable = "";
    let rateReview;

    let localData = JSON.parse(localStorage.getItem(this.productsStoreKey));

    for (let item of localData) {
      let templateRate, ratingNum;

      // rating
      if (item.rating != null) {
        for (let [key, value] of Object.entries(item.rating)) {
          if (key === "stars") {
            ratingNum = +value;
          }

          if (key === "reviewsAmount") {
            rateReview = +value;
          }
        }

        templateRate = `
          <div class="rate" data-stars="${ratingNum}">

          </div>
          <p class="rate-amount d-none d-md-block mt-1">${rateReview} reviews</p>
        `;

      } else {
        templateRate = `
          <div class="rate" data-stars=""></div>
          <p class="rate-amount d-none d-md-block mt-1">0 reviews</p>
        `;
      }

      let templateForRow = `
        <div class="product-list-box">
          <div data-product-id="${item.id}" class="product-wrapper box-inner-col description-col">

            <div class="product-image-container">
              <img class="product-image" src="${item.imageUrl}" alt="img">
            </div>

            <div class="product-description">
              <h4 class="col-title mb-2">${item.title}</h4>

              ${templateRate}
            </div>

            <div class="product-price">
              <p class="mb-0 font-weight-light">Price:</p>
              <h4 class="col-title price-text mb-2">${item.price}</h4>
            </div>

            <div class="product-remove-button-wrapper">

            </div>
          </div>
        </div>
      `;

      orderTable += templateForRow;
    }

    this.el.insertAdjacentHTML(`afterBegin`, orderTable);

    let allCards = this.el.querySelectorAll('.rate');

    for (let oneCard of allCards) {
      this.makeStarsComponent(oneCard);
    }

    let allCardsDelete = this.el.querySelectorAll('.product-remove-button-wrapper');

    for (let oneCardItem of allCardsDelete) {
      this.addBtnDelete(oneCardItem);
    }
  }

  makeStarsComponent(itemstar) {
    let starElement = `<div class="icon-star"></div>`;
    let starCheckedElement = `<div class="icon-star checked"></div>`;

    let allStars = '';
    let checkedStars = itemstar.dataset.stars || 0;

    for(let i = 0; i < 5; i++) {
      if (checkedStars === 0) {
        allStars += starElement;
      } else {
        checkedStars -= 1;
        allStars += starCheckedElement;
      }
    }

    itemstar.insertAdjacentHTML('afterbegin', allStars);
  }

  addBtnDelete(item) {
    let btn = `
      <button type="button"
              data-button-role="checkout-remove-product"
              class="product-remove-button">
        X
      </button>
    `;

    item.insertAdjacentHTML(`afterBegin`, btn);
  }

  clickBtnDelete(event) {
    let storageIdNew;
    let target = event.target;
    let product = target.closest('.product-list-box');
    let productWrapper = target.closest('.product-wrapper');

    if (target.hasAttribute("data-button-role")) {
      let confirmDelete = confirm("Вы уверенны, что хотите удалить этот товар из корзины?");

      if(confirmDelete) {
        storageIdNew = +productWrapper.getAttribute("data-product-id");

        product.remove();

        let itemsArrayNew = JSON.parse(localStorage.getItem(this.productsStoreKey));

        let filteredIdNew = itemsArrayNew.filter(item => item.id !== storageIdNew);

        localStorage.setItem(this.productsStoreKey, JSON.stringify(filteredIdNew));
      }
    }
  }
}

window.CheckoutProductList = CheckoutProductList;
