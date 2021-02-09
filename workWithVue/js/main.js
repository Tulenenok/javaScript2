const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        basket: [],
        filter: [],
        show: false
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .then(data => {
                    this.products = [...data];
                })
                .catch(() => {
                    document.getElementById('2').classList.remove('hide');
                });
        },
        getBasket() {
            return fetch(`${API}/getBasket.json`)
                .then(result => result.json())
                .then(data => {
                    this.basket = [...data.contents];
                })
                .catch(() => {
                    document.getElementById('1').classList.remove('hide');
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
    el: '#footer'
})