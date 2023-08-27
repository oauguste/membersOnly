const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { DateTime } = require("luxon"); //for date handling

const PostSchema = new Schema({
  title: { type: String, required: true },
  user: {
    type: Schema.ObjectId,
    ref: "UserSchema",
    required: true,
  },
  message: { type: String, required: true, maxLength: 500 },
  messageCreatedDate: { type: Date, default: Date.now },
});

PostSchema.virtual("url").get(function () {
  return "/catalog/posts/" + this._id;
});

module.exports = mongoose.model("PostSchema", PostSchema);
