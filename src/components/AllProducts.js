import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('http://localhost:9090/api');
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>All Products</h1>
      {products.map(product => (
        <div key={product._id}>
          <h2>{product.title}</h2>
          {product.image && (
            <img src={`/${product.image}`} alt={product.title} width="100" />
          )}
          <p>Details:</p>
          <ul>
            {product.details.map((detail, index) => (
              <li key={index}>
                {detail.key}: {detail.value}
              </li>
            ))}
          </ul>
          <Link to={`/edit-product/${product._id}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default AllProducts;
