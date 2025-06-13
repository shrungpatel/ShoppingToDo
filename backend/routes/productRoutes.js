const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Add a new product
router.post('/add', async (req, res) => {
  const { productName, storeName, quantity } = req.body;

  try {
    const newProduct = new Product({productName, storeName, quantity});
    await newProduct.save();
    res.status(201).json(newProduct);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/getAll', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  }
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const products = await Product.find({
      $or: [
        { productName: { $regex: query, $options: 'i' } },
        { storeName: { $regex: query, $options: 'i' } }
      ]
    });
    res.status(200).json(products);
  } 
  catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  }
  catch (error) {
    res.status(500).json({ message: 'Failed to delete product', error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { productName, storeName, quantity } = req.body;
  console.log(productName + " " + storeName);
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id,
      { productName: productName, storeName: storeName, quantity: quantity },
      { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(updatedProduct);
  }
  catch (error) {
    console.error('An error updating product:', error);
    res.status(500).json({ message: 'Something went wrong while updating the product' });
  }
});

router.get('/reccomended', async (req, res) => {
  // reccomendation api endpoint
});

module.exports = router;