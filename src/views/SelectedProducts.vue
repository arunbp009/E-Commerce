<template>
  <div class="product-details">
    <nav-bar :totalCount="totalCount"></nav-bar>
    <v-row>
      <v-col class="view__details">
        <v-card
          class="mb-4 product-card align-items"
          :style="{
            color: 'black',
            margin: '100px auto 0 ',
          }"
        >
          <v-card-title class="brand align-items card__texts">{{
            ProductDetials.brand
          }}</v-card-title>
          <div class="carousel-container">
            <v-carousel
              cycle
              :interval="currentIndex === 0 ? 500 : 3000"
              hide-delimiters
              class="carousel-container"
              :style="{ backgroundColor: '#000' }"
            >
              <v-carousel-item
                v-for="(image, index) in ProductDetials.images"
                :key="index"
              >
                <v-sheet class="image-container">
                  <v-img
                    :src="image"
                    :width="400"
                    :height="200"
                    class="product-image"
                  ></v-img>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>

          <v-card-title class="title align-items card__texts">{{
            ProductDetials.title
          }}</v-card-title>
          <v-card-subtitle class="description align-items card__texts">{{
            ProductDetials.description
          }}</v-card-subtitle>
          <v-card-title class="align-items card__texts">
            Rating
            {{ ProductDetials.rating }} <v-icon>mdi-star</v-icon>

            Available Stock {{ ProductDetials.stock }}
          </v-card-title>
          <v-card-title class="price align-items card__texts">
            Price &#8377; {{ ProductDetials.price }} rs
          </v-card-title>
          <v-card-title class="discount align-items card__texts">
            Discount {{ ProductDetials.discountPercentage }}% off
          </v-card-title>

          <v-card-actions class="justify-center card__texts">
            <v-btn
              id="addbtn"
              :style="{ backgroundColor: '#61da09', color: 'black' }"
              @click="addToCart(ProductDetials)"
              class="add-to-cart"
            >
              Add to Cart
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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
import navbar from "../components/NavBar.vue";

import axios from "axios";
import { useStore } from "../stores/cart.store";

export default {
  name: "SelectedProducts",
  components: {
    "nav-bar": navbar,
  },
  data() {
    return {
      totalCount: this.updateCount(),
      currentIndex: 0,
      ProductDetials: {},
      productsListDetail: {},
      showSnackbar: false,
      snackbarMessage: "Item Added to Cart!",
      snackbarColor: "success",
    };
  },

  created() {
    setInterval(() => {
      this.currentIndex =
        (this.currentIndex + 1) % this.ProductDetials.images.length;
    }, 1000);
  },
  mounted() {
    this.callDetailApi(this.$route.params.id);
  },
  methods: {
    callDetailApi(itemId) {
      axios
        .get("https://dummyjson.com/products/" + itemId)
        .then((response) => {
          this.ProductDetials = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    updateCount() {
      let store = useStore();
      return store.$state.cartItems.length;
    },
    addToCart(items) {
      let store = useStore();
      store.addedToCart(items);
      this.showSnackbar = true;
      this.totalCount = store.$state.cartItems.length;
    },
  },
};
</script>


<style scoped>
.product-details {
  margin-top: 60px;
  align-items: center;
  background-color: rgb(228, 230, 220);
}

.product-card {
  width: 600px;
  height: 540px;
}

.brand {
  font-weight: bold;
  font-size: 20px;
}

.carousel-container {
  height: 200px;
  position: relative;
  /* z-index: -1; */
}

.product-image {
  margin: auto;
}

.title {
  font-weight: bold;
  font-size: 18px;
}

.description {
  font-size: 14px;
}

.rating {
  background-color: #61da09;
  color: black;
  font-weight: bold;
}

.price,
.discount,
.stock {
  font-size: 16px;
  font-weight: bold;
}

.add-to-cart {
  font-weight: bold;
}
.align-items {
  text-align: center;
  margin: auto;
  align-items: center;
  color: white;
}
.tick-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 24px;
  color: green;
}
.message {
  display: flex;
  justify-content: center;
  align-items: center;
}
.snackbar-custom {
  position: fixed;
  top: -600px;
  right: -1000px;
}
/* .v-card {
  z-index: 1 !important;
} */
</style>
<style>
.v-card__underlay {
  display: none !important;
}
.v-window__controls {
  display: none !important;
}
.dark .view__details {
  background: #000;
}
.product-card {
  background: rgb(72, 190, 249);
  z-index: 0 !important;
}
.dark .product-card {
  background-color: rgb(255, 255, 255) !important;
  z-index: 0 !important;
}
.card__texts {
  background: rgb(72, 190, 249);
}
.dark .card__texts {
  background-color: rgb(255, 255, 255) !important;
  color: #000;
}
</style>