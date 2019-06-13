import { Schema, model } from 'mongoose'

const UserSchema = new Schema({
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
    type: [Schema.Types.ObjectId],
    required: false,
    ref: 'Post'
  }
})

export default model('User', UserSchema)
