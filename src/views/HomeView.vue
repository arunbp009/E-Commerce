<template>
   <nav-bar></nav-bar>
   <product-list></product-list>

  
</template>

<script>

import navbar from "./NavBar.vue";
import ProductList from "./ProductList.vue"

export default {
  name:"HomeView",
  components: {
    "nav-bar": navbar,
    "product-list":ProductList
  },
  data() {
    return {};
  },
};
</script>

<style>
</style>




