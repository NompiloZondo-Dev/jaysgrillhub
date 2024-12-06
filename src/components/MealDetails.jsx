import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBasket } from '../BasketContext'; 

const MealDetails = () => {
  const { id } = useParams(); // Get the meal ID from the URL params
  const [meal, setMeal] = useState(null);
  const navigate = useNavigate();
  const { addToBasket } = useBasket(); // Access the addToBasket function

  // State for quantity, selected salad, extras, and cold drinks
  const [quantity, setQuantity] = useState(1);
  const [selectedSalad, setSelectedSalad] = useState('');
  const [selectedExtra, setSelectedExtra] = useState('');
  const [selectedDrink, setSelectedDrink] = useState('');
  
  // Quantity states for extras and drinks
  const [extraQuantities, setExtraQuantities] = useState({});
  const [drinkQuantities, setDrinkQuantities] = useState({});

  // State to control whether to show the checkout section
  const [checkoutVisible, setCheckoutVisible] = useState(false);

  // Handle quantity change for meal
  const handleQuantityChange = (operation) => {
    if (operation === 'increase') {
      setQuantity(prevQuantity => prevQuantity + 1);
    } else if (operation === 'decrease' && quantity > 1) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  // Handle selection for salad, extra, and drink
  const handleSaladSelect = (salad) => {
    setSelectedSalad(salad);
  };

  const handleExtraSelect = (extra) => {
    setSelectedExtra(extra);  // Set the selected extra
  };

  const handleDrinkSelect = (drink) => {
    setSelectedDrink(drink);  // Set the selected drink
  };

  // Handle quantity change for extras and drinks
  const handleExtraQuantityChange = (extra, operation) => {
    setExtraQuantities((prev) => {
      const newQuantities = { ...prev };
      if (operation === 'increase') {
        newQuantities[extra] = (newQuantities[extra] || 0) + 1;
      } else if (operation === 'decrease' && newQuantities[extra] > 0) {
        newQuantities[extra] = newQuantities[extra] - 1;
      }
      return newQuantities;
    });
  };

  const handleDrinkQuantityChange = (drink, operation) => {
    setDrinkQuantities((prev) => {
      const newQuantities = { ...prev };
      if (operation === 'increase') {
        newQuantities[drink] = (newQuantities[drink] || 0) + 1;
      } else if (operation === 'decrease' && newQuantities[drink] > 0) {
        newQuantities[drink] = newQuantities[drink] - 1;
      }
      return newQuantities;
    });
  };

  // Options with prices
  const saladOptions = ['Coleslaw', 'Spinach', 'Caesar Salad', 'Greek Salad'];
  const extraOptions = [
    { name: 'Fries', price: 30 },
    { name: 'Rice', price: 25 },
    { name: 'Salad', price: 35 },
    { name: 'Garlic Bread', price: 40 }
  ];
  const drinkOptions = [
    { name: 'Coke', price: 20 },
    { name: 'Fanta', price: 18 },
    { name: 'Sprite', price: 18 },
    { name: 'Water', price: 10 }
  ];

  // Calculate the total price based on quantity and selected items
  const mealPrice = typeof meal?.price === 'string' ? parseFloat(meal?.price.replace('R', '').trim()) : meal?.price;
  const extraPrice = extraOptions.reduce((acc, extra) => {
    return acc + (extraQuantities[extra.name] || 0) * extra.price;
  }, 0);
  const drinkPrice = drinkOptions.reduce((acc, drink) => {
    return acc + (drinkQuantities[drink.name] || 0) * drink.price;
  }, 0);

  const totalPrice = ((mealPrice * quantity) + extraPrice + drinkPrice).toFixed(2);

  // Handle checkout display toggle
  const handleCheckout = () => {
    setCheckoutVisible(true);
  };

  const handleCancelCheckout = () => {
    setCheckoutVisible(false);
  };

  const handleOrderConfirm = () => {
    // Here you can handle the order confirmation logic (e.g., send to backend)
    alert('Order confirmed!');
  };

  const handleAddToOrder = () => {
    // Navigate back to the meal list to add more items
    navigate('/Meallist');
  };

  

  const mealsData = {
    1: { name: '2 Briskets with Pap & Salad', description: 'A delicious veggie burger with plant-based patty.', image: 'https://via.placeholder.com/150', price: 12 },
    2: { name: 'Veggie Burger', description: 'A delicious veggie burger with plant-based patty.', image: 'https://via.placeholder.com/150', price: 12 },
    3: { name: 'Chicken Parmesan', description: 'Classic chicken parmesan with marinara sauce.', image: 'https://via.placeholder.com/150', price: 15 },
    4: { name: 'Grilled Chicken', description: 'Tender grilled chicken with seasoning.', image: 'https://via.placeholder.com/150', price: 18 },
    5: { name: '1/4 Chicken with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105'},
    6: { name: 'Vegan Smoothie', description: 'A refreshing smoothie made with fruits and plant-based milk.', image: 'https://via.placeholder.com/150', price: 8 },
    7: { name: 'Chocolate Cake', description: 'A rich and moist chocolate cake.', image: 'https://via.placeholder.com/150', price: 6 },
    8: { name: 'Apple Pie', description: 'A classic apple pie with a flaky crust.', image: 'https://via.placeholder.com/150', price: 5 },
  };

  useEffect(() => {
    const mealDetails = mealsData[id];
    setMeal(mealDetails);
  }, [id]);

  const handleAddToBasket = () => {
    if (meal) {
      addToBasket(meal); // Add the selected meal to the basket
      alert(`added to basket!`);
    }
  };

  const handleGoToCheckout = () => {
    navigate('/checkout');
  };

  if (!meal) {
    return <div>Loading...</div>;
  }

  return (
    <div className='meal-detail'>
      <h1>Great Choice !</h1>
      <img src={meal.image} alt={meal.name}  />
      <h2>{meal.name}</h2>
      <p>{meal.description}</p>
      <p>{meal.price}</p>

      {/* Price and Quantity Section */}
      <div className="price-quantity">
        <div className="quantity-control">
          <span>Quantity:</span>
          <button onClick={() => handleQuantityChange('decrease')}>-</button>
          <span>{quantity}</span>
          <button onClick={() => handleQuantityChange('increase')}>+</button>
        </div>
      </div>

      {/* Display Total Price */}
      <div className="total-price">
        <h3>Total Price: R{totalPrice}</h3>
      </div>

      {/* Salad Selection */}
      {/* Salad Selection with checkbox */}
      <div className="salad-selection">
        <h4>Which salad would you like?</h4>
        {saladOptions.map((salad, index) => (
          <div key={index} className="salad-option">
            <input
              type="checkbox"
              checked={selectedSalad === salad}
              onChange={() => handleSaladSelect(salad)}
            />
            <label>{salad}</label>
          </div>
        ))}
      </div>

      {/* Extra Selection */}
      <div className="extra-selection">
        <h4>Would you like an extra?</h4>
        <div className="extra-options">
          {extraOptions.map((extra, index) => (
            <div key={index} className="extra-option">
              <div onClick={() => handleExtraSelect(extra.name)} className={`extra-name ${selectedExtra === extra.name ? 'selected' : ''}`}>
                {extra.name} - R{extra.price}
              </div>
              <div className="quantity-control">
                <button onClick={() => handleExtraQuantityChange(extra.name, 'decrease')}>-</button>
                <span>{extraQuantities[extra.name] || 0}</span>
                <button onClick={() => handleExtraQuantityChange(extra.name, 'increase')}>+</button>
              </div>
              <div className="extra-price">
                <span>Price: R{extra.price * (extraQuantities[extra.name] || 0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cold Drink Selection */}
      <div className="drink-selection">
        <h4>Would you like a cold drink?</h4>
        <div className="drink-options">
          {drinkOptions.map((drink, index) => (
            <div key={index} className="drink-option">
              <div onClick={() => handleDrinkSelect(drink.name)} className={`drink-name ${selectedDrink === drink.name ? 'selected' : ''}`}>
                {drink.name} - R{drink.price}
              </div>
              <div className="quantity-control">
                <button onClick={() => handleDrinkQuantityChange(drink.name, 'decrease')}>-</button>
                <span>{drinkQuantities[drink.name] || 0}</span>
                <button onClick={() => handleDrinkQuantityChange(drink.name, 'increase')}>+</button>
              </div>
              <div className="drink-price">
                <span>Price: R{drink.price * (drinkQuantities[drink.name] || 0)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button onClick={handleAddToOrder} style={{ padding: '10px', backgroundColor: '#ff9700', color: 'white', border: 'none', borderRadius: '5px', marginRight: '10px' }}>
          Add More Items
        </button>
      <button className='btn-basket'   onClick={handleAddToBasket} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '5px' }}>
        Add Order
      </button>
      <button className='btn-checkout' onClick={handleGoToCheckout} style={{ marginTop: '20px', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        Go to Checkout
      </button>
    </div>
  );
};

export default MealDetails;
