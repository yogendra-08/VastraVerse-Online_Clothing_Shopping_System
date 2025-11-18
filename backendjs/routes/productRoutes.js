/**
 * Product Routes
 * Routes for fetching products from MongoDB collections
 */

const express = require('express');
const router = express.Router();
const {
  getMenProducts,
  getWomenProducts,
  getProductById,
  searchProducts,
} = require('../controllers/productController');

// Public routes
router.get('/men', getMenProducts);
router.get('/women', getWomenProducts);
router.get('/:collection/search', searchProducts);
router.get('/:collection/:id', getProductById);

module.exports = router;

