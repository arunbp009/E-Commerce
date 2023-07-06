import { defineStore } from 'pinia';
import axios from 'axios';

export const useStore = defineStore('storeId',{

  state: () => ({
    productsList: [],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await axios.get('https://dummyjson.com/products');
        console.log("store response", response);
        this.setProductsList(response.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getProductsList(state) {
      console.log("state", state);
      return state.productsList;
    },
  },
  mutations: {
    setProductsList(products) {
        console.log("products aaaaaaaaaa", products);
      this.productsList = products;
    },
  },
});