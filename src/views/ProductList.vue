<template>
  <div style="margin-top: 40px">
    <!-- <div height="200px" style="position:relative; z-index:-1"> -->
    <!-- <v-carousel
        hide-delimiters
        hide-controls
        cycle
        interval="5000"
        class="carousel-container"
      >
        <v-carousel-item v-for="(product, index) in productsList.products" :key="index">
          <v-sheet class="image-container">
            <v-img :src="product.thumbnail" style="width:80%;margin:auto"></v-img>
          </v-sheet>
        </v-carousel-item>
      </v-carousel> -->
    <!-- </div> -->
    <div>
      <v-row class="justify-center">
        <v-col
          v-for="product in productsList.products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card class="mb-4 " :style="{ textAlign:'center', color:'black',background:'#ccc'}">
            <v-card-title>{{ product.brand }}</v-card-title>

            <v-img :src="product.thumbnail" height="200"></v-img>
            <v-card-title :style="{ color:'black'}">{{ product.title }}</v-card-title>

            <v-card-actions class="justify-center">
              <v-btn :style="{ backgroundColor: '#61da09', color: 'black' }"
              @click="addToCart(product)"
                >Add to Cart</v-btn
              >
              <v-btn :style="{ backgroundColor: '#07aefa', color: 'black' }"
              @click="viewDetails(product)"
                >View Details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "pinia";
import { useStore } from "../stores/cart.store";
// import router from '../router/index.js';
export default {
  name: "ProductList",
  // components: {
  //   "nav-bar": navbar,
  // },
  data() {
    return {
      productsList: {},
    };
  },
  mounted() {
    this.fetchData();
    // console.log("getProductsList", this.getProductsList);
    // console.log("ffffffffffff", useStore.getters.getProductsList);
  },
  computed: {
    ...mapState(useStore, ["getProductsList"]),
  },
  methods: {
    fetchData() {
      axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          // console.log("response", response);
          this.productsList = response.data;
          // console.log("this.productsList", this.productsList);
        })
        .catch((error) => {
          console.error(error);
        });
    },
   addToCart(product) {
      // Handle add to cart logic
      console.log("Add to Cart clicked for product:", product);
    },
    viewDetails(product) {
      console.log("product details", product);
      this.$router.push({ path: '/selectedproducts' })
      // Handle view details logic
      //  const router = router();
      // console.log("View Details clicked for product:", product);
      // router.push('/selectedproducts');
    }
  },
};
</script>

<style>
.background-image {
  height: 50%;
  object-fit: cover;
  animation: slideShow 5s infinite;
}

@keyframes slideShow {
  0% {
    opacity: 0;
  }
  20% {
    opacity: 1;
  }
  33.33% {
    opacity: 1;
  }
  53.33% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}
.v-row {
  position: relative;
  z-index: 1;
}
</style>