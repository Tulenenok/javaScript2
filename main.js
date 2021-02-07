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
                        <button class = 'product-button' data-title = ${this.title} data-price = ${this.price}>Купить</button>
                    </div>
                </div>`
    }
}

class Products {
    constructor(container = '.products', basket = '', list = helper) {
        this.container = container;
        this.goods = [];
        this.helper = list;
        this.allProducts = [];
        this.basket = basket;
        this.getProducts();
        if (this.basket != '') {this.addProductToBasket();};
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
            this.allProducts.push(newProduct);
            block.insertAdjacentHTML('beforeend', newProduct.makeProductHtml());
        })
    }

    addProductToBasket() {
        document.querySelectorAll(this.container).forEach(elem => {
            elem.addEventListener('click', event => {
                if (event.target.classList.contains('product-button'))
                    {this.basket.addProduct(event.target);}
            })
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
        return `<div class = 'basket-item' data-title = ${this.title} data-price = ${this.price} data-id = ${this.id} data-image = ${this.image} data-quantity = ${this.quantity}>
                    <img class = 'basket-image' src= ${this.image} alt="">
                    <div class = 'basket-wrapper'>
                        <p class = 'basket-title'>${this.title}</p>
                        <p class = 'basket-quantity'>Количество: ${this.quantity}</p>
                        <p class = 'basket-price'>$${this.price}</p>
                    </div>
                    <button class = 'basket-button' data-title = ${this.title} data-price = ${this.price} data-id = ${this.id} data-image = ${this.image} data-quantity = ${this.quantity}>-</button>
                </div>`
    }
}
class Basket extends Products{
    constructor (container = '.basket') {
        super(container);
        this.addClick();
    }

    getProducts() {
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .then(data => {
                this.goods = [...data.contents];
                this.InsertProductHtml();
            });
    }

    addProduct(product) {
        let productTitle = product.dataset['title'];
        let productPrice = product.dataset['price'];
        let find = this.allProducts.find(elem => elem.title === productTitle);
        if (find) {
            find.quantity++;
            this.updateBasket(find);
        } else {
            let newProduct = {
                id: product.dataset['id'],
                image:product.dataset['image'],
                product_name: productTitle,
                price: productPrice,
                quantity: 1
            };
            this.goods = [newProduct];
            this.InsertProductHtml()
        }
    }

    removeProduct(product) {
        let productTitle = product.dataset['title'];
        let productPrice = product.dataset['price'];
        let find = this.allProducts.find(elem => elem.title === productTitle);
        if (find.quantity === 1) {
            this.allProducts.splice(this.allProducts.indexOf(find), 1);
            document.querySelector(`.basket-item[data-title = ${productTitle}]`).remove();
        } else {
            find.quantity--;
            this.updateBasket(find);
        }
    }

    updateBasket(find) {
       let block =  document.querySelector(`.basket-item[data-title = ${find.title}]`);
       block.querySelector('.basket-quantity').textContent = `Количество: ${find.quantity}`;
    }

    addClick() {
        document.querySelector('.button').addEventListener('click', () => {
            document.querySelector('.basket').classList.toggle('hide');
        });
        document.querySelector('.basket').addEventListener('click', event => {
            if (event.target.classList.contains('basket-button')) {
                console.log(event.target);
                this.removeProduct(event.target);
            }
        })
    }
}

class Form {
    constructor() {
        this._addEvent();
    }

    _invalidValue(elem) {
        elem.classList.add('redBorder');
    }

    _addMessageError(elem, text) {
        let div = document.querySelector(`#${elem.classList[0]}`);
        div.textContent = `${text}`;
        div.classList.remove('hide');
    }
    _removeMessageError(elem) {
        let div = document.querySelector(`#${elem.classList[0]}`);
        div.classList.add('hide');
    }

    _check(container, newRegexp, text = 'Ошибка') {
        let elem = document.querySelector(container);
        let regexp = newRegexp;
        if (!(regexp.test(elem.value))) {
            this._invalidValue(elem);
            this._addMessageError(elem, text)
            return false;
        } else if (elem.classList.contains('redBorder')) {
            elem.classList.remove('redBorder');
            this._removeMessageError(elem);
            return true;
        }
        return true;
    }

    _addEvent() {
        document.querySelector('.feedback-button').addEventListener('click', event => {
            let flag = true;
            flag *= this._check('.feedback-name', new RegExp(/^[a-zа-яё\s]+$/i), 'Допустимы только буквы');                                      // Проверка имени
            flag *= this._check('.feedback-email', new RegExp(/^[a-z\-\.]+(@mail\.ru)$/i), 'Необходим формат my.m-ail@mail.ru');                    // Проверка email
            flag *= this._check('.feedback-phone', new RegExp(/^(\+7)\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i), 'Необходим формат +7(000)000-0000');        // Проверка телефона
            if (flag) {
                let success = document.querySelector('.success');
                success.textContent = 'Сообщение успешно отправлено';
                success.classList.remove('hide')
            } else {
                event.preventDefault();
                let success = document.querySelector('.success');
                success.textContent = 'Сообщение не может быть отправлено';
                success.classList.remove('hide')
            }
        })
    }
}

let helper = {
    Basket: BasketItem,
    Products: ProductItem
};

let basket = new Basket;
let list = new Products('.products', basket);
let form = new Form;


