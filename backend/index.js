const express = require('express');
const port = 3000;
const { connectDB } = require('./connectdb');

const app = express();

app.get('/', async (req, res) => {
    await connectDB();
    res.send("Connected to MongoDB!");
    console.log("Handled request and responded.");
});

app.listen(port, async() => {
    console.log(`Server is running on http://localhost:${port}`);
})