<template>
    <div class="product-detail">
        <h1>{{ product.product_name }}</h1>
        <img :src="product.img" alt="">
    </div>
</template>

<script>
export default {
    created() {
        const { productId } = this.$route.params;
        this.$store.dispatch('fetchProduct', productId);
    },
    computed: {
        product() {
            return this.$store.state.product;
        }
    }
}
</script>