"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

const PostSchema = new _mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  categories: {
    type: [String],
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  likes: {
    type: Number,
    default: 0
  },
  createdBy: {
    type: _mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  messages: [{
    messageBody: {
      type: String,
      required: true
    },
    messageDate: {
      type: Date,
      default: Date.now
    },
    messageUser: {
      type: _mongoose.Schema.Types.ObjectId,
      re: 'User'
    }
  }]
});

var _default = (0, _mongoose.model)('Post', PostSchema);

exports.default = _default;