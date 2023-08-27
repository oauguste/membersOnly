const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");

const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  last_name: {
    type: String,
    required: true,
    maxLength: 20,
  },
  membership_status: {
    type: String,
    required: true,
    enum: ["premium", "basic"],
  },

  username: { type: String, required: true, maxLength: 20 },
  emailAddress: {
    type: String,
    required: true,
    validate: {
      validator: function (email) {
        return validator.isEmail(email);
      },
      message: (props) =>
        `${props.value} is not a valid email address!`,
    },
  },
  password: { type: String, required: true },
});
UserSchema.virtual("url").get(function () {
  return "/catalog/user/" + this._id;
});

module.exports = mongoose.model("UserSchema", UserSchema);
