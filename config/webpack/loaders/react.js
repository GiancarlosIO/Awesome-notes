module.exports = {
  test: /\.(js|jsx)?(\.erb)?$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      ['env', { modules: false }],
      'es2015', 'react', 'stage-0', 'stage-1'
    ]
  }
}
