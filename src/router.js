import Vue from "vue";
import Router from "vue-router";
import Home from "@/pages/Home.vue";
import Detail from "@/pages/Detail.vue";
import Cart from "@/pages/Cart.vue";



Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/product/:productId",
      component: Detail
    },
    {
      path: "/cart",
      component: Cart
    }
  ]
});
