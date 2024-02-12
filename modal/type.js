const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  name: String,
});

const virtual = typeSchema.virtual("id");

virtual.get(function () {
  return this._id;
});

typeSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

Type = new mongoose.model("TYPE", typeSchema);

module.exports = Type;
