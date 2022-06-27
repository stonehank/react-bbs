const webpack=require('webpack')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const WebpackBar = require('webpackbar')
const src = path.join(__dirname, 'src')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin')

module.exports = {
  entry: path.join( src, 'index.tsx'),
  output: {
    path: path.join(__dirname, 'demo'),
    filename:'react-bbs.js'
  },
  resolve: {
    extensions: [ '.js','.ts', '.json', '.jsx','.tsx','.css','.scss'],
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      // {
      //   enforce:'pre',
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   include: /src/,
      //   loader: "eslint-loader"
      // },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
        include:path.resolve(__dirname, 'src'),
      },
      {
        test: /\.(js|jsx)$/,
        include:path.resolve(__dirname, 'src'),
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  stage: 3,
                }),
              ],
            },
          },
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                  stage: 3,
                }),
              ],
            },
          },
          "sass-loader"
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  plugins: [
    new FriendlyErrorsWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new WebpackBar(),
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    }),
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  devServer: {
    quiet:true,
    hot: true,
  } ,
};
