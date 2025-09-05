import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

function List() {
  const [list, setList] = useState([]);

  // Instead of passing url as prop, define it here
  const API_URL = import.meta.env.VITE_BACKEND_URL ;

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error('Error: Failed to fetch data');
      }
    } catch (error) {
      toast.error('A network error occurred.');
    }
  };

  useEffect(() => {
    fetchData();
  }, [API_URL]); // run again if API_URL changes

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${API_URL}/api/food/remove`, { id: foodId });

      if (response.data.success) {
        setList(prevList => prevList.filter(item => item._id !== foodId));
        toast.success(response.data.message || "Food item removed.");
      } else {
        toast.error('Error: Failed to remove food item.');
      }
    } catch (error) {
      toast.error('A network error occurred while removing the item.');
    }
  };

  return (
    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b className="category-header">Category</b>
          <b className="price-header">Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p className="category-cell">{item.category}</p>
              <p className="price-cell">₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='remove-icon'>×</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
