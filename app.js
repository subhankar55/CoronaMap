const express = require('express')
const app = express()
const port = 3000
const path = require('path')
const mongoose = require('mongoose');

// --- Mongoose Connection ---
main().catch(err => console.log(err));
async function main() {
  // Use your own database name
  await mongoose.connect('mongodb://127.0.0.1:27017/coronaDB');
  console.log("Database connected successfully");
}

// --- Mongoose Schema and Model ---
const locationSchema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    infected: Number
});

const Location = mongoose.model('Location', locationSchema);

app.use('/static', express.static(path.join(__dirname, 'public')))

// --- NEW: API Endpoint to fetch data from MongoDB ---
app.get('/api/data', async (req, res) => {
    try {
        const locations = await Location.find({});
        res.json({ data: locations }); // Match the structure of the old data.json
    } catch (error) {
        console.error("Failed to fetch locations:", error);
        res.status(500).send("Error fetching data from database");
    }
});



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


