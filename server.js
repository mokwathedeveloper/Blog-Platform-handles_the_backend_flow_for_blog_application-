require('dotenv').config(); // Load environment variables from .env file
const express = require('express'); // Import the Express.js framework
const mongoose = require('mongoose'); // Import Mongoose for MongoDB object modeling
const authRoutes = require('./src/routes/authRoutes'); // Import authentication routes
const blogPostRoutes = require('./src/routes/blogPostRoutes'); // Import blog post routes

const app = express(); // Create an Express application instance
app.use(express.json()); // Enable Express to parse JSON formatted request bodies

// Define routes for authentication and blog posts


// Set the port for the server to listen on. Use the PORT environment variable or default to 3000.
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using Mongoose
mongoose.connect('mongodb+srv://mokwastudies:mokwastudies1234@cluster0.eedppla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true, // Use the new URL parser
    useUnifiedTopology: true, // Use the new server discovery and monitoring engine
}).then(() => {
    console.log('Connected to MongoDB'); // Log successful MongoDB connection
    // Start the Express server after successful MongoDB connection
    app.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`); // Log server startup with the port
    });
}).catch(err => {
    console.error('Connection error', err); // Log any MongoDB connection errors
});
