const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
  el: '#app',
  data: {
    catalogUrl: '/catalogData.json',
    products: [],
    filtered: [],
    imgCatalog: 'https://via.placeholder.com/200x150',
    imgCart: 'https://via.placeholder.com/50x100',
    basketUrl: '/getBasket.json',
    basket: [],
    isVisibleCart: false,
    searchLine: '',
  },
  methods: {
    getJson(url){
      return fetch(url)
          .then(result => result.json())
          .catch(error => {
            console.log(error);
          })
    },
    addProduct(product) {
      this.getJson(`${API}/addToBasket.json`)
          .then(data => {
            if (data.result === 1) {
              let find = this.basket.find(el => el.id_product === product.id_product);
              if (find) {
                find.quantity++;
              } else {
                let prod = Object.assign({quantity: 1}, product);
                this.basket.push(prod)
              }
            } else {
              alert('Error');
            }
          })
    },
    remove(item) {
      this.getJson(`${API}/deleteFromBasket.json`)
          .then(data => {
            if (data.result === 1) {
              if (item.quantity > 1) {
                item.quantity--;
              } else {
                this.basket.splice(this.basket.indexOf(item), 1)
              }
            }
          })
    },
    filter() {
      let regexp = new RegExp(this.searchLine, 'i');
      this.filtered = this.products.filter(el => regexp.test(el.product_name));
    },
  },

  beforeCreate() {

  },
  created() {

    },

  beforeMount() {

  },

  mounted() {
    this.getJson(`${API + this.basketUrl}`)
        .then(data => {
          for (let el of data.contents) {
            this.basket.push(el);
          }
        });
    this.getJson(`${API + this.catalogUrl}`)
        .then(data => {
          for (let el of data) {
            this.products.push(el);
            this.filtered.push(el);
          }
        });
  },


  beforeUpdate() {

  },

  updated() {

  },

  beforeDestroy() {

  },

  destroyed() {

  },
});
