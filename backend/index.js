const express = require('express');
const port = 3000;
const { connectDB } = require('./connectdb');
const authRoutes = require('./routes/auth.routes');

const app = express();
app.use(express.json()); // parse JSON
connectDB();

app.get('/', async (req, res) => {
    res.send("Connected to MongoDB!");
    console.log("Handled request and responded.");
});

app.use('/auth', authRoutes);

app.listen(port, async() => {
    console.log(`Server is running on http://localhost:${port}`);
})