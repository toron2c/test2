/// Переведенное задание на промисы

let getRequest = (url) => {
    return new Promise((resolve, reject) => {

        let xhr = new XMLHttpRequest();
        xhr.open('GET', url, true);
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status !== 200) {
                    reject('Error');
                } else {
                    resolve(xhr.responseText);
                }
            }
        };
        xhr.send();
    })
};

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';



class ProductList {
    #goods;
    #allProducts;
    #costAll;
    constructor(container = '.products') {
        this.container = container;
        this.#goods = [];
        this.#allProducts = [];
        this.#costAll = 0;

        this.#getProducts()
            .then((data) => {
                this.#goods = data;
                this.#render();
            });
    }

    #getProducts() {
        return fetch(`${API}/catalogData.json`)
            .then((response) => response.json()).
            catch((err) => console.log(err));
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
        this.title = product.product_name;
        this.price = product.price;
        this.id = product.id_product;
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



class BasketList {

  #goodsInBasket;
  #gds;
    constructor(container = '.basket') {
        this.container = container;
        this.#goodsInBasket = [];
        this.#gds = [];

        this.#removeItem();
        this.#addItem();

        this.#getGoodsInBasket().
            then((data) => {
                this.#goodsInBasket = data.contents;
                this.#render();
        })

    }

    #getGoodsInBasket() {
        return fetch(`${API}/getBasket.json`)
            .then((response) => response.json()).
            catch((err) => console.log(err));
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
    this.quantity = product.quantity;
  }

  render() {
    return `<div class="basket_item" data-id="${this.id}">
              <img src="${this.img}" alt="Some img">
              <div class="basket_desc">
                  <h3>${this.title}</h3>
                  <p>Цена: ${this.price} \u20bd</p>
                 <p class="quantity">Количество: ${this.quantity}</p>
                 <button class="removeFromBasket">Удалить</button>
              </div>
          </div>`;
  }
}
const catalog = new ProductList();
// const basket = new BasketList();