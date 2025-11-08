import React, { useContext, useEffect } from 'react';
import './VerifyOrder.css';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { StoreContext } from '../../components/context/StoreContext';
import axios from 'axios';

function VerifyOrder() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  useEffect(() => {
    if (success && orderId) {
      const verifyPayment = async () => {
        try {
          const response = await axios.post(url + "/api/order/verify", { success, orderId });
          if (response.data.success) {
            navigate('/myorders'); 
          } else {
            navigate('/'); 
          }
        } catch (error) {
          console.error("Error verifying payment:", error);
          navigate('/');
        }
      };

      verifyPayment();
    } else {
      navigate('/'); 
    }
  }, [success, orderId]);

  return (
    <div className='verify'>
      <div className="verify-content">
        <div className="spinner"></div>
        <p className="verify-text">Verifying your payment...</p>
        <p className="verify-subtext">Please wait while we process your order</p>
      </div>
    </div>
  );
}

export default VerifyOrder;
