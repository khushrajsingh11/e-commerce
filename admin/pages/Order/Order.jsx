import React, { useState, useEffect } from 'react';
import './Order.css';

const OrdersDisplay = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Take backend URL from Vite env
  const API_URL = import.meta.env.VITE_BACKEND_URL ;

  useEffect(() => {
    fetchOrders();
  }, [API_URL]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/api/order/orders`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        setOrders(data.orders);
      } else {
        setError('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatPrice = (price) => {
    return `₹${(price).toFixed(2)}`;
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'food processing':
        return '#ff9800';
      case 'delivered':
        return '#4caf50';
      case 'cancelled':
        return '#f44336';
      case 'pending':
        return '#2196f3';
      default:
        return '#757575';
    }
  };

  if (loading) {
    return (
      <div className="orders-container">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-container">
        <div className="error">
          <h3>Error</h3>
          <p>{error}</p>
          <button onClick={fetchOrders} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <div className="orders-header">
        <h1>All Orders</h1>
        <p>Total Orders: {orders.length}</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <h3>No orders found</h3>
          <p>There are currently no orders to display.</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.slice(-8)}</h3>
                  <p className="order-date">{formatDate(order.date)}</p>
                </div>
                <div className="order-status">
                  <span 
                    className="status-badge"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="order-content">
                <div className="customer-info">
                  <h4>Customer Details</h4>
                  <div className="customer-details">
                    <p><strong>Name:</strong> {order.address.firstName} {order.address.lastName}</p>
                    <p><strong>Email:</strong> {order.address.email}</p>
                    <p><strong>Phone:</strong> {order.address.phone}</p>
                    <p><strong>Address:</strong> {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipcode}, {order.address.country}</p>
                  </div>
                </div>

                <div className="order-items">
                  <h4>Order Items</h4>
                  {order.items.map((item) => (
                    <div key={item._id} className="item-card">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="item-details">
                        <h5>{item.name}</h5>
                        <p className="item-description">{item.description}</p>
                        <div className="item-meta">
                          <span className="item-category">{item.category}</span>
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">{formatPrice(item.price)} each</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-summary">
                  <div className="payment-status">
                    <span className={`payment-badge ${order.payment ? 'paid' : 'unpaid'}`}>
                      {order.payment ? 'Paid' : 'Unpaid'}
                    </span>
                  </div>
                  <div className="total-amount">
                    <strong>Total: {formatPrice(order.amount)}</strong>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrdersDisplay;
