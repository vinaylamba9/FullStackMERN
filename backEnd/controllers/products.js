const Product = require("../models/Product");

exports.getProductById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found in DB",
      });
    }
    req.product = product;
    next();
  });
};
