
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
