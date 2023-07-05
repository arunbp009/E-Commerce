import { createRouter, createWebHistory } from "vue-router";
// import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // {
    //   path: "/",
    //   name: "home",
    //   component: HomeView,
    // },
    {
      path: "/productslist",
      name: "ProductList",
       component: () => import("../views/ProductList.vue"),
    },
    {
      path: "/selectedproducts",
      name: "SelectedProducts",
      component: () => import("../views/SelectedProducts.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/productslist" },
  ],
});


export default router;
