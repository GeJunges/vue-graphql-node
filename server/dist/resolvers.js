"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resolvers = void 0;

const bcryptjs = require('bcryptjs');

const jwt = require('jsonwebtoken');

const createToken = (user, secret, expiresIn) => {
  const {
    username,
    email
  } = user;
  return jwt.sign({
    username,
    email
  }, secret, {
    expiresIn
  });
};

const resolvers = {
  Query: {
    getPosts: async (_, args, {
      Post
    }) => {
      const posts = await Post.find({}).sort({
        createdDate: 'desc'
      }).populate({
        path: 'createdBy',
        model: 'User'
      });
      return posts;
    }
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
        creatorId,
        createdBy: creatorId
      }).save();
      return newPost;
    },
    signinUser: async (_, {
      userName,
      password
    }, {
      User
    }) => {
      const user = await User.findOne({
        userName
      });

      if (!user) {
        throw new Error('user not fount');
      }

      const isValidPassword = await bcryptjs.compare(password, user.password);

      if (!isValidPassword) {
        throw new Error('invalid password');
      }

      return {
        token: createToken(user, process.env.SECRET, '1hr')
      };
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
      return {
        token: createToken(newUser, process.env.SECRET, '1hr')
      };
    }
  }
};
exports.resolvers = resolvers;