const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

module.exports = {
  mode: "production",
  optimization: {
    runtimeChunk: "single",
    moduleIds: "deterministic",
  },
  output: {
    filename: "[name].[contenthash].js",
    chunkFilename: "[name].[contenthash].js",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "MFE2",
      filename: "remoteEntry.js",
      remotes: {
        /**
         * @TODO: Replace domain with actual CDN!
         // e.g.: MFE1: "MFE1@https://rany.tk/mfe/mfe1/dist/remoteEntry.js",
         */
        MFE1: "MFE1@http://localhost:3001/remoteEntry.js",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
  module: {
    rules: [
      {
        /* The following line to ask babel 
             to compile any file with extension
             .js */
        test: /\.js?$/,

        /* exclude node_modules directory from babel. 
            Babel will not compile any files in this directory*/
        exclude: /node_modules/,

        // To Use babel Loader
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env" /* to transfer any advansed ES to ES5 */,
            "@babel/preset-react",
          ], // to compile react to ES5
        },
      },
    ],
  },
};
