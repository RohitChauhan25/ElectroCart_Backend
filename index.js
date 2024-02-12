const express = require("express");

const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authenticate = require("./middleware/auth");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env || 8000;
//Import Routes
const Prod = require("./routes/productRoute");
const Brand = require("./routes/brandRoutes");
const Category = require("./routes/categoryRoutes");
const Auth = require("./routes/userRoutes");
const Cart = require("./routes/cartRoutes");
const Type = require("./routes/typesRoute");
const SubCategory = require("./routes/subCategoryRoute");

const stripe = require("stripe")(
  "sk_test_51JvwvmSGr3DzIFbiAavqlpOqi6zNPywkGj5EQ83r9Gj4OjeWQAcSLUgNxXdnrk6IGCpgpim8u8S5xC5IZ5C3XdfW00RWrx5LpB"
);
// Import Schema

const uri =
  "mongodb+srv://ronychauhan1:bholenath@cluster0.9evehx2.mongodb.net/E-COM-DATABASE?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose.set("strictPopulate", false);
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((err) => console.log(err));

const corsOptions = {
  origin: "*", // Replace with your allowed domain(s)
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true, // Allow cookies and authentication headers
  optionsSuccessStatus: 204, // No content status for preflight requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", Prod);
app.use("/", Brand);
app.use("/", Category);
app.use("/", Auth);
app.use("/", Cart);
app.use("/", Type);
app.use("/", SubCategory);

app.use("/api/create-checkout-session", async (req, res) => {
  const { products } = req.body;

  const lineItems = products?.map((product) => ({
    price_data: {
      currency: "inr",
      product_data: {
        name: product.title,
        images: product.images,
      },
      unit_amount: product.price * 100,
    },
    quantity: 1,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:3000/sucess",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.json({ id: session.id });
});

app.listen(port, () => {
  console.log("running on server: 8000");
});
