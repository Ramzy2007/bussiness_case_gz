const Package = require('../models/package.js');
// For posting data into database 
export const create = async (req, res) => {
    try {
        const packageData = new Package(req.body);
        const { id } = packageData;
        const packageExist = await Package.findOne({ id })
        if (packageExist) {
            return res.status(400).json({ message: "Package already exist." })
        }
        const savedPackage = await packageData.save();
        res.status(200).json(savedPackage)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error. " })
    }
}

// For getting all packages from database 
export const fetch = async (req, res) => {
    try {
        const packages = await Package.find();
        if (packages.length === 0) {
            return res.status(404).json({ message: "Package not Found." })
        }
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}

// For updating data 
export const getById = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return res.status(404).json({ message: "Package not found." })
        }

        res.status(200).json(packageExist);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
// For updating data 
export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return res.status(404).json({ message: "Package not found." })
        }
        const updatePackage = await Package.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatePackage);
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}
// For deleting data from database 
export const deletePackage = async (req, res) => {
    try {
        const id = req.params.id;
        const packageExist = await Package.findOne({ _id: id })
        if (!packageExist) {
            return res.status(404).json({ message: " Package Not Found. " })
        }
        await Package.findByIdAndDelete(id);
        res.status(201).json({ message: " Package deleted Successfully." })
    } catch (error) {
        res.status(500).json({ error: " Internal Server Error. " })
    }
}