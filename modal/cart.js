const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new mongoose.Schema({
  quantity: { type: Number, required: true },
  product: { type: Schema.Types.ObjectId, ref: "PRODUCT", required: true },
  user: { type: Schema.Types.ObjectId, ref: "USER", required: true },
  size: { type: Schema.Types.Mixed },
  color: { type: Schema.Types.Mixed },
});

const virtualId = cartSchema.virtual("id");
virtualId.get(function () {
  return this._id;
});

cartSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

const Cart = new mongoose.model("CART", cartSchema);

module.exports = Cart;
