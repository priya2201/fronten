import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState([{ key: '', value: '' }]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9090/api/${id}`);
        setProduct(data);
        setTitle(data.title);
        setDetails(data.details.length ? data.details : [{ key: '', value: '' }]);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddDetail = () => {
    setDetails([...details, { key: '', value: '' }]);
  };

  const handleDetailChange = (index, event) => {
    const { name, value } = event.target;
    const updatedDetails = [...details];
    updatedDetails[index][name] = value;
    console.log(updatedDetails,'ud')
    setDetails(updatedDetails);
  };

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('details', JSON.stringify(details)); // Convert details array to JSON string
    console.log(formData,'details now in string')
    if (image) {
      formData.append('image', image);
    }

    try {
      await axios.put(`http://localhost:9090/api/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      {product && (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Details:</label>
            {details.map((detail, index) => (
              <div key={index}>
                <input
                  type="text"
                  name="key"
                  placeholder="Key"
                  value={detail.key}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                />
                <input
                  type="text"
                  name="value"
                  placeholder="Value"
                  value={detail.value}
                  onChange={(e) => handleDetailChange(index, e)}
                  required
                />
              </div>
            ))}
            <button type="button" onClick={handleAddDetail}>
              Add Another Detail
            </button>
          </div>

          <div>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
            {product.image && (
              <div>
                <p>Current Image:</p>
                <img src={`/${product.image}`} alt={product.title} width="100" />
              </div>
            )}
          </div>

          <button type="submit">Update Product</button>
        </form>
      )}
    </div>
  );
};

export default EditProduct;
