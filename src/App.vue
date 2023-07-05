<template>
  <div class="app-container">
    <nav-bar></nav-bar>
    <div class="mt-20" style="top: 50px"></div>
    <router-view />
  </div>
</template>

<script>
import { RouterView } from "vue-router";
import navbar from "./views/NavBar.vue";
export default {
  name: "App",
  components: {
    "nav-bar": navbar,
    "router-view": RouterView,
  },
  data() {
    return {};
  },
};
</script>


<style>
</style>
