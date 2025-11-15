/**
 * JSON-based Product Controller
 * Serves product data from JSON file (placeholder for database)
 */

import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const productsFilePath = path.join(__dirname, '../../data/products.json');

// Helper function to read products from JSON
const readProducts = () => {
  try {
    const data = fs.readFileSync(productsFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading products.json:', error);
    return { products: [] };
  }
};

// GET /api/products - Get all products
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products } = readProducts();
    
    res.json({
      success: true,
      data: { products }
    });
  } catch (error: any) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message
    });
  }
};

// GET /api/products/:id - Get single product by ID
export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { products } = readProducts();
    
    const product = products.find((p: any) => p.id === parseInt(id));
    
    if (!product) {
      res.status(404).json({
        success: false,
        message: 'Product not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: { product }
    });
  } catch (error: any) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message
    });
  }
};

