const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        basketUrl: '/getBasket.json',
        products: [],
        basket: [],
        filter: [],
        image: 'https://placehold.it/200x150',
        imgBasket: 'https://placehold.it/50x100',
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .then(data => {
                    this.products = [...data];
                });
        },
        getBasket() {
            return fetch(`${API}/getBasket.json`)
                .then(result => result.json())
                .then(data => {
                    this.basket = [...data.contents];
                });
        },
        addProduct(e) {
            let find = this.basket.find(elem => elem.product_name  === e.target.dataset['title']);
            if (find) {
                find.quantity++;
            } else {
                console.log(e.target);
                let newProduct = {
                    id: e.target.dataset['id'],
                    image: e.target.dataset['image'],
                    product_name: e.target.dataset['title'],
                    price: e.target.dataset['price'],
                    quantity: 1
                }
                console.log(newProduct);
                this.basket.push(newProduct);
            }
        },
        removeProduct(e) {
            let find = this.basket.find(elem => elem.product_name === e.target.dataset['title']);
            if (find.quantity > 1) {
                find.quantity--;
            } else {
                this.basket.splice(this.basket.indexOf(find), 1);
            }
        },
        filterProducts(e) {
            e.preventDefault();
            const regexp = new RegExp(document.querySelector('.searchInput').value, 'i');
            this.filter = this.products.filter(pr => regexp.test(pr.product_name));
            this.products.forEach(elem => {
                let block = document.querySelector(`.product-item[data-id="${elem.id_product}"]`);
                if (this.filter.includes(elem)) {
                    block.classList.remove('hide');
                    block.classList.add('show');
                } else {
                    block.classList.add('hide');
                    block.classList.remove('show');
                }
            })
        }
    },
    mounted() {
        this.getJson(`${API + this.catalogUrl}`)
        this.getBasket()
    }
})

const footer = new Vue({
    el: '#footer',
    data: {
        nameRule: new RegExp(/^[a-zа-яё\s]+$/i),
        emailRule: new RegExp(/^[a-z\-\.]+(@mail\.ru)$/i),
        phoneRule: new RegExp(/^(\+7)\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/i),
        showName: true,
        showEmail: true,
        showPhone: true,
        showMessage: true
    },
    methods: {
        contactForm(e) {
            this.showName = this.nameRule.test(document.querySelector('.feedback-name').value);
            this.showEmail = this.emailRule.test(document.querySelector('.feedback-email').value);
            this.showPhone = this.phoneRule.test(document.querySelector('.feedback-phone').value);
            this.showMessage = this.showName * this.showEmail * this.showPhone;
            if (!(this.showMessage)) {
                e.preventDefault();
            }
            if (!this.showName) {document.querySelector('.feedback-name').classList.add('redBorder');}
            else {document.querySelector('.feedback-name').classList.remove('redBorder');}
            if (!this.showEmail) {document.querySelector('.feedback-email').classList.add('redBorder');}
            else {document.querySelector('.feedback-email').classList.remove('redBorder');}
            if (!this.showPhone) {document.querySelector('.feedback-phone').classList.add('redBorder');}
            else {document.querySelector('.feedback-phone').classList.remove('redBorder');}
        }
    }
})