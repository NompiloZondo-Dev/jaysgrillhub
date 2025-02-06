
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo_flame _white.png';
import '../App.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [orderType, setOrderType] = useState('');

  // Function to handle the user's choice (Eat In or Take Away)
  const handleOrderType = (type) => {
    setOrderType(type);
    // Save the order type in localStorage so it can be accessed later
    localStorage.setItem('orderType', type);
    // Navigate to the meal list page
    navigate('/meallist');
  };

  return (
    <div className='App'>
      <div className='App-header'>
      <img src={logo} className="App-logo" alt="logo" />
      <h3 className='Jays'>Jays Grill Hub</h3>
      <br></br>
      <br></br>
        <h1>START YOUR ORDER</h1>
        <br></br>
        <button className='button' onClick={() => handleOrderType('Eat In')}>Eat In</button>
        <button className='button' onClick={() => handleOrderType('Take Away')}>Take Away</button>
      </div>
    </div>
  );
}

export default LandingPage;
