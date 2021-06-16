Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://via.placeholder.com/50x100',
            basketUrl: '/getBasket.json',
            basket: [],
            isVisibleCart: false,
        }
    },
    methods:{
        addProduct(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if(data.result === 1){
                        let find = this.basket.find(el => el.id_product === product.id_product);
                            if(find){
                                find.quantity++;
                            } else {
                                let prod = Object.assign({quantity: 1}, product);
                                this.basket.push(prod);
                            }
                    } else {
                        alert('Error');
                    }
                })
        },
        remove(item) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if(data.result === 1) {
                        if(item.quantity > 1) {
                            item.quantity--;
                        } else {
                            this.basket.splice(this.basket.indexOf(item), 1);
                        }
                    } else {
                        alert('Error');
                    }
                })
        }
    },
    mounted() {
    this.$parent.getJson(`${API + this.basketUrl}`)
        .then(data => {
            for(let el of data.contents) {
                this.basket.push(el);
            }
        })
    },
    template: `
      <div> 
            <button class="btn-cart" type="button" @click="isVisibleCart = !isVisibleCart">Корзина</button>
            <div class="cart-block" v-show="isVisibleCart">
                <p v-if="!basket.length">Корзина пуста</p>
                <basket-item class="cart-item"
                v-for="item of basket"
                :key="item.id_product"
                :cart-item="item"
                :img="imgCart"
                @remove="remove"
                ></basket-item>
            
            </div>
      </div>`
});
Vue.component('basket-item', {
    props: ['img', 'cartItem'],
    template: `
                <div class="cart-item"> 
                    <div class="product-bio">
                        <img :src="img" alt="Product image">
                        <div class="product-desc">
                            <p class="product-title">{{cartItem.product_name}}</p>
                            <p class="product-quantity">Количество{{cartItem.quantity}}</p>
                            <p class="product-single-price">{{cartItem.price}}₽ за единицу</p>
                        </div>
                        <div class="right-block">
                             <p class="product-price">{{cartItem.quantity*cartItem.price}}₽</p>
                             <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                        </div>
                    </div>
                </div>
    `
});