<template>
<div>
   <nav-bar></nav-bar>
  
  <h1>selected products</h1>

    <div>
   <v-carousel
    hide-delimiters
    hide-controls
    cycle
    interval="5000"
    class="carousel-container"
  >
    <v-carousel-item v-for="(image, index) in images" :key="index">
      <v-sheet class="image-container">
        <v-img :src="image.url" :alt="image.alt"></v-img>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </div>
</div>

 
</template>

<script>
import navbar from "./NavBar.vue";
// import { VCarousel, VCarouselItem } from 'vuetify/lib';
import { VCarousel, VCarouselItem } from 'vuetify/lib/components';

export default {
    name:"SelectedProducts",
  components: {
    "nav-bar": navbar,
       VCarousel,
    VCarouselItem
  },
  data() {
    return {
        images: [
        {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.shutterstock.com%2Fimage-illustration%2Fdigital-shopping-icons-connections-on-260nw-1012157215.jpg&tbnid=vqiPKOKnaIu6rM&vet=12ahUKEwiR54eVwff_AhXblGMGHfy7DEYQMygfegUIARCMAg..i&imgrefurl=https%3A%2F%2Fwww.shutterstock.com%2Fsearch%2Fecommerce-background&docid=JMhK-FAc0snt5M&w=468&h=280&q=best%20background%20hd%20images%20for%20E-commerce%20app&ved=2ahUKEwiR54eVwff_AhXblGMGHfy7DEYQMygfegUIARCMAg',
          alt: 'Image 1'
        },
        {
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWseTMdb7yq87lIPs1IhN6WJtvf1shI1EZmw&usqp=CAU',
          alt: 'Image 2'
        },
        {
          url: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F5632371%2Fpexels-photo-5632371.jpeg%3Fcs%3Dsrgb%26dl%3Dpexels-karolina-grabowska-5632371.jpg%26fm%3Djpg&tbnid=_0Xl-7XQPB6ScM&vet=12ahUKEwiR54eVwff_AhXblGMGHfy7DEYQMygIegUIARDWAQ..i&imgrefurl=https%3A%2F%2Fwww.pexels.com%2Fsearch%2Fe%2520commerce%2F&docid=1JHG9JaM7oZrbM&w=6652&h=4435&q=best%20background%20hd%20images%20for%20E-commerce%20app&ved=2ahUKEwiR54eVwff_AhXblGMGHfy7DEYQMygIegUIARDWAQ',
          alt: 'Image 3'
        },
        {
          url: 'slideimage4.jpg',
          alt: 'Image 4'
        },
        // Add more images as needed
      ],
      currentIndex: 0
    };
  },

}
</script>


<style>
.background-image {
  height: 100%;
  object-fit: cover;
  animation: slideShow 10s infinite;
}

@keyframes slideShow {
  0% { opacity: 0; }
  20% { opacity: 1; }
  33.33% { opacity: 1; }
  53.33% { opacity: 0; }
  100% { opacity: 0; }
}

</style>