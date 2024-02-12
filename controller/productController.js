const Product = require("../modal/productModal");

// Add Product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

//Get All Products
exports.getAllProduct = async (req, res) => {
  const { category, sortBy, discount, brands, price, page } = req.body;

  const filter = {};

  let pageNo = page ? page : 1;
  let limit = 10;

  if (brands && brands.length > 0) {
    filter.brand = { $in: brands };
  }

  category && (filter.category = category);
  discount && (filter.discountPercentage = { $gte: discount });

  try {
    let query = Product.find(filter);

    // Apply pagination
    query = query.skip((pageNo - 1) * limit).limit(limit);

    let fetchedProducts = await query;
    let min = 100000000;
    let max = 0;
    if (price?.length > 0) {
      price?.map((data) => {
        const Val = data?.split("-");
        if (Val[0] < min) {
          min = Val[0];
        }
        if (Val[1] > max) {
          max = Val[1];
        }
      });
      fetchedProducts = fetchedProducts?.filter((item) => {
        const price = Math.floor(
          item?.price - (item?.price * item?.discountPercentage) / 100
        );
        if (min <= price && price <= max) return item;
      });
    }

    if (sortBy != "relevance")
      fetchedProducts.sort((a, b) => {
        return sortBy == "lowestFirst" ? a.price - b.price : b.price - a.price;
      });

    const totalCount = await Product.countDocuments(filter);

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;

    const responseData = {
      products: fetchedProducts,
      pagination: {
        totalCount,
        totalPages,
        currentPage: page,
        hasNextPage,
        hasPrevPage,
        limit,
      },
    };

    if (fetchedProducts) {
      res.json(responseData);
    }
  } catch (error) {
    console.error("Error finding products:", error);
    res.status(500).send("Internal Server Error");
  }
};

//get single Product
exports.fetchProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
};

//get single Product
exports.FilterProducts = async (req, res) => {
  const {
    type,
    brands,
    category,
    subcategory,
    price,
    discountPercentage,
    for: gender,
  } = req.body;

  try {
    let query = {};

    if (gender) {
      query.for = gender;
    }
    if (subcategory && subcategory != "all") {
      query.subCategory = subcategory;
    }
    if (type) {
      query.type = type;
    }
    if (brands && brands.length > 0) {
      query.brand = { $in: brands };
    }

    if (discountPercentage) {
      query.discountPercentage = { $gte: discountPercentage };
    }
    if (category) {
      query.category = category;
    }

    let products = await Product.find(query);
    let min = 100000000;
    let max = 0;
    if (price?.length > 0) {
      console.log(price);
      price?.map((data) => {
        const Val = data?.split("-");
        if (Val[0] < min) {
          min = Val[0];
        }
        if (Val[1] > max) {
          max = Val[1];
        }
      });
      products = products?.filter((item) => {
        const price = Math.floor(
          item?.price - (item?.price * item?.discountPercentage) / 100
        );
        if (min <= price && price <= max) return item;
      });
    }
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.fetchBrand = async (req, res) => {
  const { subCategory, type, for: gender } = req.query;
  const filter = {};
  if (subCategory) filter.subCategory = subCategory;
  if (gender) filter.for = gender.trim();
  if (type) filter.type = type;

  console.log(filter, "filter");
  try {
    const brand = await Product.find(filter, "brand");
    const uniqueBrands = Array.from(new Set(brand.map((item) => item.brand)));
    res.status(200).json(uniqueBrands);
  } catch (err) {
    res.status(400).json(err);
  }
};
// exports.getSingleProduct = async (req, res, next) => {
//   const { id } = req.params;

//   let Product = await Product.findById(id);
//   if (!Product) {
//     return res.status(500).json({
//       success: false,
//       message: "product not found",
//     });
//   }
//   res.status(200).json({
//     success: true,
//     Product,
//   });
// };

// update product

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    product.discountPrice = Math.round(
      product.price * (1 - product.discountPercentage / 100)
    );
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
};

// exports.updateProduct = async (req, res) => {
//   let Product = await Prodc.findById({ _id: req.params.id });
//   if (!Product) {
//     res.status(500).json({
//       success: false,
//       message: "product not found",
//     });
//   }
//   Product = await Prodc.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//     Product,
//   });
// };

//deltete Product
exports.deleteProduct = async (req, res) => {
  let Product = await Prodc.findById({ _id: req.params.id });
  if (!Product) {
    res.status(500).json({
      success: false,
      message: "product not found",
    });
  }
  await Product.remove();
  res.status(200).json({
    success: true,
    message: "product deleted successfully",
  });
};
