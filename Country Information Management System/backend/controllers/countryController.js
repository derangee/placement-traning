const Country = require("../models/Country");
const cloudinary = require("../config/cloudinary");

// Create Country
const createCountry = async (req, res) => {
  try {
    const {
      name,
      capital,
      continent,
      population,
      area,
      currency,
      language,
      description,
    } = req.body;

    if (
      !name ||
      !capital ||
      !continent ||
      !population ||
      !area ||
      !currency ||
      !language
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    let flagData = {};

    // Upload flag image if provided
    if (req.files && req.files.flag) {
      const flagFile = req.files.flag;
      const uploadResult = await cloudinary.uploader.upload(
        flagFile.tempFilePath,
        {
          folder: "country-flags",
          resource_type: "auto",
        },
      );
      flagData = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    const country = new Country({
      name,
      capital,
      continent,
      population,
      area,
      currency,
      language,
      description,
      flag: flagData,
      createdBy: req.userId,
    });

    await country.save();
    await country.populate("createdBy", "name email");

    res.status(201).json({
      message: "Country created successfully",
      country,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get all countries
const getAllCountries = async (req, res) => {
  try {
    const countries = await Country.find().populate("createdBy", "name email");
    res.status(200).json({
      message: "Countries fetched successfully",
      count: countries.length,
      countries,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get country by ID
const getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id).populate(
      "createdBy",
      "name email",
    );

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json({
      message: "Country fetched successfully",
      country,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Update Country
const updateCountry = async (req, res) => {
  try {
    let country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    // Check if user is the creator
    if (country.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this country" });
    }

    const {
      name,
      capital,
      continent,
      population,
      area,
      currency,
      language,
      description,
    } = req.body;

    // Update fields
    if (name) country.name = name;
    if (capital) country.capital = capital;
    if (continent) country.continent = continent;
    if (population) country.population = population;
    if (area) country.area = area;
    if (currency) country.currency = currency;
    if (language) country.language = language;
    if (description) country.description = description;

    // Update flag if new image provided
    if (req.files && req.files.flag) {
      // Delete old image from Cloudinary
      if (country.flag.public_id) {
        await cloudinary.uploader.destroy(country.flag.public_id);
      }

      const flagFile = req.files.flag;
      const uploadResult = await cloudinary.uploader.upload(
        flagFile.tempFilePath,
        {
          folder: "country-flags",
          resource_type: "auto",
        },
      );

      country.flag = {
        public_id: uploadResult.public_id,
        url: uploadResult.secure_url,
      };
    }

    country.updatedAt = Date.now();
    await country.save();
    await country.populate("createdBy", "name email");

    res.status(200).json({
      message: "Country updated successfully",
      country,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete Country
const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    // Check if user is the creator
    if (country.createdBy.toString() !== req.userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this country" });
    }

    // Delete image from Cloudinary
    if (country.flag.public_id) {
      await cloudinary.uploader.destroy(country.flag.public_id);
    }

    await Country.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: "Country deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Search countries
const searchCountries = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: "Please provide search query" });
    }

    const countries = await Country.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { capital: { $regex: query, $options: "i" } },
        { continent: { $regex: query, $options: "i" } },
      ],
    }).populate("createdBy", "name email");

    res.status(200).json({
      message: "Search results",
      count: countries.length,
      countries,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createCountry,
  getAllCountries,
  getCountryById,
  updateCountry,
  deleteCountry,
  searchCountries,
};
