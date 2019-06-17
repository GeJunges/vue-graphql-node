"use strict";

var _apolloServer = require("apollo-server");

var _mongoose = require("mongoose");

var _dotenv = require("dotenv");

var _fs = _interopRequireDefault(require("fs"));

var _User = _interopRequireDefault(require("./models/User"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _resolvers = require("./resolvers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const jwt = require('jsonwebtoken');

const path = require('path');

const filePath = path.join(__dirname, '../src', './typeDefs.gql');

const typeDefs = _fs.default.readFileSync(filePath, 'utf-8');

(0, _dotenv.config)({
  path: path.join(__dirname, '../src', 'variables.env')
});
(0, _mongoose.connect)(process.env.MONGO_URI, {
  useCreateIndex: true,
  useNewUrlParser: true
}).then(() => console.log(`DB Connected`)).catch(err => console.error('error:', err));

const getUser = async token => {
  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (err) {
      throw new _apolloServer.AuthenticationError('Your session has ended. Please sign in again');
    }
  }
};

var server = new _apolloServer.ApolloServer({
  typeDefs,
  resolvers: _resolvers.resolvers,
  context: async ({
    req
  }) => {
    const token = req.headers['authorization'];
    const currentUser = await await getUser(token);
    return {
      User: _User.default,
      Post: _Post.default,
      currentUser: currentUser
    };
  }
});
server.listen(process.env.PORT).then(({
  url
}) => {
  console.log(`server listening on port ${process.env.PORT}`);
  console.log(`server listening on ${url}`);
}).catch(err => console.error('error:', err));