import React from 'react';

//Function to display individual Cards of items
function ProductCard({ product }) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs mx-auto">
      {product.featuredImage && (
        <img
          src={product.featuredImage.url}
          alt={product.title}
          className="w-full h-40 object-cover"
          style={{ width: '100%', height: '160px' }}
        />
      )}
      <div className="p-2">
        <h2 className="text-lg font-semibold text-gray-800">{product.title}</h2>
        <p className="text-gray-600 mb-1">{product.handle}</p>
        <p className="text-gray-600 mb-1">{product.status}</p>
        <div className="flex flex-wrap mt-2">
          {product.tags.map((tag, index) => (
            <span key={index} className="bg-green-200 text-green-800 rounded-full px-2 py-1 text-sm font-semibold m-1">
              {tag}
            </span>
          ))}
        </div>
        {product.onlineStoreUrl && (
          <a href={product.onlineStoreUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 block mt-2 hover:underline">
            View on Store
          </a>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
