module.exports = {
    css: {
      loaderOptions: {
        scss: {
          prependData: `@import "~vuetify/dist/vuetify.min.css";`,
        },
      },
    },
    devServer: {
      contentSecurityPolicy: {
        directives: {
          'img-src': ["'self'", "data:", "https://i.dummyjson.com/"],
        },
      },
    },
  };

