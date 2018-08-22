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
    create: './src/create/create.js',
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