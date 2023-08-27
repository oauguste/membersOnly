const {
  body,
  validationResult,
} = require("express-validator");

const Posts = require("../model/posts");

const asyncHandler = require("express-async-handler");

exports.postsControllers_all_posts_get = asyncHandler(
  async (req, res, next) => {
    const allPosts = await Posts.find()
      .populate("user")
      .exec();

    res.render("posts", {
      title: "All user posts",
      posts: allPosts,
    });
  }
);

//create new post
exports.postsControllers_create_posts_get = asyncHandler(
  async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: New post: ${req.params.id}`);
  }
);

exports.postsControllers_create_posts_post = asyncHandler(
  async (req, res, next) => {
    res.send(`NOT IMPLEMENTED: New post: ${req.params.id}`);
  }
);
