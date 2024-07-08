import React from 'react';
import ProductCard from './app.ProductCard';

// Displays the list of Products 
function ProductList({ products }) {
  return (
    <div className="flex flex-wrap justify-center mt-4">
      {products.map((product) => (
        <div key={product.id} className="m-4">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}

export default ProductList;

