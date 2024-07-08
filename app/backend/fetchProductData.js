import dotenv from 'dotenv'; 
import path from 'path'; 
import axios from 'axios'; 
import { fileURLToPath } from 'url'; // Import to get the current file URL
import { dirname } from 'path'; // Import to get the directory name


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const SHOP_NAME = process.env.SHOP_NAME; 
const ADMIN_API_ACCESS_TOKEN = process.env.ADMIN_API_ACCESS_TOKEN;

/*
 * Fetches product data from Shopify based on the category and limit.
 * 
 * @param {string} category - The category of products to fetch.
 * @param {number} limit - The number of products to fetch.
 * @param {string} sortKey - The key to sort products by.
 * @param {boolean} reverse - Whether to reverse the sort order.
 * @returns {Array} - An array of product objects.
 */
export const fetchData = async (category, limit = 50, sortKey = 'TITLE', reverse = false) => {
  let graphqlQuery;

  switch (category) {
    case 'bestsellers':
      graphqlQuery = {
        query: `
          {
            products(first: ${limit}, sortKey: BEST_SELLING_PRODUCTS) {
              edges {
                node {
                  id
                  title
                  handle
                  tags
                  status
                  onlineStoreUrl
                  featuredImage { url }
                }
              }
            }
          }
        `
      };
      break;
    case 'newarrivals':
      graphqlQuery = {
        query: `
          {
            products(first: ${limit}, sortKey: CREATED_AT, reverse: true) {
              edges {
                node {
                  id
                  title
                  handle
                  tags
                  status
                  onlineStoreUrl
                  featuredImage { url }
                }
              }
            }
          }
        `
      };
      break;
    default:
      graphqlQuery = {
        query: `
          {
            products(first: ${limit}, sortKey: ${sortKey.toUpperCase()}, reverse: ${reverse}) {
              edges {
                node {
                  id
                  title
                  handle
                  tags
                  status
                  onlineStoreUrl
                  featuredImage { url }
                }
              }
            }
          }
        `
      };
      break;
  }

  try {
    const endpoint = `https://${SHOP_NAME}.myshopify.com/admin/api/2024-07/graphql.json`;

    const response = await axios.post(endpoint, graphqlQuery, {
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': ADMIN_API_ACCESS_TOKEN
      }
    });

    if (response.data.errors) {
      throw new Error(response.data.errors[0].message);
    }

    const products = response.data.data.products.edges.map(edge => edge.node);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error.message);
    throw error;
  }
};
