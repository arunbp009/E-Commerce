<template>
  <v-app id="main__wrappper">
    <div class="app-container">
      <nav-bar></nav-bar>

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
.dark .main__wrappper + div{
color: #fff;
background: #000;
}
</style>
