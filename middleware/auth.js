const Users = require("../modal/user");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [Bearer, token] = authorization?.split(" ");

    if (!authorization || !token) {
      res.status(401).send("Invalid token");
    }

    const verifyingToken = jwt.verify(token, "this is screte key");
    const user = await Users.findOne({ _id: verifyingToken.id });

    if (!user) {
      res.status(401).send("User not found");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = authenticate;

// https://api.cloudinary.com/v1_1/${cloudName}/upload     diyaofpbn
