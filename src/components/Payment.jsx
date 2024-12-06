import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';  // Card icon
import { GiCash } from 'react-icons/gi';        // Hand with cash icon

const Payment = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    // Simulate successful payment and redirect to a confirmation page (or home page)
    alert('Payment successful!');
    navigate('/meal-list');
  };

  return (
    <div style={{ padding: '20px', alignItems:'center' ,textAlign:'center' }}>
      <h1  style={{ alignItems:'center' ,textAlign:'center' }}>How would you like to pay?</h1>
      
      {/* Card Payment Button with Icon */}
      <button 
        onClick={handlePaymentSuccess} 
        style={{
          padding: '10px', 
          backgroundColor: 'white', 
          color: '#ff9700', 
          borderRadius: '5px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '15px',
          width: '250px',
          cursor: 'pointer'
        }}
      >
        <FaCreditCard style={{ marginRight: '10px' }} />
        Card Payment
      </button>

      {/* Cash Payment Button with Icon */}
      <button 
        onClick={handlePaymentSuccess} 
        style={{
          padding: '10px', 
          backgroundColor: 'white', 
          color: '#ff9700', 
          borderRadius: '5px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          marginBottom: '15px',
          width: '250px',
          cursor: 'pointer'
        }}
      >
        <GiCash style={{ marginRight: '10px' }} />
        Cash Payment
      </button>
    </div>
  );
};

export default Payment;
