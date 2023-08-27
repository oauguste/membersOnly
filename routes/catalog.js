const express = require("express");
const router = express.Router();

const posts_Controllers = require("../controllers/PostsController");
const users_controllers = require("../controllers/UsersController");

//Posts

router.get(
  "/allPosts",
  posts_Controllers.postsControllers_all_posts_get
);
router.post(
  "/logout",
  users_controllers.usersControllers_logout_post
);
router.post(
  "/newpost",
  posts_Controllers.postsControllers_create_posts_post
);
router.get(
  "/register",
  users_controllers.usersControllers_create_user_get
);
router.post(
  "/register",
  users_controllers.usersControllers_create_user_post
);
router.get(
  "/login",
  users_controllers.usersControllers_login_user_get
);
router.post(
  "/login",
  users_controllers.usersControllers_login_user_post
);

module.exports = router;
