var configValues = require('./dbconfig');

module.exports = {
	getDbConnectionString: function() {
		return 'mongodb://127.0.0.1/simple'
	}
}