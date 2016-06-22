var dbconf = require("config").database;

var knex = require('knex')({
	client : 'pg',
		connection: {
		host     : dbconf.host,
		user     : dbconf.user,
		password : dbconf.password,
		database : dbconf.name,
		charset  : 'utf8'
	}
});

var bookshelf = require('bookshelf')(knex);

exports.bookshelf = bookshelf;
exports.knex = knex;

exports.handleDatabaseException = function (reject) {
	return function(error) {
		console.error("DATABASE EXCEPTION: " + error.stack);
		if (!reject || typeof(reject) !== "function") return;
		reject("Something bad happened.");
	}
}
