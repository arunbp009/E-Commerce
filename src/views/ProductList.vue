<template>
  <div style="margin-top: 40px">
    <nav-bar @searchValue="searchProduct" :totalCount="totalCount"></nav-bar>
    <div>
      <v-row class="justify-center" style="top: 100px">
        <v-col
          v-for="product in productsList"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto" max-width="344">
            <v-img :src="product.thumbnail" height="200px" cover></v-img>

            <v-card-title> {{ product.title }}</v-card-title>

            <v-card-actions class="justify-center">
              <v-btn
                :style="{ backgroundColor: '#61da09', color: 'black' }"
                @click="addToCart(product)"
                >Add to Cart</v-btn
              >
              <v-btn
                :style="{ backgroundColor: '#07aefa', color: 'black' }"
                @click="viewDetails(product)"
                >View Details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      class="snackbar-custom"
    >
      <span class="message">{{ snackbarMessage }}</span>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { useStore } from "../stores/cart.store";
import navbar from "./NavBar.vue";

export default {
  name: "ProductList",
  components: {
    "nav-bar": navbar,
  },
  data() {
    return {
      totalCount: 0,
      productsList: {},
      store: useStore(),
      showSnackbar: false,
      snackbarMessage: "Item Added to Cart!",
      snackbarColor: "success",
    };
  },
  mounted() {
    this.fetchData();
  },
  computed: {
    ...mapState(useStore, ["getProductsList"]),
  },
  methods: {
    fetchData() {
      axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          this.productsList = response.data.products;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    addToCart(product) {
      let store = useStore();
      store.addedToCart(product);
      this.showSnackbar = true;
      this.totalCount = store.$state.cartItems.length;
    },
    viewDetails(product) {
      this.$router.push({ path: "/viewproduct/" + product.id });
    },

    searchProduct(value) {
      const searchURL = `https://dummyjson.com/products/search?q=${value}`;
      axios
        .get(searchURL)
        .then((response) => {
          this.productsList = [];
          this.productsList = response.data.products;
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style>
.v-row {
  position: relative;
  z-index: 1;
}
.message {
  display: flex;
  justify-content: center;
  align-items: center;
}
.snackbar-custom {
  position: relative;
  top: -600px;
  right: -1000px;
}
</style>