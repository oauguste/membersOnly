const express = require("express");
require("dotenv").config();
const createError = require("http-errors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const session = require("express-session");
const passport = require("./config/passportSetup");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const flash = require("connect-flash");
const indexRouter = require("./routes/index");
const catalogRouter = require("./routes/catalog");

const compression = require("compression");
const helmet = require("helmet");

const app = express();

const mongoDB = process.env.MONGODB_URI;
mongoose.set("strictQuery", false);

main().catch((err) => console.log(err));
async function main() {
  try {
    await mongoose.connect(mongoDB);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

//views engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(logger("dev"));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": [
        "'self'",
        "code.jquery.com",
        "cdn.jsdelivr.net",
      ],
    },
  })
);

app.use(compression()); // Compress all routes
app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});
//Routing
app.use("/", indexRouter);
app.use("/catalog", catalogRouter);

//Error Handling
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3100, () => {
  console.log("Server Running on port 3100");
});

module.exports = app;