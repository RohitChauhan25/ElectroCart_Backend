const Users = require("../modal/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res, next) => {
  try {
    // Extract data from request body
    const { email, password, userName } = req.body;

    // Check if user with the provided email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // Create a new user instance
    const newUser = new Users({
      email,
      password: hashedPassword,
      userName,
    });

    // Save the user to the database
    await newUser.save();

    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email: email });
  try {
    if (!user)
      res.status(401).json({
        success: false,
        message: "invalid username or password",
      });
    else {
      const validate = await bcryptjs.compare(password, user.password);
      if (!validate)
        res.status(401).json({
          success: false,
          message: "invalid username or password",
        });
      else {
        const payload = {
          id: user?._id,
          email: user?.email,
        };
        const JWT_SECRET_KEY =
          process.env.JWT_SECRET_KEY || "this is screte key";
        jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { expiresIn: 86400 },
          (err, token) => {
            if (err) res.json({ message: err });
            res.status(200).send({
              id: user.id,
              name: user.userName,
              email: user.email,
              token,
            });
          }
        );
      }
    }
  } catch (error) {}
};

// exports.createUser = async (req, res) => {
//   try {
//     const salt = crypto.randomBytes(16);
//     crypto.pbkdf2(
//       req.body.password,
//       salt,
//       310000,
//       32,
//       "Roh256",
//       async function (err, hashedPassword) {
//         const user = new User({ ...req.body, password: hashedPassword, salt });
//         const doc = await user.save();

//         req.login(sanitizeUser(doc), (err) => {
//           // this also calls serializer and adds to session
//           if (err) {
//             res.status(400).json(err);
//           } else {
//             const token = jwt.sign(
//               sanitizeUser(doc),
//               process.env.JWT_SECRET_KEY
//             );
//             res
//               .cookie("jwt", token, {
//                 expires: new Date(Date.now() + 3600000),
//                 httpOnly: true,
//               })
//               .status(201)
//               .json({ id: doc.id, role: doc.role });
//           }
//         });
//       }
//     );
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };
