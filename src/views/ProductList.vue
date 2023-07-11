<template>
  <div style="margin-top: 40px">
    <nav-bar
      @searchValue="searchProduct"
      @sortData="sortData"
      :totalCount="totalCount"
      :productCount="productCount"
      @filterData="filterData"
    ></nav-bar>
    <div>
      <v-row class="justify-center common__container" style="top: 100px">
        <v-col
          v-for="product in productsList"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mx-auto all__cards" max-width="344">
            <v-img :src="product.thumbnail" height="200px" cover></v-img>

            <v-card-title> {{ product.title }}</v-card-title>

            <v-card-actions class="justify-center">
              <v-btn
                :style="{ backgroundColor: 'rgb(254 255 0)', color: 'black' }"
                @click="addToCart(product)"
                >Add to Cart</v-btn
              >
              <v-btn
                :style="{ backgroundColor: 'rgb(0 105 255)', color: '#fff' }"
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
import navbar from "../components/NavBar.vue";

export default {
  name: "ProductList",
  components: {
    "nav-bar": navbar,
  },
  data() {
    return {
      loading: false,
      productCount: 0,
      totalCount: this.updateCount(),
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
          this.productCount = this.productsList.length;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateCount() {
      let store = useStore();
      return store.$state.cartItems.length;
    },
    addToCart(product) {
      let store = useStore();
      store.addedToCart(product);
      this.showSnackbar = true;
      this.totalCount = store.$state.cartItems.length;
      setTimeout(() => {
        this.showSnackbar = false;
      }, 2000);
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
          this.productCount = this.productsList.length;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    filterData(searchValue) {
      if (searchValue != "") {
        const arrayFilter = this.productsList.filter((ele) => {
          return ele.title.toLowerCase().includes(searchValue.toLowerCase());
        });
        this.productsList = arrayFilter;
          this.productCount = this.productsList.length;
      } else {
        this.fetchData();
      }
    },
    sortData() {
      this.productsList = [...this.productsList].reverse();
      this.productCount = this.productsList.length;
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
  position: static;
  float: right;
  top: -600px;
  right: -1150px;
}
.all__cards {
  background: linear-gradient(
    65deg,
    rgb(72, 190, 249) 50%,
    rgb(158, 223, 255) 50%
  );
  color: #fff;
  text-shadow: 0 0 4px #000;
  transition: all 1s ease-in;
}
.dark .all__cards {
  background: linear-gradient(
    -65deg,
    rgb(160, 160, 160) 50%,
    rgb(87, 87, 87) 50%
  );
  color: #000;
  text-shadow: 0 0 0;
  transition: all 1s ease-in;
}
</style>