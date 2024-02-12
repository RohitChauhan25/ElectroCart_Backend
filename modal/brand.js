const mongoose = require("mongoose");

const brandSchema = new mongoose.Schema({
  name: String,
  category: {
    type: Array,
  },
  for: {
    type: Array,
  },
  type: {
    type: Array,
  },
});

const virtual = brandSchema.virtual("id");
virtual.get(function () {
  return this._id;
});

brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Brand = new mongoose.model("BRAND", brandSchema);

module.exports = Brand;
