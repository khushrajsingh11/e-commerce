import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Card() {
  const navigation = useNavigate();
  const { food_list, removeItem, cartItems , getTotalCartAmount } = useContext(StoreContext);

  if (!food_list || !cartItems) return null;

 
  const subtotal = food_list.reduce((acc, item) => {
    return acc + (cartItems?.[item._id] || 0) * item.price;
  }, 0);

  const deliveryFee = subtotal > 0 ? 5 : 0; 
  const total = subtotal + deliveryFee;

  console.log(cartItems); 

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <hr />
        
        {food_list.map((item) => {
          if (cartItems?.[item._id] > 0) {
            return (
              <div key={item._id} className="cart-items-item">
                <img src={item.image} alt={item.name} />
                <p>{item.name}</p>
                <p>₹{item.price.toFixed(2)}</p>
                <p>{cartItems[item._id]}</p>
                <p>₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                <p onClick={() => removeItem(item._id)} className='cross'>X</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>
          <button onClick={()=>navigation('/order')}>PROCEED TO CHECKOUT</button>
        </div>
      

      <div className="cart-promocode">
        <div>
          <p>If you have a promo code, enter it here</p>
          <div className='cart-promocode-input'>
            <input type="text" placeholder='Promo code' />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Card;
