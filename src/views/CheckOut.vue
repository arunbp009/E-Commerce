<template>
  <div>
    <nav-bar :totalCount="totalCount"></nav-bar>

    <v-row class="justify-center" style="margin: 100px 0 0">
      <v-btn
        class="space"
        :style="{ backgroundColor: '#61da09', color: 'black' }"
        @click="addItems()"
        >Add Products</v-btn
      >
    </v-row>
    <div class="d-flex justify-center" style="gap: 20px; align-items: start">
      <div class="cart-items-container">
        <v-list lines="two">
          <div class="d-flex">
            <h1 class="items">Items</h1>
            <span class="count-badge">{{ cartItemsAdded.length }}</span>
          </div>

          <v-list-item
            v-for="item in cartItemsAdded"
            :key="item.title"
            :prepend-avatar="item.thumbnail"
            class="imgCustom"
          >
            <div
              class="d-flex align-center"
              style="justify-content: space-between"
            >
              <div class="list-item-content">
                <v-list-item-content>
                  <v-list-item-title class="item-title">
                    {{ item.title }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="item-subtitle">
                    Price: {{ item.afterDiscountPrice }} rs
                  </v-list-item-subtitle>
                </v-list-item-content>
              </div>

              <div class="list-item-action">
                <v-list-item-action>
                  <v-btn icon @click="deleteItem(item)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </div>
            </div>
          </v-list-item>
        </v-list>
      </div>
      <div class="card-right">
        <div class="cart-items-container">
          <h1>Order Summary</h1>
          <v-table>
            <thead>
              <tr>
                <th class="text-left">Product Name</th>
                <th class="text-left">Price</th>
                <th class="text-left">Quantity</th>
                <th class="text-left">Total Price</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cartItemsAdded" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.afterDiscountPrice }}</td>
                <td>{{ item.countObj }}</td>
                <td>{{ item.afterDiscountPrice * item.countObj }}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td>Total price:</td>
                <td>{{ totalAmount }}</td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <v-btn @click="orderItem()" class="checkOut">Check Out</v-btn>
      </div>
    </div>

    <v-dialog v-model="dialogVisible" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirm Payment </v-card-title>
        <v-card-text>
          <p>Total Items : {{ totalCount }} No</p>
        </v-card-text>
        <v-card-text>
          <p>Total Amount : {{ totalAmount }} rs</p>
        </v-card-text>
        <v-card-text> Are you sure you want to proceed Order? </v-card-text>
        <v-card-actions>
          <v-btn color="primary" text @click="cancelConfirmation">Cancel</v-btn>
          <v-btn color="error" text @click="confirmAction">Place Order</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useStore } from "../stores/cart.store";
import { mapState } from "pinia";
import navbar from "./NavBar.vue";

export default {
  components: {
    "nav-bar": navbar,
  },
  data() {
    return {
      dialogVisible: false,
      cartItems: [],
      cartItemsAdded: [],
      totalAmount: 0,
      totalCount: 0,
    };
  },
  mounted() {
    this.cart();
  },
  computed: {
    ...mapState(useStore, ["getCartItems"]),
  },
  methods: {
    cart() {
      this.cartItems = this.getCartItems;
      // ----------
      const objectCount = {};
      this.cartItems.forEach((obj) => {
        const key = JSON.stringify(obj); // Convert the object to a string for use as the key
        objectCount[key] = (objectCount[key] || 0) + 1;
      });

      const uniqueObjects = Object.keys(objectCount).map((key) =>
        JSON.parse(key)
      );
      this.totalCount = 0;
      uniqueObjects.forEach((obj) => {
        const key = JSON.stringify(obj);
        const count = objectCount[key];
        obj.countObj = count;
        this.totalCount += obj.countObj;
      });
      // this.totalCount=4
      this.cartItemsAdded = uniqueObjects;

      this.cartItemsAdded.forEach((ele) => {
        let afterDiscount = 100 - ele.discountPercentage;
        ele.afterDiscountPrice = (ele.price * afterDiscount) / 100;
        ele.afterDiscountPrice = ele.afterDiscountPrice.toFixed(2);
        this.totalAmount += ele.afterDiscountPrice * ele.countObj;
      });
      this.totalAmount ? this.totalAmount.toFixed(2) : 0;
    },

    addItems() {
      this.$router.push({ path: "/productslist" });
    },
    deleteItem(deleteItem) {
      const index = this.cartItemsAdded.findIndex(
        (ele) => ele.id === deleteItem.id
      );
      if (index > -1) {
        this.cartItemsAdded.splice(index, 1);
      }
      this.totalAmount = 0;

      this.cartItemsAdded.forEach((ele) => {
        this.totalAmount += ele.afterDiscountPrice * ele.countObj;
      });
      this.totalAmount = this.totalAmount.toFixed(2);
    },
    orderItem() {
      this.dialogVisible = true;
    },
    confirmAction() {
      this.dialogVisible = false;
    },
    cancelConfirmation() {
      this.dialogVisible = false;
    },
  },
};
</script>

<style>
.item-title {
  font-size: 18px;
  font-weight: bold;
}

.item-subtitle {
  font-size: 18px;
  font-weight: bold;
}
.cart-items-container {
  width: 500px;
  padding: 20px;
  box-shadow: 0 0 5px #d7d7d7;
}
.items {
  text-align: center;
  font-weight: bold;
}

.space {
  margin: 40px;
}
.card-right {
  position: relative;
}
.checkOut {
  position: absolute;
  right: 0;
  bottom: -40px;
  background: #5290e0;
  color: #fff;
}
.count-badge {
  width: 30px;
  height: 30px;
  background: #5290e0;
  display: flex;
  padding: 10px;
  justify-content: center;
  align-items: center;
  position: relative;
  top: 12px;
  right: -5px;
  border-radius: 50%;
  color: #fff;
}
.imgCustom .v-img__img.v-img__img--contain {
  object-fit: cover;
}
</style>