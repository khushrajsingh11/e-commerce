import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../context/StoreContext';

function FoodItem({ id, name, price, description, image }) {
  const { addToCart, removeItem, cartItems  } = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
      <img className='food-item-image'  src={`${image}`}  alt={name} />

        {
          cartItems?.[id] ? ( 
            <div className='food-item-counter'> 
              <img onClick={() => removeItem(id)} src={assets.remove_icon_red} alt="Remove item" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add item" />
            </div>
          ) : (
            <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add to cart" />
          )
        }
      </div>
      <div className='food-item-name-rating'>
        <p>{name}</p>
        {assets.rating_starts && <img src={assets.rating_starts} alt="Rating stars" />}
      </div>
      <p className='food-item-desc'>{description || "No description available"}</p>
      <p className='food-item-price'>₹{price}</p>
    </div>
  );
}

export default FoodItem;
