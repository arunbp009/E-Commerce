import { defineStore } from "pinia";

export const useStore = defineStore("storeId", {
  state: () => ({
    selectedProduct: [],
    cartItems: [],
  }),

  actions: {
    updatedCart(items) {
      this.cartItems = items;
    },

    addedToCart(item, deleteItem) {
      if (item.length == 0) {
        this.cartItems = [];
      } else {
        this.cartItems.push(item);
      }
      if (deleteItem) {
        this.cartItems = [];
        this.cartItems = item;
      }
    },
  },
  getters: {
    getCartItems(state) {
      return state.cartItems;
    },
  },
  mutations: {
    toTheCart(arr) {
      this.cartItems = arr;
    },
  },
});
