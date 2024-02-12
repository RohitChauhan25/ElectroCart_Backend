const Category = require("../modal/category");

exports.fetchCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).exec();
    res.status(200).json(categories);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.createCategory = async (req, res) => {
//   const category = new Category(req.body);
//   try {
//     const doc = await category.save();
//     res.status(201).json(doc);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// };

exports.createCategorys = async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = await Category.create({ name });
    res.status(201).json(newCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
