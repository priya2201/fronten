import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [details, setDetails] = useState([{ key: '', value: '' }]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:9090/api/products/${id}`);
          setProduct(response.data);
          console.log(response.data,'rp')
        setDetails(response.data.details || []);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newDetails = [...details];
    newDetails[index][name] = value;
    setDetails(newDetails);
  };

  const handleAddDetail = () => {
    setDetails([...details, { key: '', value: '' }]);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    console.log('Details Array:', details);

    details.forEach((detail, index) => {
      formData.append(`details[${index}][key]`, detail.key);
      formData.append(`details[${index}][value]`, detail.value);
    });
  
    if (image) {
      formData.append('image', image);
    }
    for (let pair of formData.entries()) {
      console.log(pair[0], pair[1]);
    }
  
    try {
      const response = await axios.post(`http://localhost:9090/api/add/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Product updated successfully', response.data);
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };
  
  return (
    <div>
      <h1>Edit Product</h1>
      {product && (
        <form onSubmit={handleSubmit}>
          <label>Product Title</label>
          <p>{product.title}</p>

          <label>Desccription</label>
          <p>${product.description}</p>

          {details.map((detail, index) => (
            <div key={index}>
              <label>Key</label>
              <input
                type="text"
                name="key"
                value={detail.key}
                onChange={(event) => handleInputChange(index, event)}
              />
              <label>Value</label>
              <input
                type="text"
                name="value"
                value={detail.value}
                onChange={(event) => handleInputChange(index, event)}
              />
            </div>
          ))}

          <button type="button" onClick={handleAddDetail}>
            Add More Details
          </button>

          <label>Upload Image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />

          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
