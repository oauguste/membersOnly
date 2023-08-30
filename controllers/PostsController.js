const {
  body,
  validationResult,
} = require("express-validator");

const Posts = require("../model/posts");
const Users = require("../model/users");
const asyncHandler = require("express-async-handler");

exports.postsControllers_index = asyncHandler(
  async (req, res, next) => {
    res.render("homepage", {
      title: "Clubhouse Home",
      user: req.user,
    });
  }
);

exports.postsControllers_all_posts_get = asyncHandler(
  async (req, res, next) => {
    const allPosts = await Posts.find()
      .populate("user")
      .sort({ messageCreatedDate: -1 })
      .exec();

    const filteredPosts = allPosts.map((posts) => {
      const { title, user, message, messageCreatedDate } =
        posts;
      const username =
        req.user && req.user.membership_status === "premium"
          ? user.username
          : "Anonymous";
      const date =
        req.user && req.user.membership_status === "premium"
          ? messageCreatedDate
          : "Please login to view";

      return { title, username, message, date };
    });

    res.render("posts", {
      title: "All user posts",
      posts: filteredPosts,
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
