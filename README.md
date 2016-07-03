----
# Node.js app starter kit

##### This project aims to serve as a basis for new Node.js projects.  It has many tools and features that a typical modern Node.js web applications needs:

### Quick Start:
- Clone the repo
- Run `make`, `make run-dev-server`, and `make run-webpack-dev-server`
- See the **[Configuration](#configuration)** section below (required)
- Run `make install-database` to create/update the database (assuming you have a PostgreSQL backend set up and correct [configuration](#configuration) info) via [Postgrator](https://github.com/rickbergfalk/postgrator).
- Navigate to `http://localhost:9000`

##Installation:
- `make` will install npm dependencies for both `client` and `server` by running both of the following steps:
  - `make install-client` will install npm dependencies for `client`
  - `make install-server` will install npm dependencies for `server`
- `make run-dev-server` will start the Node.js server
- `make run-webpack-dev-server` will start the WebpackDevServer, which is handy for quick `bundle.js` compilation times during development.
- `make install-database` will use `psql` to connect to your database and execute `createdb.sql`.  It uses database information and credentials from your `default|test|production.json` config files (see [Configuration](#configuration).

###Usage:
- Navigate to `http://localhost:9000` to view the application
- Navigate to `http://localhost:9001` to bring up [GraphiQL](https://github.com/graphql/graphiql), GraphQL's interactive IDE for testing GraphQL queries

###Building (generally not necessary to get up and running locally)
- `make build-client` will build two files:
  - `/assets/js/bundle.js` (entry point: `/assets/js/init.js`)
  - `/style/baseline.css` (entry point: `/style/sass/baseline.scss`)


##Configuration
- The project uses the [config](https://www.npmjs.com/package/config) library.  We do not include any `config/default|test|production.json` files because configuration files should never be committed to source control.  For that reason, the .gitignore file contains `**/config/*`
- A sample `server/config/default.json`:

>
    {
      "database": {
        "host": "localhost",
        "port": 5984,
        "name": "mydatabase",
        "user": "myuser",
        "password": "p@ssw0rd"
      },
      "token": {
        "secret": "changeme!"
      }
    }

###Client:
- Built with [ECMAScript 2015](http://es6-features.org/), [React](https://facebook.github.io/react/), [Redux](https://github.com/reactjs/redux), [GraphQL](http://graphql.org/docs/getting-started/)


###Server:
- Resource packing ([Webpack](https://webpack.github.io/) and [WebpackDevServer](https://webpack.github.io/docs/webpack-dev-server.html))
- User authentication ([Passport](http://passportjs.org/)/[JWT](https://jwt.io/))
- [Bookshelf.js](http://bookshelfjs.org/)


###Database:
- [PostgreSQL](https://www.postgresql.org/)
- Database migrations ([Postgrator](https://github.com/rickbergfalk/postgrator))


### TODO:
- Unit tests ([mocha](https://mochajs.org/))
