const Package = require('../models/model.package.js');
const { sendErrorResponse, sendSuccessResponse } = require('../utils/responses.js');
// For posting data into database 
const createPackage = async (req, res) => {
    const package = new Package(req.body);
  try {
    const newPackage = await package.save();
    return sendSuccessResponse(res,"PACKAGE_CREATED",newPackage, 201);
    //res.status(201).json(newPackage);
  } catch (err) {
    return sendErrorResponse(res, 'VALIDATION_ERROR',{ message: err.message });
    //res.status(400).json({ message: err.message });
  }
}

// For getting all packages from database 
const getPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        if (packages.length === 0) {
            return sendErrorResponse(res, 'PACKAGE_NOT_FOUND',{ message: "Package not Found." });
        }
        return sendSuccessResponse(res,"PACKAGE_FETCHED",packages, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

// For updating data 
const getPackage = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return sendErrorResponse(res, 'PACKAGE_NOT_FOUND',{ message: "Package not Found." });
        }
        return sendSuccessResponse(res,"PACKAGE_FETCHED",packageExist, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}
// For updating data 
const updatePackage = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return sendErrorResponse(res, 'PACKAGE_NOT_FOUND',{ message: "Package not Found." });
        }
        const updatePackage = await Package.findByIdAndUpdate(id, req.body, { new: true });
        return sendSuccessResponse(res,"PACKAGE_UPDATED",updatePackage, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}
// For deleting data from database 
const deletePackage = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return sendErrorResponse(res, 'PACKAGE_NOT_FOUND',{ message: "Package not Found." });
        }
        await Package.findByIdAndDelete(id);
        return sendSuccessResponse(res,"PACKAGE_DELETED", { message: " Package deleted Successfully." }, 200);
    } catch (error) {
        return sendErrorResponse(res, 'SERVER_ERROR',{ message: " Internal Server Error. " });
    }
}

module.exports = {
    getPackage,
    getPackages,
    createPackage,
    updatePackage,
    deletePackage,
  };