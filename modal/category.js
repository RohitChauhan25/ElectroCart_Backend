const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: String,
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "BRAND" }],
});

const virtual = categorySchema.virtual("id");

virtual.get(function () {
  return this._id;
});

categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Category = new mongoose.model("CATEGORY", categorySchema);

module.exports = Category;
