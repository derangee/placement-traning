const express = require("express");
const router = express.Router();
const {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  searchCountries,
} = require("../controllers/countryController");
const authMiddleware = require("../middleware/auth");

// Public routes
router.get("/", getAllCountries);
router.get("/search", searchCountries);
router.get("/:id", getCountryById);

// Protected routes
router.post("/", authMiddleware, createCountry);
router.put("/:id", authMiddleware, updateCountry);
router.delete("/:id", authMiddleware, deleteCountry);

module.exports = router;
