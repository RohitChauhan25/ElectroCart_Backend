const SubCategory = require("../modal/subCategory");

exports.fetchSubCategories = async (req, res) => {
  try {
    const subCategory = await SubCategory.find({}).exec();
    res.status(201).json(subCategory);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createSubCategorys = async (req, res) => {
  try {
    const { name } = req.body;
    const response = await SubCategory.create({ name });
    res.status(201).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
