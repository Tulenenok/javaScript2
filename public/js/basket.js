Vue.component('basket', {
    template: `<div class="basket" v-if="$root.show">
                    <basket-item v-for="item in $root.basket" :item = "item"></basket-item>
                    <notresp :id = "1"></notresp>
                </div>`,
})

Vue.component('basketItem', {
    props: ['item'],
    data(){
        return {
            imgBasket: 'https://placehold.it/100x500'
        }
    },
    template: `<div class = 'basket-item' :data-title = "item.product_name" :data-price = "item.price" :data-id = "item.id_product" :data-image = "imgBasket" data-quantity = "item.quantity">
                    <img class = 'basket-image' :src="item.image" alt="">
                    <div class = 'basket-wrapper'>
                        <p class = 'basket-title'>{{ item.product_name }}</p>
                        <p class = 'basket-quantity'>{{ item.quantity }}</p>
                        <p class = 'basket-price'>{{ item.price }}</p>
                    </div>
                    <button class = 'basket-button' @click = "$root.removeProduct($event)" :data-title = "item.product_name" :data-price = "item.price" :data-id = "item.id_product" :data-image = "imgBasket" data-quantity = "item.quantity">-</button>
                </div>`
})
