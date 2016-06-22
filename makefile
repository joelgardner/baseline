
install 					: install-server install-client

install-server 		: server/package.json
										cd server;		\
										npm install;  \
										cd ..;				\

install-client		:	client/package.json
										cd client;		\
										npm install;	\
										cd ..;				\

install-database	:	database/createdb.sql
										psql 											\
										--host localhost 					\
										--port 5432 							\
										--username postgres 			\
										bugmo 										\
										-f database/createdb.sql

run-webpack-dev-server 	: server/src/webpack-dev-server.js
													cd server;											\
													node src/webpack-dev-server.js;

run-server-development  : server/src/index.js
										NODE_ENV=development NODE_CONFIG_DIR=server/config node server/src/index.js
