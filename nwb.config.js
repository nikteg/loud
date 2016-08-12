module.exports = {
  webpack: {
    extra: {
      output: {
        publicPath: "/",
      },
    },
    html: {
      template: "src/index.html",
      favicon: "src/favicon.ico",
    },
    define: {
      API_URL: JSON.stringify(process.env.API_URL || "http://localhost:4000"),
    },
  },
};
