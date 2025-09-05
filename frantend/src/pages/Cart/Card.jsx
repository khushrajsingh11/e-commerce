import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../components/context/StoreContext';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const navigation = useNavigate();
  const { food_list, removeItem, cartItems, getTotalCartAmount } = useContext(StoreContext);

  if (!food_list || !cartItems) return null;

  const subtotal = getTotalCartAmount();
  const deliveryFee = subtotal > 0 ? 2 : 0;
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
                <p onClick={() => removeItem(item._id)} className='cross'>×</p>
              </div>
            );
          }
          return null;
        })}
      </div>

      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>₹{subtotal.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>₹{deliveryFee.toFixed(2)}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>₹{total.toFixed(2)}</b>
          </div>
          <button 
            onClick={() => navigation('/order')}
            disabled={subtotal === 0}
          >
            PROCEED TO CHECKOUT
          </button>
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

export default Cart;
