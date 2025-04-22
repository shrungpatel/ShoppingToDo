const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // This allows requests from localhost:3000 only
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Specify allowed headers
}));
app.use(express.json());

// MongoDB connection
/*mongoose.connect('mongodb+srv://shrungkpatel:MqZAtTs02En9IzRw@stage2.selrg.mongodb.net/?retryWrites=true&w=majority&appName=Stage2', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));*/

mongoose.connect('mongodb+srv://shrungkpatel:MqZAtTs02En9IzRw@stage2.selrg.mongodb.net/?retryWrites=true&w=majority&appName=Stage2', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
});

// Routes
app.use('/api/products', productRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
