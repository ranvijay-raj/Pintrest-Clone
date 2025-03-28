const postSchema = mongoose.Schema({
  title: String,
  view: String,
  url: [{
    type: String
  }],
  date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user"
  }]
})
module.exports = mongoose.model('posts', postSchema)
