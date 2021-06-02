'use strict';
const products = [
    { id: 1, title: 'Notebook', price: 1000 },
    { id: 2, title: 'Mouse', price: 100 },
    { id: 3, title: 'Keyboard', price: 250 },
    { id: 4, title: 'Gamepad', price: 150 }
];

const renderProduct = (title, price, img = 'https://smartlanding.biz/wp-content/uploads/2015/03/kartinki-zaglushki.png') => {
    return `<div class="product_item">
            <img src=${img} alt="img">
            <h3>${title}</h3>
            <p>${price}</p>
            <button class="by_btn">Добавить</button>
            </div>`;
}

const renderProducts = (products) => {
    let productItems = products.map(product => renderProduct(product.title, product.price)); //сокращение
    document.querySelector('.products').innerHTML = productItems.join('');
}
renderProducts(products);