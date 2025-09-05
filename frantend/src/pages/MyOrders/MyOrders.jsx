import { useEffect, useState, useContext } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

function MyOrders() {
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const response = await axios.post(
                url + "/api/order/userOrder", 
                {}, 
                { headers: { token } }
            );
            setData(response.data.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    if (loading) {
        return (
            <div className='my-orders'>
                <div className="loading">Loading orders...</div>
            </div>
        );
    }

    return (
        <div className='my-orders'>
            <h2>My Orders</h2>
            <div className="container">
                {data.length === 0 ? (
                    <div className="empty-state">
                        <p>No orders found</p>
                    </div>
                ) : (
                    data.map((order, index) => (
                        <div key={index} className="my-orders-order">
                            <img src={assets.parcel_icon} alt="Order icon" />
                            
                            <div className="order-items">
                                <p>{order.items.map((item, index) => {
                                    if (index === order.items.length - 1) {
                                        return item.name + " x " + item.quantity;
                                    } else {
                                        return item.name + " x " + item.quantity + ", ";
                                    }
                                }).join('')}</p>
                            </div>
                            
                            <div className="order-amount">
                                <p>₹{order.amount}.00</p>
                            </div>
                            
                            <div className="order-count">
                                <p>Items: {order.items.length}</p>
                            </div>
                            
                            <div className="order-status">
                                <p><span className={`status-${order.status.toLowerCase()}`}>
                                    {order.status}
                                </span></p>
                            </div>
                            
                            <button className="track-btn">Track order</button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default MyOrders;
