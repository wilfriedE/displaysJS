const path = require('path');
const webpack = require("webpack");

module.exports = {
  entry: {
    TextDisplay: './example/samples/text_display.js',
    YoutubeDisplay: './example/samples/youtube_display.js',
    SliderDisplay: './example/samples/slider_display.js'
  },
  output: {
    filename:  '[name].js',
    path: path.resolve(__dirname, '../samples/dist'),
    libraryTarget: 'var',
    library: '[name]'
  },
  module: {
   loaders: [{
       test: /\.js$/,
       loaders: ["babel-loader"]
   }]
  },
  plugins: []
};
