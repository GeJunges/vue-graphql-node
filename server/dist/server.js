"use strict";

var _apolloServer = require("apollo-server");

var _mongoose = require("mongoose");

var _dotenv = require("dotenv");

var _fs = _interopRequireDefault(require("fs"));

var _User = _interopRequireDefault(require("./models/User"));

var _Post = _interopRequireDefault(require("./models/Post"));

var _resolvers = _interopRequireDefault(require("./resolvers.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const path = require('path');

const filePath = path.join(__dirname, '../src', './typeDefs.gql');

const typeDefs = _fs.default.readFileSync(filePath, 'utf-8');

(0, _dotenv.config)({
  path: path.join(__dirname, '../src', 'variables.env')
});
(0, _mongoose.connect)(process.env.MONGO_URI, {
  useNewUrlParser: true
}).then(() => console.log(`DB Connected`)).catch(err => console.error(err));
var server = new _apolloServer.ApolloServer({
  typeDefs,
  resolvers: _resolvers.default,
  context: {
    User: _User.default,
    Post: _Post.default
  }
});
server.listen(process.env.PORT).then(({
  url
}) => {
  console.log(`server listening on port ${process.env.PORT}`);
  console.log(`mongoose ${_mongoose.connect}`);
  console.log(`server listening on ${url}`);
}).catch(err => console.error(err));