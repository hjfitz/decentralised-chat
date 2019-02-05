const path = require('path')

module.exports = {
	mode: 'development',
	entry: './main.js',
	output: {
		path: path.join(__dirname, 'public'),
		filename: 'main.js'
	}
}