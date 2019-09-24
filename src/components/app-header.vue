<template>
<header>
    <div class="search">
        <base-input placeholder="Поиск"></base-input>
    </div>
    <div class="cart">
        <router-link to="/cart" class="cart-button btn primary-btn">Корзина<span class="badge badge-light"></span></router-link>
    </div>
</header>
</template>

<script>
import baseInput from '@/components/base-input';

export default {
    name: 'app-header',
    components: {
        baseInput
    }
}
</script>>

<style lang="scss" scoped>
    header {
        height: 56px;
        width: 100%;
        background-color: #607D8B;
        padding: 4px 20px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .cart-button {
        margin: 2px 0px 2px 20px;
        text-align: center;
        text-decoration: none;
        font-weight: normal;
        background: #5D8EC7;
        border-top: none;
        border-bottom: none;
        color: #fff;
    }

</style>