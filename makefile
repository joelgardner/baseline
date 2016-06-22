
install 					: install-server install-client

install-server 		: server/package.json
										npm install server; 			\
										mv node_modules/ server/

install-client		:	client/package.json
										npm install client;				\
										mv node_modules/ client/

install-database	:	database/createdb.sql
										/Library/PostgreSQL/9.5/pgAdmin3.app/Contents/SharedSupport/psql \
										--host localhost 					\
										--port 5432 							\
										--username postgres 			\
										bugmo 										\
										-f database/createdb.sql
