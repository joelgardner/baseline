----
# Node.js app starter kit

##### This project aims to serve as a basis for new Node.js projects.  It has many tools and features that a typical modern Node.js web applications needs:

##Installation:
- `make` will install npm dependencies for both `client` and `server` by running both of the following steps:
  - `make install-client` will install npm dependencies for `client`
  - `make install-server` will install npm dependencies for `server`
- `make run-dev-server` will start the Node.js server
- `make run-webpack-dev-server` will start the WebpackDevServer, which is handy for quick `bundle.js` compilation times during development.


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
