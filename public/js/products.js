Vue.component('products', {
    template: `<div class = 'products'>
                    <product-item v-for="item of $root.products" :item = "item"></product-item>
                </div>`
})

Vue.component('product-item', {
    props: ['item'],
    data() {
        return {
            image: 'https://placehold.it/500x500'
        } 
    },
    template: `<div class = 'product-item show' :data-id = "item.id_product">
                    <img class = 'products-image' :src= "item.image" alt="">
                    <div class = 'product-wrapper'>
                        <p class = 'product-title'>{{ item.product_name }}</p>
                        <p class = 'product-price'>{{ item.price }}</p>
                        <button class = 'product-button' @click = "$root.addProduct($event)" :data-id = "item.id_product" :data-title = "item.product_name" :data-price = "item.price" :data-image = "image">Купить</button>
                    </div>
                </div>`
})