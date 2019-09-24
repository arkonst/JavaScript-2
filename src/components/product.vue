<template>
<div class="product">        
    <router-link :to="`/product/${product.id}`" class="product-image">
        <img :src="product.img" alt="">    
        <div class="product-title">
            {{ product.product_name }}
        </div>
    </router-link>
    <div class="product-description">

    </div>
    <div class="product-actions">
        <button class="btn btn-primary" @click="addToCart">Добавить</button>
    </div>
</div>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        addToCart() {
            this.$store.dispatch('addToCart', this.product.id);
        }
    }
}
</script>>

<style lang="scss" scoped>
    .product {
        height: 304px;
        box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.25);
    }
    .product-image {
        height: 176px;
        width: 100%;
        padding: 10px 10px;
        img {
            max-height: 100%;
            max-width: 100%;
        }
    }
    .product-actions {
        height: 44px;
        border-top: 1px solid rgba(0, 0, 0, 0.12);

    }
</style>