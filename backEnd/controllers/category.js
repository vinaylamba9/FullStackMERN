const Category = require("../models/Category");

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "Category not found in DB",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res, next) => {
  const category = new Category(req.body);
  category.save((err, cate) => {
    if (err || !cate) {
      return res.status(400).json({
        error: "CANNOT save this category in DB",
      });
    }
    res.json({ category });
  });
};

exports.getCategory = (req, res) => {
  return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
  Category.find().exec((err, categories) => {
    if (err || !categories) {
      return res.status(400).json({
        error: "CANNOT FETCH ALL CATEGORIES",
      });
    }
    res.json(categories);
  });
};

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, updatedCategory) => {
    if (err || !updatedCategory) {
      return res.status(400).json({
        error: "CANNOT updated category",
      });
    }
    res.json(updatedCategory);
  });
};

exports.removeCategory = (req, res) => {
  console.log("asfasj ldsajfsaf lksfj");
  const category = req.category;
  console.log(category);
  category.remove((err, removedCategory) => {
    if (err) {
      return res.status(400).json({
        error: "CANNOT remove category",
      });
    }
    res.json({
      message: `${category.name} category has successfully deleted.`,
    });
  });
};
