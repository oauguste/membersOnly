const {
  body,
  validationResult,
} = require("express-validator");
const Users = require("../model/users");
const Posts = require("../model/posts");
const asyncHandler = require("express-async-handler");
const passport = require("../config/passportSetup");

exports.usersControllers_logout_post = asyncHandler(
  async (req, res, next) => {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      res.redirect("/catalog/allposts");
    });
  }
);

exports.usersControllers_create_user_get = asyncHandler(
  async (req, res, next) => {
    const allPosts = await Posts.find().exec();
    res.render("register", {
      title: "Sign Up form",
      posts: allPosts,
    });
  }
);
exports.usersControllers_create_user_post =
  //validate and sanitize fields
  [
    body("first_name", "first name must not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("last_name", "last name must not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("username", "username must not be empty")
      .trim()
      .isLength({ min: 1 })
      .escape(),
    body("emailAddress", "email must not be empty")
      .trim()
      .isEmail()
      .escape(),
    body(
      "membership_status",
      "Membership status must be either premium or basic"
    )
      .isIn(["premium", "basic"])
      .escape(),
    body(
      "password",
      "password must not be at least 5 characters"
    )
      .trim()
      .isLength({ min: 5 })
      .escape(),

    asyncHandler(async (req, res, next) => {
      const errors = validationResult(req);
      const user = new Users({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        membership_status: req.body.membership_status,
        password: req.body.password,
      });

      if (!errors.isEmpty()) {
        const allPosts = await Posts.find().exec();
        req.flash(
          "error",
          "Validation errors occurred. Please try again."
        );
        res.render("register", {
          title: "Sign Up form",
          posts: allPosts,
          errors: errors,
        });
      } else {
        try {
          await user.save();
          req.flash(
            "success",
            "User successfully created."
          );
          res.redirect("/catalog/allPosts");
        } catch (error) {
          req.flash(
            "error",
            "An error occurred while creating the user."
          );
          return next(error);
        }
      }
    }),
  ];
exports.usersControllers_login_user_get = asyncHandler(
  async (req, res, next) => {
    res.render("login", {
      title: "Login",
    });
  }
);
exports.usersControllers_login_user_post = asyncHandler(
  async (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/catalog/login",
      failureFlash: "Invalid username or password",
    })(req, res, next);
  }
);
