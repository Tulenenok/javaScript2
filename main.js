class ProductItem {
    constructor(product) {
        this.id = product.id;
        this.image = product.image;
        this.title = product.title;
        this.price = product.price;
    }

    makeProductHtml() {
        return `<div class = 'product-item'>
                    <img class = 'products-image' src= ${this.image} alt="">
                    <p class = 'product-title'>${this.title}</p>
                    <p class = 'product-price'>${this.price}</p>
                    <button class = 'product-button'>Купить</button>
                </div>`
    }
}

class Products {
    constructor(container = '.products') {
        this.container = container;
        this.goods = [
            {id: 1, image: 'img/1.jpg', title: 'Яндекс.Книга', price: 1200},
            {id: 2, image: 'img/2.jpg', title: 'Два капитана', price: 600},
            {id: 3, image: 'img/3.jpg', title: 'Полдень 22 век', price: 750},
            {id: 4, image: 'img/4.jpg', title: 'Физтеховская математика', price: 220}
        ];
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
        return cost;
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


