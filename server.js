require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const blogPostRoutes = require('./src/routes/blogPostRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/blogposts', blogPostRoutes);


const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://mokwastudies:mokwastudies1234@cluster0.eedppla.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Connection error', err);
});
