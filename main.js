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
    constructor(container = '.products', list = helper) {
        this.container = container;
        this.goods = [];
        this.helper = list;
        this.getProducts()
    }

    getProducts() {
        return fetch(`${API}/catalogData.json`)
                .then(result => result.json())
                .then(data => {
                    this.goods = [...data];
                    this.InsertProductHtml()
                });
    }

    InsertProductHtml() {
        const block = document.querySelector(this.container);
        this.goods.forEach(elem => {
            const newProduct = new this.helper[this.constructor.name](elem);
            block.insertAdjacentHTML('beforeend', newProduct.makeProductHtml());
        })
    }

    // метод, который определяет стоимость всех продуктов
    costProducts() {
        var sum = 0;
        this.goods.forEach(item => {sum += item.price;})
        return sum;
    }
}

class BasketItem extends ProductItem {
    constructor(product, image = 'https://placehold.it/50x100') {
        super(product, image);
        this.quantity = product.quantity;
    }

    makeProductHtml() {
        return `<div class = 'basket-item'>
                    <img class = 'basket-image' src= ${this.image} alt="">
                    <div class = 'basket-wrapper'>
                        <p class = 'basket-title'>${this.title}</p>
                        <p class = 'basket-quantity'>Количество: ${this.quantity}</p>
                        <p class = 'basket-price'>$${this.price}</p>
                    </div>
                </div>`
    }
}
class Basket extends Products{
    constructor (container = '.basket') {
        super(container);
    }s

    getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data.contents];
                this.InsertProductHtml()
            });
    }
}

let helper = {
    Basket: BasketItem,
    Products: ProductItem
};

let list = new Products;
let basket = new Basket;


