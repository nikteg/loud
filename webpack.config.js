module.exports = {
  module: {
    loaders: [
      {
        test: /\.styl$/,
        loader: "style-loader!css-loader!stylus-loader",
      },
    ],
  },
};
