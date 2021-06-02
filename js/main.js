class ProductList {
    #goods;
    #allProducts;
    #costAll;
    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];
        this.#costAll = 0;

        this.#fetchGoods();
        this.#render();
        this.#cost();
    }




    #fetchGoods() {
        this.#goods = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    #render() {
        const block = document.querySelector(this.container);

        for (let product of this.#goods) {
            const productObject = new ProductItem(product);

            this.#allProducts.push(productObject);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
    #cost() { // Метод определяющий сумму всех товаров.

        this.#goods.forEach( item => this.#costAll += item.price);

    }
}

class ProductItem {
    constructor(product, img = 'https://via.placeholder.com/200x150') {
        this.title = product.title;
        this.price = product.price;
        this.id = product.id;
        this.img = img;
    }

    render() {
        return `<div class="product-item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="buy-btn">Купить</button>
              </div>
          </div>`;
    }
}



class BasketList { // Пустой класс с корзиной
  #goodsInBasket;
  #gds;
    constructor(container = '.container') {
        this.container = container;
        this.#goodsInBasket = [];
        this.#gds = [];

        this.#removeItem();
        this.#addItem();
        this.#fetchGoods();
        this.#render();

    }

    #fetchGoods() {
        this.#goodsInBasket = [
            {id: 1, title: 'Notebook', price: 20000},
            {id: 2, title: 'Mouse', price: 1500},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500},
        ];
    }

    #render() {
        const block = document.querySelector(this.container);
        for (let product of this.#goodsInBasket) {
            const productObject = new BasketItem(product);

            this.#gds.push(productObject);
            console.log(this.#gds);
            block.insertAdjacentHTML('beforeend', productObject.render());
        }
    }
    #removeItem() {}

    #addItem() {}
}

class BasketItem extends ProductItem {
  constructor(product, img = 'https://via.placeholder.com/200x150') {
    super(product, img);
  }

  render() {
    return `<div class="basket_item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="basket_desc">
                  <h3>${this.title}</h3>
                  <p>${this.price} \u20bd</p>
                  <button class="remove_btn">-</button> <p class="quantity"></p> <button class="add_btn">+</button>
              </div>
          </div>`;
  }
}
const catalog = new ProductList();