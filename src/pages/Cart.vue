<template>
    <div class="cart">
        <div class="cart-item" v-for="item in cart">
            {{ item.product_name }}
        </div>
        <div class="product-info">
            Количество: {{ item.count }} <br>
            Цена: {{ getProductPrice(item.count, item.price) }}руб.
        </div>
        <button @click="removeFromCart(item.id)">Удалить</button>

        <div class="total">Общая сумма заказа: {{ totalPrice }}</div>
    </div>
</template>

<script>
export default {
    created() {
        this.$store.dispatch('fetchCart');
    },
    computed: {
        cart() {
            return this.$store.state.cart;
        },
        totalPrice() {
            return this.$store.getters.totalPrice;
        }
    },
    methods: {
        removeFromCart(productId) {
            this.$store.dispatch('removeFromCart', productId);
        },
        getProductPrice(count, price) {
            return count * price;
        }
    }
}
</script>