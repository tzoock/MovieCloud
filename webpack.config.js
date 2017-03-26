module.exports = {
  entry: '.main.js',
  output: {
    filename: 'bundle.js',
    path: __dirname + '/dist'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {test: /.js$/, use: 'babel-loader'}
    ]
  }
};
