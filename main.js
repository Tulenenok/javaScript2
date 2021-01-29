const products = [
    {id: 1, image: 'img/1.jpg', title: 'Яндекс.Книга', price: 1200},
    {id: 2, image: 'img/2.jpg', title: 'Два капитана', price: 600},
    {id: 3, image: 'img/3.jpg', title: 'Полдень 22 век', price: 750},
    {id: 4, image: 'img/4.jpg', title: 'Физтеховская математика', price: 220}
];

function makeProductHtml(product) {
    return `<div class = 'product-item'>
                <img class = 'products-image' src= ${product.image} alt="">
                <p class = 'product-title'>${product.title}</p>
                <p class = 'product-price'>${product.price}</p>
                <button class = 'product-button'>Купить</button>
            </div>`
};

// Запятые были потому, что listOfHtml представлял из себя массив, в котором элементы были разделены запятыми
// При добавлении этого массива целиком на страницу, запятые тоже добавлялись
function InsertProductHtml(listOfProducts) {
    const listOfHtml = listOfProducts.map(elem => makeProductHtml(elem));
    listOfHtml.forEach(elem => document.querySelector('.products').insertAdjacentHTML('beforeend', elem));
};

InsertProductHtml(products);