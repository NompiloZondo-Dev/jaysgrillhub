import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';  // Card icon
import { GiCash } from 'react-icons/gi';        // Hand with cash icon

const Payment = () => {
  const navigate = useNavigate();

  const handlePaymentSuccess = () => {
    // Simulate successful payment and redirect to a confirmation page (or home page)
    alert('Pay at the counter !');
    navigate('/');
  };

  return (
    <div style={{
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', 
      textAlign: 'center',
      position: 'relative' // Ensures absolute positioning works
    }}>
  
    {/* Move h1 to the top */}
    <h1 style={{ 
      position: 'absolute', 
      top: '20px', 
      left: '50%', 
      transform: 'translateX(-50%)' 
    }}>
      How would you like to pay?
    </h1>
  
    {/* Card Payment Button */}
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
        marginBottom: '20px',
        width: '250px',
        cursor: 'pointer',
        border: '1px solid #ff9700'
      }}
    >
      <FaCreditCard style={{ marginRight: '10px' }} />
      Card Payment
    </button>
  
    {/* Cash Payment Button */}
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
        width: '250px',
        cursor: 'pointer',
        border: '1px solid #ff9700'
      }}
    >
      <GiCash style={{ marginRight: '10px' }} />
      Cash Payment
    </button>
  
    {/* Responsive Styles */}
    <style>
      {`
        @media (max-width: 600px) {
          h1 {
            font-size: 1.5rem;
          }
          button {
            width: 200px;
            padding: 8px;
          }
        }
  
        @media (max-width: 400px) {
          h1 {
            font-size: 1.2rem;
          }
          button {
            width: 180px;
            padding: 6px;
          }
        }
      `}
    </style>
  </div>
  
    
  );
};

export default Payment;
