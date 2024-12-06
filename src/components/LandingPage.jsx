import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo_flame _white.png';
import '../App.css'


const LandingPage = () => {
  // Use useNavigate hook to navigate to another route
  const navigate = useNavigate();

  // Function to navigate to Meallist
  const goToMealList = () => {
    navigate('/meallist');
  };

  return (
    <div className='App'>
        <div className='App-header'>
           <h1>START YOUR ORDER</h1>
      <img src={logo} className="App-logo" alt="logo" />
      <button className='button'  onClick={goToMealList}>Eat In</button>
      <button className='button'  onClick={goToMealList}>Take Away</button>

        </div>
     
    </div>
  );
}

export default LandingPage;
