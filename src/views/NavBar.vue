<template>
  <v-card class="navbar">
    <v-layout style="position: relative; z-index: 1">
      <v-app-bar
        class="navbar__app-bar"
        id="new"
        style="position: relative; padding: 12px 0; position: fixed"
      >
        <v-img
          @click="goToMainPage"
          src="/src/assets/images/logo.png"
          class="navbar__logo"
        ></v-img>

        <div class="navbar__links">
          <div>
            <RouterLink to="/productslist" class="navbar__link"></RouterLink>
          </div>
          <div>
            <RouterLink
              to="/selectedproducts"
              class="navbar__link"
            ></RouterLink>
          </div>
        </div>
        <v-col class="searchbox">
          <v-text-field
            v-model="search"
            label="Search"
            outlined
            rounded
            dense
            solo-inverted
          ></v-text-field>
        </v-col>

        <v-spacer></v-spacer>
        <div class="crtIcon">
          <v-icon class="navbar__cart-icon" @click="cartItems()"
            >mdi-cart</v-icon
          ><span>
            {{ totalCount ? totalCount : 0 }}
          </span>
        </div>

        <div style="margin: 20px 30px 0 30px">
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
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    search(newValue) {
      if (newValue != "") {
        this.funSearch(newValue);
      }
    },
  },

  methods: {
    toggleDarkMode() {
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
  margin: 0px;
  padding: 0px;
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

.navbar__links {
  display: flex;
  align-items: center;
  margin-right: 30px;
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
.dark #new {
  transition: all 1s ease;
  box-shadow: inset 0 0 100px 0 rgb(204, 204, 204) !important;
}
.dark .mdi-cart::before {
  color: #000;
}
.dark .app-container {
  background: #000;
  color: #fff;
}
.dark #new {
  transition: all 1s ease;
  box-shadow: inset 0 0 0 0 #3e9fdc !important;
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
</style>