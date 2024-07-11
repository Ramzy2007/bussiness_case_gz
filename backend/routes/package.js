const express = require('express');
import { create, update, deletePackage, getById } from '../controller/packagecontroller.js';

const router = express.Router();

// Get all packages
router.get('/', fetch);

// Get a single package by ID
router.get('/:id', getById);

// Create a new package
router.post('/', create);

// Update a package by ID
router.put('/:id', update);

// Delete a package by ID
router.delete('/:id', deletePackage);

module.exports = router;
