(function() {
    // Function to inject CSS
    function injectCSS() {
      const style = document.createElement('style');
      style.innerHTML = `
        .shopify-products-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        .shopify-product {
          border: 1px solid #ccc;
          padding: 16px;
          margin: 16px;
          width: 200px;
          text-align: center;
        }
        .shopify-product img {
          max-width: 100%;
          height: auto;
        }
      `;
      document.head.appendChild(style);
    }
  
    // Function to fetch products
    async function fetchProducts(category = '', limit = 50) {
      try {
        const response = await fetch(`http://localhost:5000/products?category=${category}&limit=${limit}`);
        const products = await response.json();
        return products;
      } catch (error) {
        console.error('Error fetching products:', error);
        return [];
      }
    }
  
    // Function to render products
    function renderProducts(products) {
      const container = document.createElement('div');
      container.className = 'shopify-products-container';
      
      products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'shopify-product';
        productDiv.innerHTML = `
          <h2>${product.title}</h2>
          <p>${product.handle}</p>
          ${product.featuredImage ? `<img src="${product.featuredImage.url}" alt="${product.title}" />` : ''}
          <a href="${product.onlineStoreUrl}" target="_blank">View on Store</a>
        `;
        container.appendChild(productDiv);
      });
  
      document.body.appendChild(container);
    }
  
    // Inject CSS and fetch/render products on script load
    injectCSS();
    fetchProducts().then(products => renderProducts(products));
  })();
  