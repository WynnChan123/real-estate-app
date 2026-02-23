const express = require('express');
const port = 3000;
const { connectDB } = require('./connectdb');
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const sessionRoutes = require('./routes/session.routes');
const { protect } = require('./middleware/authMiddleware');
require("dotenv").config();

const app = express();
app.use(express.json()); // parse JSON
connectDB();

app.get('/', async (req, res) => {
    res.send("Connected to MongoDB!");
    console.log("Handled request and responded.");
});

app.use('/auth', authRoutes);
app.use('/chat', protect, chatRoutes);
app.use('/session', protect, sessionRoutes);

app.listen(port, async() => {
    console.log(`Server is running on http://localhost:${port}`);
})