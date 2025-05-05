const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 5000;

require('dotenv').config();

app.use(cors({
  origin: 'http://localhost:3000',  // allows requests from port 3000 only
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());


const mongoURI = process.env.MONGO_URI;
//console.log("The URI is " + mongoURI);
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
