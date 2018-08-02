module.exports = {
  mode: 'none',
  node: {
    __dirname: true
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/dist'
  },
  entry: {
    home: './src/home.js',
    create: './src/create/create.js',
    view: './src/view/view.js'
  },
  module: {
    rules: [{
    test: /\.jsx?$/,
      exclude: /node_modules/,
      use : {
          loader : 'babel-loader',
          options : {
              presets : ['env', 'react'],
          },
      },
    }],

  },
};