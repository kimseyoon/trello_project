var path = require('path')

module.exports = {
  entry: ['./public/src/js/entry'],
  output: {
    path: path.join(__dirname, 'public/dist'),
    filename: 'bundle.js'
  }
}
