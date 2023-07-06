<template>
  <v-card class="navbar">
    <v-layout style="position: relative; z-index: 1">
      <v-app-bar class="navbar__app-bar" id="new" style="position: relative">
        <v-img src="logo.png" class="navbar__logo"></v-img>

        <div class="navbar__links">
          <div>
            <RouterLink to="/productslist" class="navbar__link"></RouterLink>
          </div>
          <div>
            <RouterLink
              to="/selectedproducts"
              class="navbar__link"
            ></RouterLink>
            <!-- <router-link
              class="navbar__link"
              to="/selectedproducts"
            ></router-link> -->
          </div>
        </div>
        <!-- {{productsTitle}} -->
        <v-autocomplete
          v-model="search"
          :items="productsTitle"
          label="Search"
          :custom-filter="customFilter"
          :menu-props="{ maxHeight: '300px' }"
      
        ></v-autocomplete>

        <v-spacer></v-spacer>
        <v-icon class="navbar__cart-icon">mdi-cart</v-icon>
        <div style="margin: 20px 30px 0 30px">
          <v-switch
            v-model="darkMode"
            :label="label"
            @click="toggleDarkMode"
          ></v-switch>
          <!-- <p>{{ darkMode ? "Dark Mode " : "Light Mode" }}</p> -->
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
    };
  },
  mounted() {
    this.fetchData();
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
    // SearchProducts() {
    //   console.log("enter to search products", this.search);
    //   console.log("aaaaaaaaaaaaaaaaaaa");
    // },
    // customFilter(queryText) {
    //   let searchitem = [];
    //   let listItem = [];
    //   this.productsList.forEach((element) => {
    //     if (element.title.includes(queryText)) {
    //       searchitem.push(element.title);
    //       listItem.push(element);
    //     }
    //   });
    //   this.productsTitle = searchitem;
    //   console.log("this.productsTitle", this.productsTitle);
    //   listItem.forEach((ele) => {
    //     this.productsList.forEach((item) => {
    //       if (ele.title == item.title) {
    //         this.displayProductsList.push(item)
    //       }
    //     });
    //   });
    // },
  },
};
</script>

<style>
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
  font-size: 24px;
  color: white;
  margin-right: 10px;
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
</style>