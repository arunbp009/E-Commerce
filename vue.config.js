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
        "img-src": ["'self'", "data:", "https://i.dummyjson.com/"],
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true, // Optional: Enable babel-loader caching for improved build performance
          },
        },
      },
    ],
  },
};
