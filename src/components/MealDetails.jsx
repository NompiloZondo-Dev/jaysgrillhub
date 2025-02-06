
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mealsData } from './MealList'; // Import the meals data
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MealDetails = () => {
  const { mealId } = useParams(); // Get the mealId from the URL params
  const [meal, setMeal] = useState(null);
  const [selectedSalad, setSelectedSalad] = useState('');
  const [extras, setExtras] = useState({ '1/4 Chicken': false, Bwors: false, Brisket: false, 'Rib Steak': false });
  const [drinks, setDrinks] = useState({ Coke: false, Sprite: false, Fanta: false, Water: false });
  const [mealQuantity, setMealQuantity] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const mealData = Object.values(mealsData)
      .flat()
      .find((meal) => meal.id === parseInt(mealId));

    if (mealData) {
      setMeal(mealData);
    } else {
      navigate('/'); // Redirect to home if no meal found (in case of invalid ID)
    }
  }, [mealId, navigate]);

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleSaladChange = (event) => {
    setSelectedSalad(event.target.value);
  };

  const handleExtrasChange = (item) => {
    setExtras((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleDrinksChange = (item) => {
    setDrinks((prevState) => ({
      ...prevState,
      [item]: !prevState[item],
    }));
  };

  const handleMealQuantityChange = (value) => {
    if (value >= 1) {
      setMealQuantity(value);
    }
  };

  const handleAddToCart = () => {
    if (!selectedSalad) {
      alert("Please select a salad.");
      return;
    }

    const selectedItems = {
      meal: meal.name,
      salad: selectedSalad,
      extras: extras,
      drinks: drinks,
      mealQuantity: mealQuantity,
      total: calculateTotal(),
    };

    // Retrieve cart from localStorage (ensure it is always an array)
    const cart = JSON.parse(localStorage.getItem('cart'));
    
    // If cart is not an array, initialize it as an empty array
    if (!Array.isArray(cart)) {
      localStorage.setItem('cart', JSON.stringify([])); // Initialize an empty array
    }
  
    // Retrieve the updated cart after ensuring it's an array
    const updatedCart = JSON.parse(localStorage.getItem('cart'));
  
    // Add the new item to the cart
    updatedCart.push(selectedItems);
  
    // Save updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  
    // Navigate to checkout
    navigate('/checkout');
  };

  const calculateTotal = () => {
    const extraPrices = { '1/4 Chicken': 105, Bwors: 115, Brisket: 105, 'Rib Steak': 115 };
    const drinkPrices = { Coke: 15, Sprite: 15, Fanta: 15, Water: 10 };

    let total = parseFloat(meal.price.replace('R', '').trim()) * mealQuantity;

    for (let item in extras) {
      total += extraPrices[item] * extras[item];
    }

    for (let item in drinks) {
      total += drinkPrices[item] * drinks[item];
    }

    return `R${total.toFixed(2)}`;
  };

  const handleCancelSelection = () => {
    setSelectedSalad('');
    setExtras({ '1/4 Chicken': false, Bwors: false, Brisket: false, 'Rib Steak': false });
    setDrinks({ Coke: false, Sprite: false, Fanta: false, Water: false });
    navigate('/');
  };

  if (!meal) {
    return <p>Loading...</p>;
  }

  return (
    <div className="meal-details">
      <div className="error-icon" onClick={handleBack}>
        <FontAwesomeIcon icon={faTimesCircle} />
      </div>

      <h1 className='heads'>Great Choice!</h1>
      <img src={meal.image} alt={meal.name} style={{ width: '800px', height: '500px', objectFit: 'cover', borderRadius: '10px' }} />
      <h1>{meal.name}</h1>
      <p style={{fontSize:'19px'}}>{meal.description}</p>

<div className='media'>
<div>
  <div className='title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <h4>Price</h4>
    <span className='price'>{meal.price}</span>
  </div>

  <div className='title' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap' }}>
    <h4>Quantity</h4>
    <div className='quantity' style={{ display: 'flex', gap: '10px' }}>
      <button onClick={() => handleMealQuantityChange(mealQuantity - 1)}>-</button>
      <span>{mealQuantity}</span>
      <button onClick={() => handleMealQuantityChange(mealQuantity + 1)}>+</button>
    </div>
  </div>
</div>

{/* Salad Selection (Only One) */}
<div className='select'>
  <div>
    <h3 style={{ display: 'flex', gap: '10px' }}>Which Salad would you like?</h3>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' , fontSize:'20px' }}>
      {['Chakalaka', 'Salsa', 'Coleslaw', 'Spinach'].map((salad) => (
        <div key={salad} style={{ display: 'flex', alignItems: 'center', gap: '5px' ,fontWeight:'300'}}>
          <input
            type="radio"
            value={salad}
            checked={selectedSalad === salad}
            onChange={handleSaladChange}
            required
          />
          <span>{salad}</span>
        </div>
      ))}
    </div>
  </div>
<br></br>
  <div>
    <h3 style={{ display: 'flex', gap: '10px' }}>Would you like extra?</h3>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' , fontSize:'20px' }}>
      {['1/4 Chicken', 'Bwors', 'Brisket', 'Rib Steak'].map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px' ,fontWeight:'300' }}>
          <input
            type="checkbox"
            checked={extras[item]}
            onChange={() => handleExtrasChange(item)}
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
<br></br>
  <div>
    <h3 style={{ display: 'flex', gap: '10px' }}>Would you like a cold drink?</h3>
    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' , fontSize:'20px'}}>
      {['Coke', 'Sprite', 'Fanta', 'Water'].map((item) => (
        <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '5px' ,fontWeight:'300' }}>
          <input
            type="checkbox"
            checked={drinks[item]}
            onChange={() => handleDrinksChange(item)}
          />
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
</div>

<br></br>

<div className='totaal'>
  <h4>Total: {calculateTotal()}</h4>
</div>
<div className="meal-btn">

<button className="btn-add" onClick={handleAddToCart}>Add to Cart</button>
<button className="btn-cancel" onClick={handleCancelSelection}>Cancel</button>

</div>


    </div>
    </div>
  );
};

export default MealDetails;


