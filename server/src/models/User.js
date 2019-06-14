import { Schema, model } from 'mongoose'
const md5 = require('md5')
const bcryptjs = require('bcryptjs')

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    trim: true
  },
  avatar: {
    type: String
  },
  joinDate: {
    type: Date,
    default: Date.now
  },
  favorites: {
    type: [Schema.Types.ObjectId],
    required: true,
    ref: 'Post'
  }
})

UserSchema.pre('save', function(next) {
  this.avatar = `http://gravatar.com/avatar/${md5(this.userName)}?d=identicon`
  next()
})

UserSchema.pre('save', function(next) {
  if (!this.isModified('password')) {
    return next()
  }
  bcryptjs.genSalt(10, (err, salt) => {
    if (err) {
      return err
    }

    bcryptjs.hash(this.password, salt, (err, hash) => {
      if (err) {
        return err
      }

      this.password = hash
      next()
    })
  })
})

export default model('User', UserSchema)
