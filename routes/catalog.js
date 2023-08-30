const express = require("express");
const router = express.Router();

const posts_Controllers = require("../controllers/PostsController");
const users_Controllers = require("../controllers/UsersController");

//Posts
router.get(
  "/home",
  posts_Controllers.postsControllers_index
);

router.get(
  "/allPosts",
  posts_Controllers.postsControllers_all_posts_get
);
router.post(
  "/logout",
  users_Controllers.usersControllers_logout_post
);
router.get(
  "/userpost",
  users_Controllers.usersControllers_create_posts_get
);
router.post(
  "/userpost",
  users_Controllers.usersControllers_create_posts_post
);
router.get(
  "/register",
  users_Controllers.usersControllers_create_user_get
);
router.post(
  "/register",
  users_Controllers.usersControllers_create_user_post
);
router.get(
  "/login",
  users_Controllers.usersControllers_login_user_get
);
router.post(
  "/login",
  users_Controllers.usersControllers_login_user_post
);

module.exports = router;
