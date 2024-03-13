const PostModel = require("../models/PostsModel");

const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const allPosts = await PostModel.find().skip(skip).limit(limit);

    const totalPostsCount = await PostModel.countDocuments();

    const totalPages = Math.ceil(totalPostsCount / limit);
    // const allPosts = await PostModel.find();
    return res.status(200).json({ data: allPosts, totalPages });
  } catch (err) {
    res.status(500).json(err.message);
    console.log(err.message);
  }
};

module.exports = getAllPosts;
