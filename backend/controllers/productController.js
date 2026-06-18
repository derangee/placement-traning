const Product = require("../models/Product");

const addProduct = async (req, res) => {
  try {
    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file.path,
    });

    res.status(201).json({
      message: "products added",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(201).json({
      message: "details of products ",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    res.status(201).json({
      message: "details of products ",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      message: "details of products ",
      product,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(201).json({
      message: " deleted ",
    });
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
