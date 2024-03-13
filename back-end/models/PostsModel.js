const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
});

const PostModel = mongoose.model("postData", PostSchema, "postData");
module.exports = PostModel;
