----
# Node.js app starter kit

##### This project aims to serve as a basis for new Node.js projects.  It has many tools and features that a typical modern Node.js web applications needs:

###Client:
- Built with React, Redux, GraphQL


###Server:
- Resource packing (Webpack and WebpackDevServer)
- User authentication (JWT)


###Database:
- PostgreSQL
- Database migrations (Postgrator)


###Configuration
- The project uses the [config](https://www.npmjs.com/package/config) library.  For security, we do not include the file because configuration files should never be committed to source control.  For that reason, the .gitignore file contains `server|client/config/**/*.*`
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
        "secret": "tellmeasecret"
      },
    }

### TODO:
- Unit tests (mocha)
