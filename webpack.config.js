module.exports = {
  mode: 'none',
  node: {
    __dirname: true
  },
  output: {
    filename: 'dist/main.js',
    path: __dirname
  },
  entry: './src/index.js',
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

