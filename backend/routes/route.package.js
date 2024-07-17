const express = require("express");
const {
  deletePackage,
  updatePackage,
  createPackage,
  getPackage,
  getPackages,
} = require("../controllers/package.controller.js");

const router = express.Router();

// Get all packages
router.get("", getPackages);

// Get a single package by ID
router.get("/:id", getPackage);

// Create a new package
router.post("", createPackage);

// Update a package by ID
router.put("/:id", updatePackage);

// Delete a package by ID
router.delete("/:id", deletePackage);

module.exports = router;
