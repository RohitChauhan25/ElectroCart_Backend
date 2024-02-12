const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema({
  name: String,
  brands: [{ type: mongoose.Schema.Types.ObjectId, ref: "BRAND" }],
});

const virtual = subCategorySchema.virtual("id");

virtual.get(function () {
  return this._id;
});

subCategorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

subCategory = new mongoose.model("SUBCATEGORY", subCategorySchema);

module.exports = subCategory;
