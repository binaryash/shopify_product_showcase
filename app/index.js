require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = process.env.PORT || 3000;

app.get('/get-store-details', async (req, res) => {
  try {
    const response = await fetch(`https://${process.env.SHOPIFY_API_KEY}:${process.env.SHOPIFY_API_PASSWORD}@${process.env.SHOPIFY_STORE_NAME}.myshopify.com/admin/api/2023-04/shop.json`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    const storeDetails = data.shop;

    console.log('Store Name:', storeDetails.name);
    console.log('Store Email:', storeDetails.email);
    console.log('Store Currency:', storeDetails.currency);

    res.json(storeDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});