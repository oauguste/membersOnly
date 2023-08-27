#! /usr/bin/env node

console.log(
  'This script populates some test users and posts to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/your_db_name?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const User = require("./model/users");
const Post = require("./model/posts");

const users = [];
const posts = [];

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = userArgs[0];

main().catch((err) => console.log(err));

async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Debug: Should be connected?");
  await createUsers();
  await createPosts();
  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

async function userCreate(
  index,
  first_name,
  last_name,
  membership_status,
  username,
  emailAddress,
  password
) {
  const userDetail = {
    first_name,
    last_name,
    membership_status,
    username,
    emailAddress,
    password,
  };

  const user = new User(userDetail);
  await user.save();
  users[index] = user;
  console.log(`Added user: ${username}`);
}

async function postCreate(index, title, user, message) {
  const postDetail = {
    title,
    user,
    message,
  };

  const post = new Post(postDetail);
  await post.save();
  posts[index] = post;
  console.log(`Added post: ${title}`);
}

async function createUsers() {
  console.log("Adding users");
  await Promise.all([
    userCreate(
      0,
      "John",
      "Doe",
      "premium",
      "johndoe",
      "john@example.com",
      "password123"
    ),
    userCreate(
      1,
      "Jane",
      "Smith",
      "basic",
      "janesmith",
      "jane@example.com",
      "password456"
    ),
  ]);
}

async function createPosts() {
  console.log("Adding posts");
  await Promise.all([
    postCreate(
      0,
      "First Post",
      users[0]._id,
      "This is the first post by John Doe!"
    ),
    postCreate(
      1,
      "Second Post",
      users[1]._id,
      "This is a post by Jane Smith!"
    ),
  ]);
}
