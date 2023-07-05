<template>
  <v-card class="navbar">
    <v-layout>
      <v-app-bar color="primary" class="navbar__app-bar">
        <v-img src="logo.png" class="navbar__logo"></v-img>

        <div class="navbar__links">
          <div>
            <RouterLink to="/productslist" class="navbar__link"
              >Products List</RouterLink
            >
          </div>
          <div>
            <!-- <RouterLink to="/selectedproducts" class="navbar__link"
              >Selected Products</RouterLink
            > -->
            <router-link class="navbar__link" to="/selectedproducts">Go to Home</router-link>
          </div>
        </div>

        <v-spacer></v-spacer>
        <v-icon class="navbar__cart-icon">mdi-cart</v-icon>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<script>
import { RouterLink } from "vue-router";
export default {
  name: "NavBar",
};
</script>

<style scoped>
.navbar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar__app-bar {
  padding: 0 20px;
}

.navbar__logo {
  max-height: 40px;
}

.navbar__links {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.navbar__link {
  color: white;
  margin-right: 20px;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.navbar__link:hover {
  color: lightgray;
}

.navbar__cart-icon {
  font-size: 24px;
  color: white;
  margin-right: 10px;
}
</style>