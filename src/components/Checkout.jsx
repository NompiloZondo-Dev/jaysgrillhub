import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBasket } from '../BasketContext'; // Import the basket context
import logo from './logo_flame _white.png';

const Checkout = () => {
  const { basket, getTotalPrice, generateOrderNumber } = useBasket();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);

  // Generate order number only once on the first render (initialize it with a stable value)
  useEffect(() => {
    // Generate order number once and store it
    const orderNumber = generateOrderNumber();
    setOrderDetails({
      orderNumber,
      items: basket,
      total: getTotalPrice(),
    });
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleCancel = () => {
    // Navigate back to the meal list or landing page
    navigate('/LandingPage');
  };

  const handleAddToOrder = () => {
    // Navigate back to the meal list to add more items
    navigate('/Meallist');
  };

  const handlePay = () => {
    // Navigate to the payment page (you can implement this as needed)
    navigate('/payment');
  };

  // Render a loading state until orderDetails is available
  if (!orderDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: 'auto' }}>
      <h1>Order Summary</h1>

      {/* Order slip */}
      <div style={{ border: '1px solid #ccc', padding: '20px', marginBottom: '20px', borderRadius: '10px', backgroundColor: '#ff9700' }}>
      <img src={logo} className="App-logo" alt="logo" style={{ width: '100px', marginBottom: '20px' }}/>
        <h2>Jays grill hub</h2>
        <p>5 LANCASTER RD, WESTDENE</p>
        <h3>073 256 8912</h3>
        <p>Order Number: #{orderDetails.orderNumber}</p>

        <h3>Items Ordered:</h3>
        <ul>
          {orderDetails.items.map((meal, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{meal.name}</strong> - R{meal.price}
            </li>
          ))}
        </ul>

        <h3>Total: R{orderDetails.total}</h3>
      </div>

      {/* Action buttons */}
      <div>
        <button onClick={handleCancel} style={{ padding: '10px', backgroundColor: 'white', color: 'gray', borderColor: 'gray', borderRadius: '5px', marginRight: '10px' }}>
          Cancel Order
        </button>
        <button onClick={handleAddToOrder} style={{ padding: '10px', backgroundColor: '#ff9700', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
          Add to order
        </button>
        <button onClick={handlePay} style={{ padding: '10px', backgroundColor: 'white', color: '#ff9700', borderColor: '#ff9700', borderRadius: '5px' }}>
          Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
