import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/productslist",
      name: "ProductList",
      component: () => import("../views/ProductList.vue"),
    },
 
    {
      path: "/viewproduct/:id",
      name: "SelectedProducts",
      component: () => import("../views/SelectedProducts.vue"),
    },
    {
      path: "/checkout",
      name: "CheckOut",
      component: () => import("../views/CheckOut.vue"),
    },
    { path: "/:pathMatch(.*)*", redirect: "/productslist" },
  ],
});

export default router;
