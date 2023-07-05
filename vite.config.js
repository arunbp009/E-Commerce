import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
// import Vuetify from 'vuetify';

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      'vuetify': 'Vuetify'
    }
  },
  optimizeDeps: {
    include: [
      'vuetify'
    ]
  }
});