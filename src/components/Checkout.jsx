
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo flame black.png';
import Axios from 'axios';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [orderType, setOrderType] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(Array.isArray(savedCart) ? savedCart : []);

    setOrderType(localStorage.getItem('orderType') || 'Not selected');
    setOrderNumber(`ORD-${Math.floor(Math.random() * 90000) + 10000}`);
    setOrderDate(new Date().toLocaleString());
  }, []);

  const handleGoBack = () => navigate('/meallist');

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
    navigate('/');
  };

  const handleBack = () => navigate(-1);

  const handleProceedToPayment = async () => {
    try {
      const orderDetails = cart.map(item => ({
        meal: item.meal,
        mealQuantity: item.mealQuantity,
        total: item.total,
        salad: item.salad,
        extras: item.extras,
        drinks: item.drinks
      }));

      console.log('Sending SMS with order details:', orderDetails);

      const response = await Axios.post(
        'https://back-end-gbvh.onrender.com/send-sms',
        { orderNumber, orderDetails },
        { withCredentials: true }  // Important for CORS issues
      );

      if (response.status === 200) {
        console.log('SMS sent successfully');
        handleClearCart();
        navigate('/payment');
      } else {
        alert('Failed to send order confirmation. Please try again.');
      }
    } catch (error) {
      console.error('Error sending SMS:', error);
      alert('There was a problem sending the order. Please check your connection and try again.');
    }
  };

  const removeMeal = (index) => {
    const updatedCart = cart.filter((_, idx) => idx !== index);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return <div>No items in the cart.</div>;
  }

  return (
    <div className="checkout">
      <div className="error-icon" onClick={handleBack}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>
      <h1>Please Check Your Order</h1>
      <div className="order-summary">
        <img src={logo} className="App-logo" alt="logo" />
        <h3>Jays Grill Hub</h3>
        <p><strong>5 Lancaster RD, Westdene</strong></p>
        <p><strong>073 256 8912</strong></p>
        <br />
        <p><strong>Order Date and Time: </strong>{orderDate}</p> 
        <p><strong>Order Number: </strong>{orderNumber}</p>
        <p><strong>Order Type: </strong>{orderType}</p>

        {cart.map((item, index) => (
          <div key={index} className="order-item">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h4 style={{ marginRight: '10px', flex: 1 }}>{item.meal}</h4>
              <FontAwesomeIcon 
                icon={faTimesCircle} 
                style={{ cursor: 'pointer', color: 'red', fontSize: '20px' }} 
                onClick={() => removeMeal(index)} 
              />
            </div>
            {item.salad && <p>Salad: {item.salad}</p>}
            {item.extras && (
              <>
                <p>Extras:</p>
                <ul>
                  {Object.entries(item.extras).map(([extra, quantity]) =>
                    quantity > 0 ? <li key={extra}>{extra}: {quantity}</li> : null
                  )}
                </ul>
              </>
            )}
            {item.drinks && (
              <>
                <p>Drinks:</p>
                <ul>
                  {Object.entries(item.drinks).map(([drink, quantity]) =>
                    quantity > 0 ? <li key={drink}>{drink}: {quantity}</li> : null
                  )}
                </ul>
              </>
            )}
            <p>Quantity: {item.mealQuantity}</p>
            <p>Total: {item.total}</p>
            <hr />
          </div>
        ))}
        <div className="total">
          <h4>
            Total Amount: R{cart.reduce((acc, item) => acc + (parseFloat(item.total.replace('R', '')) || 0), 0).toFixed(2)}
          </h4>
        </div>
      </div>
      <br />
      <br />
      <div className="buttons-container">
        <button className="more-btn" onClick={handleGoBack}>Add More</button>
        <button className="rm-btn" onClick={handleClearCart}>Cancel Order</button>
      </div>
      <button className="checkout-btn" onClick={handleProceedToPayment}>Pay</button>
    </div>
  );
};

export default Checkout;
