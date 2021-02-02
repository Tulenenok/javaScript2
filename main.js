const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class ProductItem {
    constructor(product, image = 'https://placehold.it/200x150') {
        this.id = product.id_product;
        this.image = image;
        this.title = product.product_name;
        this.price = product.price;
    }

    makeProductHtml() {
        return `<div class = 'product-item'>
                    <img class = 'products-image' src= ${this.image} alt="">
                    <div class = 'product-wrapper'>
                        <p class = 'product-title'>${this.title}</p>
                        <p class = 'product-price'>${this.price}</p>
                        <button class = 'product-button'>Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [];
        this.getProducts()
            .then(data => {
                this.goods = [...data];
                this.InsertProductHtml()
            });
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
                .then(result => result.json())
    }

    InsertProductHtml() {
        const block = document.querySelector(this.container);
        this.goods.forEach(elem => {
            const newProduct = new ProductItem(elem);
            block.insertAdjacentHTML('beforeend', newProduct.makeProductHtml());
        })
    }

    // метод, который определяет стоимость всех продуктов
    costProducts() {
        var sum = 0;
        this.goods.forEach(item => {sum+= item.price;})
        return sum;
    }
}

class Backet {
    constructor() {
        this.goods = []
    }

    // Методы - добавить товар в каком-то количестве, удалить в каком-то количестве, посчитать стоимость всех продуктов
    addProduct (product, count) {}
    removeProduct (product, count) {}
    costAllProducts() {}
}

class ProductInBasket extends Products {
    constructor(product, count) {
        super(product);
        this.count = count;
    }
}

let list = new Products;
list.InsertProductHtml();


