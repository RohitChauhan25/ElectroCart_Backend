const Cart = require("../modal/cart");

exports.fetchCartByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const cartItems = await Cart.find({ user: id }).populate("product");
    res.status(200).json(cartItems);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

exports.createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const doc = await newCart.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
