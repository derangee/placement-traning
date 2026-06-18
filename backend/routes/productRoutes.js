const express = require("express");
const {
  addProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const createProductRoutes = (upload) => {
  const router = express.Router();

  router.get("/", (req, res) => {
    res.send("server is working ");
  });

  router.post("/add/products", upload.single("image"), addProduct);
  router.get("/get/products", getProducts);
  router.get("/get/products/:id", getProductById);
  router.put("/update/products/:id", updateProduct);
  router.delete("/del/products/:id", deleteProduct);

  return router;
};

module.exports = createProductRoutes;
