const Type = require("../modal/type");

exports.fetchTypes = async (req, res) => {
  try {
    const types = await Type.find({}).exec();
    res.status(200).json(types);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createTypes = async (req, res) => {
  try {
    const { name } = req.body;
    const newTcype = await Type.create({ name });
    res.status(201).json(newTcype);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
