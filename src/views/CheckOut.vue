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
            <span class="count-badge">{{ cartItems.length }}</span>
          </div>

          <v-list-item
            v-for="item in cartItems"
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
              <tr v-for="item in cartItems" :key="item.id">
                <td>{{ item.title }}</td>
                <td>{{ item.afterDiscountPrice }}</td>
                <td>{{ item.PCsCount }}</td>
                <td>{{ item.afterDiscountPrice * item.PCsCount }}</td>
              </tr>
              <tr>
                <td></td>
                <!-- <td></td> -->
                <td colspan="2" style="font-size: 20px; font-weight: bold">
                  Total price:
                </td>
                <td style="font-size: 20px; font-weight: bold">
                  {{ totalAmount }} rs
                </td>
              </tr>
            </tbody>
          </v-table>
        </div>
        <v-btn @click="orderItem()" class="checkOut">Check Out</v-btn>
      </div>
    </div>

    <v-dialog v-model="dialogVisible" persistent max-width="500px">
      <v-card>
        <v-card-title class="success-popup-header"
          >Confirm Payment
        </v-card-title>
        <v-card-text>
          <p class="text-bold">Total Items : {{ totalCount }} No</p>
        </v-card-text>
        <v-card-text>
          <p class="text-bold">Total Amount : {{ totalAmount }} rs</p>
        </v-card-text>
        <v-card-text class="text-bold">
          Are you sure you want to proceed Order?
        </v-card-text>
        <v-card-actions>
          <v-btn class="btn-error" text @click="cancelConfirmation"
            >Cancel</v-btn
          >
          <v-btn class="btn-success" text @click="confirmAction"
            >Place Order</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showSuccessPopup" max-width="400px">
      <v-card>
        <v-card-title class="success-popup-header">Success!</v-card-title>
        <v-card-text class="success-popup-message"
          >Order Placed successfully!.</v-card-text
        >
        <v-card-actions>
          <v-btn class="btn-success" @click="closeSuccessPopup">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="showErrorPopup" max-width="400px">
      <v-card>
        <v-card-title class="Error-popup-header">Error Message!</v-card-title>
        <v-card-text class="Error-popup-message"
          >Add items to Cart to Place Order!.</v-card-text
        >
        <v-card-actions>
          <v-btn class="btn-error" @click="closeErrorPopup">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { useStore } from "../stores/cart.store";
import { mapState } from "pinia";
import navbar from "../components/NavBar.vue";

export default {
  components: {
    "nav-bar": navbar,
  },
  data() {
    return {
      showErrorPopup: false,
      showSuccessPopup: false,
      dialogVisible: false,
      cartItems: [],
      // cartItemsAdded: [],
      totalAmount: 0,
      totalCount: this.updateCount(),
    };
  },
  mounted() {
    this.cart();
  },
  computed: {
    ...mapState(useStore, ["getCartItems"]),
    orderStatus() {
      return `${this.getCartItems}`;
    },
  },
  watch: {
    orderStatus() {
      if (this.getCartItems.length == 0) {
        this.cart();
      }
    },
  },
  methods: {
    cart() {
      this.cartItems = this.getCartItems;
      this.totalAmount = 0.0;

      this.cartItems.forEach((ele) => {
        ele.PCsCount = 1;
        let afterDiscount = 100 - ele.discountPercentage;
        ele.afterDiscountPrice = (ele.price * afterDiscount) / 100;
        ele.afterDiscountPrice = ele.afterDiscountPrice.toFixed(2);
        this.totalAmount += ele.afterDiscountPrice * ele.PCsCount;
      });
      this.totalAmount = Math.floor(this.totalAmount);
    },

    addItems() {
      this.$router.push({ path: "/productslist" });
    },
    deleteItem(deleteItem) {
      const index = this.cartItems.findIndex((ele) => ele.id === deleteItem.id);
      if (index > -1) {
        this.cartItems.splice(index, 1);
      }
      this.totalAmount = 0;

      this.cartItems.forEach((ele) => {
        this.totalAmount += ele.afterDiscountPrice * ele.PCsCount;
      });
      this.totalAmount = Math.floor(this.totalAmount);
      let store = useStore();

      store.addedToCart([]);
      store.addedToCart(this.cartItems, "deleteItem");
      this.totalCount= this.updateCount()
      this.cartItems = this.getCartItems;
    },
    orderItem() {
      if (this.cartItems.length > 0) {
        this.dialogVisible = true;
      } else {
        this.showErrorPopup = true;
      }
    },
    confirmAction() {
      this.dialogVisible = false;
      console.log("data to send backend", this.cartItems);
      if (this.cartItems.length > 0) {
        this.showSuccessPopup = true;
        setTimeout(() => {
          this.$router.push({ path: "/productslist" });
        }, 2000);
      }

      let store = useStore();
      store.addedToCart([]);
    },
    cancelConfirmation() {
      this.dialogVisible = false;
    },
    updateCount() {
      let store = useStore();
      return store.$state.cartItems.length;
    },
    closeSuccessPopup() {
      this.showSuccessPopup = false;
      this.$router.push({ path: "/productslist" });
    },
    closeErrorPopup() {
      this.showErrorPopup = false;
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
.success-popup-header {
  background-color: #4caf50;
  color: #fff;
}

.Error-popup-header {
  background-color: #f01906;
  color: #fff;
}
.btn-error {
  background-color: #f01906;
  margin: auto;
}
.btn-success {
  background-color: #4caf50;
  margin: auto;
}
.Error-popup-message {
  font-weight: bold;
  margin-bottom: 20px;
}

.success-popup-message {
  font-weight: bold;
  margin-bottom: 20px;
}
.text-bold {
  font-weight: bold;
}
.dark #main__wrappper {
  background: #000 !important;
}
</style>