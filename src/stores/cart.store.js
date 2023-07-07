import { defineStore } from "pinia";

import axios from "axios";

export const useStore = defineStore("storeId", {
  state: () => ({
    // productsList: [],
    selectedProduct: [],
    cartItems: [],
  }),

  actions: {
    // async fetchData() {
    //   try {
    //     const response = await axios.get('https://dummyjson.com/products');
    //     console.log("store response", response);
    //     this.setProductsList(response.data);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    // filterData(args){
    //   this.selectedProduct = args
    // },

    addedToCart(item) {
      this.cartItems.push(item);
    },
  },
  getters: {
    // getProductsList(state) {
    //   return state.productsList;
    // },
    // getSelectedProduct(state){
    //   return state.selectedProduct
    // },
    getCartItems(state) {
      return state.cartItems;
    },
  },
  mutations: {
    setProductsList(products) {
      console.log("products aaaaaaaaaa", products);
      this.productsList = products;
    },
    toTheCart(arr) {
      this.cartItems = arr;
    },
  },
});
