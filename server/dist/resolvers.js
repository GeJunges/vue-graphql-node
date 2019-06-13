"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = exports.Query = void 0;
const Query = {
  getUser: () => null
};
exports.Query = Query;
const Mutation = {
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
};
exports.Mutation = Mutation;