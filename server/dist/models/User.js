"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const UserSchema = new _mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    dafault: Date.Now
  },
  favorite: {
    type: [_mongoose.Schema.Types.ObjectId],
    required: false,
    ref: 'Post'
  }
});

var _default = (0, _mongoose.model)('User', UserSchema);

exports.default = _default;