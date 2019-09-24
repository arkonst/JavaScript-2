<template>
  <div class="home">
    <div class="product-list">
      <product v-for="product in products" :product="product" :key="product.id"></product>
    </div>
  </div>
</template>

<script>
import Product from '@/components/product';

export default {
  name: "home",
  created() {
    this.$store.dispatch('fetchProducts');
  },
  computed: {
    products() {
      return this.$store.state.products;
    }
  },
  components: {
    Product,
  }    
};
</script>

<style lang="scss" scoped>
.product-list {
  padding: 0 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); 
}
</style>