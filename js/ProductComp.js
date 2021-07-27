Vue.component('products',{
    data(){
        return {
            catalogUrl: '/catalogData.json',
            products: [],
            filtered: [],
            imgCatalog: 'https://via.placeholder.com/200x150',
        }
    },
    methods: {

    },
    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                    console.log(this.filtered);
                }
            })
    },
    template: `
        <div class="products">
            <product v-for="item of filtered" :key="item.id_product" :img="imgCatalog" :product="item"></product>
        </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
            <img :src="img" alt="Product img">
            <div class="desc">
                <h3>{{product.product_name}}</h3>
                <p>{{product.price}}₽</p>
                <button class="buy-btn" @click="$root.$refs.cart.addProduct(product)">Купить</button>
            </div>
        </div>
    `
})