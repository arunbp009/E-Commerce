<template>
  <v-card class="navbar">
    <v-layout style="position: relative; z-index: 1">
      <v-app-bar
        class="navbar__app-bar"
        id="new"
        style="position: relative; padding: 12px 0; position: fixed"
      >
        <img
          @click="goToMainPage"
          src="/src/assets/images/logo.png"
          class="navbar__logo"
        />

        <v-col class="searchbox">
          <v-text-field
            v-model="search"
            label="Search"
            outlined
            rounded
            dense
            solo-inverted
          ></v-text-field>
          <span class="pro__count">{{ productCount }}</span>
        </v-col>
        <v-icon @click="filterItemsIcon">mdi-filter</v-icon>
        <input
        class="input_filter"
          v-if="filterPopUP"
          type="text"
          v-model="filterValue"
          @keyup="filterItems"
          placeholder="Filter Items"
          
        />
        <v-icon
          class="icon-sort"
          @click="sortData"
          :class="{ 'rotate-180': descending }"
          >mdi-sort</v-icon
        >

        <!-- <v-spacer></v-spacer> -->
        <div class="crtIcon">
          <v-icon class="navbar__cart-icon" @click="cartItems()"
            >mdi-cart</v-icon
          ><span>
            {{ totalCount ? totalCount : 0 }}
          </span>
        </div>

        <div>
          <v-switch
            v-model="darkMode"
            :label="label"
            @click="toggleDarkMode"
          ></v-switch>
        </div>
      </v-app-bar>
    </v-layout>
  </v-card>
</template>

<script>
import { RouterLink } from "vue-router";
import axios from "axios";
export default {
  name: "NavBar",
  components: {
    RouterLink,
  },
  data() {
    return {
      filterValue: "",
      filterPopUP: false,
      descending: false,
      isEditing: null,
      search: "",
      darkMode: false,
      label: "Light Mode",
      productsList: {},
      displayProductsList: {},
      productsTitle: [],
      displayCartItem: [],
    };
  },
  props: {
    totalCount: {
      type: Number,
      default: 0,
    },
    productCount: {
      type: Number,
      default: 0,
    },
  },
  mounted() {
    this.filterPopUP=false
    this.fetchData();
  },
  watch: {
    search(newValue) {
      if (newValue != "") {
        this.funSearch(newValue);
         this.filterPopUP=false
      }
    },
  },

  methods: {
    filterItemsIcon() {
      this.filterPopUP = !this.filterPopUP;
    },
    filterItems() {
      this.$emit("filterData", this.filterValue);
    },
    sortData() {
      this.$emit("sortData");
    },
    toggleDarkMode() {
       this.filterPopUP=false
      this.darkMode = !this.darkMode;
      const AppID = document.getElementById("app");
      if (this.darkMode) {
        this.label = "Dark Mode";
        AppID.classList.add("dark");
      } else {
        this.label = "Light Mode";

        AppID.classList.remove("dark");
      }
    },
    funSearch(val) {
      this.$emit("searchValue", val);
    },
    cartItems() {
       this.filterPopUP=false
      this.$router.push({ path: "/checkout" });
    },

    fetchData() {
      axios
        .get("https://dummyjson.com/products")
        .then((response) => {
          this.productsList = response.data.products;
          this.displayProductsList = this.productsList;
          this.productsList.forEach((element) => {
            this.productsTitle.push(element.title);
          });
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goToMainPage() {
      this.$router.push({ path: "/productslist" });
    },
  },
};
</script>

<style>
/* #input-1{
 background-color: aliceblue;
} */
.searchbox {
  position: relative;
  z-index: 1;
  background-color: #fff;
  padding: 0px;
  margin: 0 0 0 40px;
  width: 100%;
  max-width: 800px;
  border-radius: 7px;
}
.navbar {
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}

#new {
  padding: 0 20px;
  box-shadow: inset 0 100px 0 0 #039be5ff !important;
  transition: all 1s ease;
}

.navbar__logo {
  max-height: 40px;
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
  font-size: 30px !important;
  color: white;
  margin-right: 10px;
  position: relative;
}
.crtIcon {
  position: relative;
}
.crtIcon span {
  position: absolute;
  right: 10px;
  top: -12px;
  margin: auto 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 10px;
}
.dark .app-container {
  background: #000;
  color: #fff;
}
.dark .mdi-cart::before {
  color: #000;
}
.dark #new {
  transition: all 1s ease;
  box-shadow: inset 0 0 100px 0 #000000 !important;
}
.dark .mdi-cart::before {
  color: #000;
}
/* .v-messages{
  display: none;
} */
.v-input__details {
  display: none;
}
.rotate-180 {
  transform: rotate(180deg);
}
.pro__count {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  background: #1723ac;
  padding: 17px;
  border-radius: 0 7px 7px 0;
  color: #fff;
}
.common__container {
  width: 100%;
  max-width: 1800px;
  margin: auto;
}
.navbar__app-bar > div {
  justify-content: space-around !important;
  width: 100%;
  max-width: 1800px;
  margin: auto;
}
.input_filter{
border-radius: 3px;
background-color: white;


}
</style>