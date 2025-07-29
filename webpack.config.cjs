module.exports = {
  entry: "./src/main.js",
  module: {
    rules: [
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|svg|jpg|jpeg|gif)$/i, type: "asset/resource" },
      { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: "asset/resource" },
    ],
  },
};
