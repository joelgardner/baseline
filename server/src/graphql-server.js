
var express = require('express');
var graphqlHTTP = require('express-graphql'),
    graphql = require('graphql'),
    GraphQLSchema = graphql.GraphQLSchema,
    GraphQLObjectType = graphql.GraphQLObjectType,
    GraphQLString = graphql.GraphQLString,
    GraphQLBoolean = graphql.GraphQLBoolean,
    GraphQLInt = graphql.GraphQLInt;
var User = require('./data/models/user').Model,
    Organization = require('./data/models/organization').Model,
    Contact = require('./data/models/contact').Model;

var ContactType = new GraphQLObjectType({
  name: 'Contact',
  description: 'Object representing a row in the contacts table.',
  fields: {
    id: {
      type: GraphQLString,
      description: 'Id of the contact'
    },
    firstName: {
      type: GraphQLString,
      description: 'The contact\'s first name'
    },
    lastName: {
      type: GraphQLString,
      description: 'The contact\'s last name'
    },
    email: {
      type: GraphQLString,
      description: 'The contact\'s email'
    },
    companyName: {
      type: GraphQLString,
      description: 'The contact\'s company name'
    },
    address1: {
      type: GraphQLString,
      description: 'The contact\'s address\' first line'
    },
    address2: {
      type: GraphQLString,
      description: 'The contact\'s address\' second line'
    },
    zip: {
      type: GraphQLString,
      description: 'The contact\'s postal code'
    },
    state: {
      type: GraphQLString,
      description: 'The contact\'s state'
    },
    country: {
      type: GraphQLString,
      description: 'The contact\'s country'
    }
  }
});

var UserType = new GraphQLObjectType({
  name: 'User',
  description: 'Object representing a row in the users table.',
  fields: {
    id: {
      type: GraphQLString,
      description: 'Id of the user'
    },
    email: {
      type: GraphQLString,
      description: 'Email'
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not the user is active.'
    },
    isVerified: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not a user\'s email has been verified.'
    }
  }
});

var OrganizationType = new GraphQLObjectType({
  name: 'Organization',
  description: 'Object representing a row in the organizations table.',
  fields: {
    id: {
      type: GraphQLString,
      description: 'Id of the organization'
    },
    owner: {
      type: UserType,
      description: 'The owning user of the organization (usually the person who pays the bills).'
    },
    description: {
      type: GraphQLString,
      description: 'A text description of the organization'
    },
    isActive: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not the user is active.'
    },
    isVerified: {
      type: GraphQLBoolean,
      description: 'Indicates whether or not a user\'s email has been verified.'
    }
  }
});


var BaselineQueryType = new GraphQLObjectType({
  name: "Baseline",
  description: "Baseline toplevel query",
  fields: {
    user: {
      type: UserType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function(_, args){
        return new Promise(function(resolve, reject) {
          User.forge({ id: args.id }).fetch()
            .then(function(org) {
                resolve(org.toJSON());
              }, reject);
        });
      }
    },
    organization: {
      type: OrganizationType,
      args: {
        id: {
          type: GraphQLString
        }
      },
      resolve: function(_, args) {
        return new Promise(function(resolve, reject) {
          Organization.forge({ id: args.id }).fetch()
            .then(function(org) {
              resolve(org.toJSON());
            }, reject);
        });
      }
    }
  }
});

var schema = new GraphQLSchema({
 query: BaselineQueryType
});

var graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({ schema: schema, graphiql: true }));
graphQLServer.listen(9001);
console.log("The GraphQL Server is running.")
