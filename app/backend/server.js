import express from 'express';
import cors from 'cors';
import { fetchData } from './fetchProductData.js';
import path from 'path';

const app = express();
const PORT = 5000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  optionsSuccessStatus: 200
}));

// Serve the embed script
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));

// Endpoint to fetch products
app.get('/products', async (req, res) => {
  try {
    const category = req.query.category || ''; // Ensure query parameter handling
    const limit = req.query.limit || 50; // Default limit or based on query
    const products = await fetchData(category, limit); // Ensure fetchData function works correctly
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error.message);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
