import React, { useState } from 'react';
import axios from 'axios';
import { assets } from '../../src/assets/assets';
import { toast } from 'react-toastify';
import './Add.css';

const initialState = {
  name: "",
  description: "",
  price: "",
  category: "Salad",
};

// Get Cloudinary + Backend details from Vite environment variables
const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;
const API_URL = import.meta.env.VITE_BACKEND_URL;  // ✅ backend URL

function Add() {
  const [image, setImage] = useState(null);
  const [data, setData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!image) {
      toast.error("Please select an image to upload.");
      setIsLoading(false);
      return;
    }

    try {
      // 1. Upload the image to Cloudinary
      const imageFormData = new FormData();
      imageFormData.append('file', image);
      imageFormData.append('upload_preset', UPLOAD_PRESET);

      toast.info("Uploading image...");
      const cloudinaryResponse = await axios.post(CLOUDINARY_UPLOAD_URL, imageFormData);
      const imageUrl = cloudinaryResponse.data.secure_url;

      // 2. Send the form data with the Cloudinary image URL to your backend
      const foodData = {
        ...data,
        price: Number(data.price),
        image: imageUrl,
      };

      toast.info("Adding food item...");
      const backendResponse = await axios.post(`${API_URL}/api/food/add`, foodData);

      if (backendResponse.data.success) {
        setData(initialState);
        setImage(null);
        toast.success(backendResponse.data.message || 'Food added successfully!');
      } else {
        toast.error(backendResponse.data.message || 'Failed to add food.');
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='add'>
      <form onSubmit={onSubmitHandler}>
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload Preview" />
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            id='image'
            hidden
            required
          />
        </div>
        
        <div className="add-product-name">
          <p>Product name</p>
          <input
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            name='name'
            placeholder='Type here'
            required
          />
        </div>
        
        <div className="add-product-description">
          <p>Product description</p>
          <textarea
            onChange={onChangeHandler}
            value={data.description}
            name="description"
            rows='6'
            placeholder='Write content here'
            required
          ></textarea>
        </div>
        
        <div className="add-category-price">
          <div className="add-category">
            <p>Product category</p>
            <select value={data.category} onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Rolls">Rolls</option>
              <option value="Deserts">Deserts</option>
              <option value="Sandwich">Sandwich</option>
              <option value="Cake">Cake</option>
              <option value="Pure Veg">Pure Veg</option>
              <option value="Pasta">Pasta</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>
          
          <div className="add-price">
            <p>Product price</p>
            <input
              onChange={onChangeHandler}
              value={data.price}
              type="number"
              name='price'
              placeholder='₹150'
              required
            />
          </div>
        </div>
        
        <button type='submit' className='add-btn' disabled={isLoading}>
          {isLoading ? 'Adding...' : 'ADD'}
        </button>
      </form>
    </div>
  );
}

export default Add;
