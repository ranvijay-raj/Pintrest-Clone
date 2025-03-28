const mongoose = require('mongoose');
let plm = require("passport-local-mongoose")
const userSchema = mongoose.Schema({
  fullname: String,
  accountname: {
    type: String,
    unique: true
  },
  password: String,
  username: {
    type: String,
    unique: true
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts"
  }],
  dp: {
    type: String,
    default: ""
  }
})
userSchema.plugin(plm)
module.exports = mongoose.model('user', userSchema)
