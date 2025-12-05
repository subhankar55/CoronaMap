const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// --- Define the same schema that your app will use ---
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    infected: Number
});

const Location = mongoose.model('Location', locationSchema);

// --- Main Seeding Function ---
async function seedDatabase() {
    try {
        // --- Connect to MongoDB ---
        await mongoose.connect('mongodb://127.0.0.1:27017/coronaDB');
        console.log("Database connected for seeding.");

        // --- Clear existing data in the 'locations' collection ---
        await Location.deleteMany({});
        console.log("Cleared existing data from the 'locations' collection.");

        // --- Read the data.json file ---
        const jsonPath = path.join(__dirname, 'public', 'data.json');
        const jsonData = fs.readFileSync(jsonPath, 'utf-8');
        const data = JSON.parse(jsonData).data; // Get the nested 'data' array

        if (!data) {
            throw new Error("'data' array not found in data.json");
        }

        // --- Insert the data into the database ---
        await Location.insertMany(data);
        console.log("Successfully seeded the database!");

    } catch (error) {
        console.error("Error seeding the database:", error);
    } finally {
        // --- Disconnect from the database ---
        mongoose.connection.close();
        console.log("Database connection closed.");
    }
}

// --- Run the seeding function ---
seedDatabase();
