class ProductList {
  productsUrl = '/assets/data/products.json';
  productsStoreKey = 'cart-products';

  constructor(element) {
    this.el = element;

    this.template = `
      <div class="row justify-content-end">
          <div class="col-lg-9">
              <h3 class="section-title">Top Recommendations for You</h3>
              <div class="row homepage-cards">
                  <!--ВОТ ЗДЕСЬ БУДУТ КАРТОЧКИ ТОВАРОВ-->
              </div>
          </div>
      </div>
    `;

    this.el.insertAdjacentHTML(`afterBegin`, this.template);

    // added event for BTN
    this._btn = this.el.querySelector('.homepage-cards');
    this._btn.addEventListener('click', event => this.clickBtn(event));

    this.alljson;
  }

  show() {
    let allTemplateForProducts = "";

    let allSlides = this.el.querySelector('.homepage-cards');

    let rateReview, oldPrice, tagDiscount, ratingNum;

    return fetch(this.productsUrl, {
      method: 'GET'
    })
    .then((response) => response.json())
    .then((json) => {
      this.alljson = json;

      for (let item of json) {

        let templateRate;

        // oldPrice
        if (item.oldPrice != null) {
          oldPrice = `<small class="ml-2">${item.oldPrice}</small>`;

          tagDiscount = "discount";
        } else {
          oldPrice = "";
          tagDiscount = "";
        }

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
              <span class="rate-amount ml-2">${rateReview}</span>
            </div>
          `;

        } else {
          templateRate = `
            <div class="rate" data-stars="">
              <span class="rate-amount ml-2">0</span>
            </div>
          `;
        }

        // template For Product
        let templateForProduct = `
          <div data-product-id="${item.id}" class="products-list-product col-md-6 col-lg-4 mb-4">
            <div class="card">
              <div class="card-img-wrap">
                <img class="card-img-top" src="${item.imageUrl}" alt="Card image cap">
              </div>

              <div class="card-body">
                <h5 class="card-title">${item.title}</h5>

                ${templateRate}

                <p class="card-text price-text ${tagDiscount}">
                  <strong>${item.price}</strong>
                  ${oldPrice}
                </p>

                <button class="product-add-to-cart" data-button-role="add-to-cart">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        `;

        allTemplateForProducts += templateForProduct;
      }

      allSlides.insertAdjacentHTML(`beforeend`, allTemplateForProducts);

      let allCards = this.el.querySelectorAll('.rate');

      for (let oneCard of allCards) {
        this.makeStarsComponent(oneCard);
      }
    });
  }

  clickBtn(event) {
    let target = event.target;
    let targetId = target.closest('.products-list-product');

    let storage, storageId;

    if(target.hasAttribute("data-button-role")) {
      let confirmPopup = confirm("Вы уверенны, что хотите добавить этот товар в корзину?");

      if (confirmPopup) {
        storageId = +targetId.getAttribute("data-product-id");

        let closestParent = targetId.closest('products-list-product');

        // Storage Code
        let itemsArray = localStorage.getItem(this.productsStoreKey) ? JSON.parse(localStorage.getItem(this.productsStoreKey)) : [];

        let filterId = itemsArray.find(item => item.id === storageId);

        if (filterId) {
          itemsArray;
        } else {
          for (let item of this.alljson) {
            if (item.id === storageId) {

              itemsArray.push(item);

              break;
            }
          }
        }

        localStorage.setItem(this.productsStoreKey, JSON.stringify(itemsArray));

        alert(storageId);
      }
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
}

// Делает класс доступным глобально, сделано для упрощения, чтобы можно было его вызывать из другого скрипта
window.ProductList = ProductList;
