const Brand = require("../modal/brand");

exports.fetchBrands = async (req, res) => {
  try {
    const { category, type, for: gender } = req.body;
    const filter = {};

    if (category) {
      filter.category = category;
    }

    if (type) {
      filter.type = type;
    }

    if (gender) {
      filter.for = { $in: gender };
    }

    const brands = await Brand.find(filter, "name");

    res.status(200).json(brands);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.createBrand = async (req, res) => {
  const brand = new Brand(req.body);

  try {
    const doc = await brand.save();
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json(err);
  }
};
