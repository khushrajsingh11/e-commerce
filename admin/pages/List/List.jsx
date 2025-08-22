import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './List.css';

function List({ url }) {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
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
  }, []);

  const removeFood = async (foodId) => {
    try {
      const response = await axios.post(`${url}/api/food/remove`, { id: foodId });

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
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item) => {
          return (
            <div key={item._id} className="list-table-format">
              <img src={item.image} alt={item.name} />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <p onClick={() => removeFood(item._id)} className='remove-icon'>×</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;