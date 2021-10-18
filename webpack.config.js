// 웹팩에 대한 설정
const path = require('path');
// path method
module.exports = {
  mode: 'development',
  devtool: 'eval',
  resolve: {
    extensions: ['.js'],
  },
  entry: {
    app: path.join(__dirname, 'main.js'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [],
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist',
  },
};
