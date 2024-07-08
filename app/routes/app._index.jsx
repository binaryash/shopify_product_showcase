import React, { useEffect, useState } from 'react';
import ProductList from './app.ProductList';

function ProductData() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [numberOfProducts, setNumberOfProducts] = useState('');

  // Function to fetch data based on category and number of products
  const fetchData = async (category = '', limit = '') => {
    try {
      setLoading(true); // Set loading to true before fetching data
      setError(null); // Setting error to null before fetchuing Data

      let url = `http://localhost:5000/products`;
      const queryParams = [];

      if (category) {
        queryParams.push(`category=${category}`);
      }
      if (limit) {
        queryParams.push(`limit=${limit}`);
      }

      if (queryParams.length > 0) {
        url += `?${queryParams.join('&')}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial fetch without category (fetch all products)
    fetchData();
  }, []);

  const handleFetchData = (category) => {
    fetchData(category, numberOfProducts);
  };

  const handleNumberChange = (event) => {
    setNumberOfProducts(event.target.value);
  };

  const renderProductData = () => {
    if (loading) {
      return <div className="text-center my-4">Loading...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 my-4">Error: {error}</div>;
    }

    if (!data || data.length === 0) {
      return <div className="text-center my-4">No products found.</div>;
    }

    return (
      <div>
        <h1 className="text-2xl font-bold mb-4">Product Data</h1>
        <ProductList products={data} />
      </div>
    );
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Product Categories</h1>
      <div className="flex space-x-4 mb-4">
        {/* Button to fetch bestsellers */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none" onClick={() => handleFetchData('bestsellers')}>
          Bestsellers
        </button>
        {/* Button to fetch new arrivals */}
        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded focus:outline-none" onClick={() => handleFetchData('newarrivals')}>
          New Arrivals
        </button>
      </div>
      <div className="flex items-center mb-4">
        {/* Form to specify the number of products to fetch */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleFetchData('');
          }}
          className="flex space-x-4"
        >
          <input
            type="number"
            className="border border-gray-300 px-4 py-2 rounded"
            placeholder="Number of Products"
            value={numberOfProducts}
            onChange={handleNumberChange}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded focus:outline-none"
          >
            Search
          </button>
        </form>
      </div>
      <hr className="my-4" />
      {renderProductData()}
    </div>
  );
}

export default ProductData;
