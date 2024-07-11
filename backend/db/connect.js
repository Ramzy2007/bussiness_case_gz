const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const connectDb = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Ajuster le délai d'attente de la sélection du serveur
        });
        console.log("Connected to MongoDB!");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        throw error;
    }
};

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from DB');
});

module.exports = { connectDb };