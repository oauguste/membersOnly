const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Users = require("../model/users");

passport.use(
  new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const user = await Users.findOne({
          username: username,
        });
        if (!user) {
          req.flash("error", "Incorrect username");
          return done(null, false);
        }

        if (user.password !== password) {
          req.flash("error", "Incorrect password");
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await Users.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
