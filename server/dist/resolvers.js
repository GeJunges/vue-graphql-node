"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;
const resolvers = {
  Query: {
    getUser: () => null
  },
  Mutation: {
    addPost: async (_, {
      title,
      imageUrl,
      categories,
      description,
      creatorId
    }, {
      Post
    }) => {
      const newPost = await new Post({
        title,
        imageUrl,
        categories,
        description,
        creatorId
      }).save();
      return newPost;
    },
    signupUser: async (_, {
      userName,
      email,
      password
    }, {
      User
    }) => {
      const user = await User.findOne({
        userName: userName
      });

      if (user) {
        throw new Error('User already exist');
      }

      const newUser = await new User({
        userName,
        email,
        password
      }).save();
      return newUser;
    }
  }
};
exports.resolvers = resolvers;