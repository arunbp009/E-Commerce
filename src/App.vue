<template>
  <v-app>
    <div class="app-container">
      <nav-bar></nav-bar>

      <div class="mt-20" style="top: 50px"></div>
      <router-view />
    </div>
  </v-app>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  name: "App",
  components: {
    "router-view": RouterView,
  },
  data() {
    return {};
  },
};
</script>


<style>
.v-card {
  z-index: 9999 !important;
}
</style>
