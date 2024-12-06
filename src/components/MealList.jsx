import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Example data for meal categories and meal images
const categories = ['Steak Meals', 'Chicken Meals', 'Bwors Meals', 'Wings Meals', 'Extras', 'Cold Drinks', 'On Promo'];
const mealsData = {
  'Steak Meals': [
    { id: 1, name: '2 Briskets with Pap & Salad', image: 'https://via.placeholder.com/150', description: '2 pieces of Flame grilled brisket (230g) served with 1 pap portion and 1 salad.', price: 'R105' },
    { id: 2, name: '1 Rib steak with Pap & Salad', image: 'https://via.placeholder.com/150', description: '1 piece of flame grilled Rib steak (250g) served with 1 pap portion and 1 salad.', price: 'R120' },
    { id: 3, name: 'Rib steak + 1/4 Chicken & Bwors with Pap and Salad.', image: 'https://via.placeholder.com/150', description: 'Flame grilled rib steak (250g) with a piece of 1/4 Chicken (250g) and bwors, served with pap, and 1 salad of your choice.', price: 'R130' },
    { id: 4, name: 'Rib steak + 1/4 Chicken + Bwors & 4 chicken wings with Pap and Salad.', image: 'https://via.placeholder.com/150', description: 'Steak with rice and beans.', price: 'R110' }
  ],
  'Chicken Meals': [
    { id: 1, name: '1/4 Chicken with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: '1/4 Chicken & Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: '1/4 Chicken & Brisket with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 4, name: '1/4 Chicken & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],
  
  'Bwors Meals': [
    { id: 1, name: 'Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: 'Bwors & Brisket with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: 'Bwors & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
   
  ],
  'Wings Meals': [
    { id: 1, name: '4 Wings with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: '4 Wings & Brisket with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: '4 Wings & Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 4, name: '4 Wings & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],
  'Extras': [
    { id: 1, name: '1/4 Chicken ', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: 'Bwors', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: 'Brisket', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 4, name: 'Rib Steak', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],

  'Cold Drinks': [
    { id: 1, name: 'Coke', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: 'Sprite', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: 'Fanta', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 4, name: 'Water', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],

  'On Promo': [
    { id: 1, name: '1/4 Chicken with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 2, name: '1/4 Chicken & Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
    { id: 3, name: '1/4 Chicken & Brisket with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 4, name: '1/4 Chicken & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],
};


const Meallist = () => {
  const [selectedCategory, setSelectedCategory] = useState('Steak Meals'); // Default category
  const navigate = useNavigate();

  // Function to handle category button click
  const handleCategoryClick = (category) => {
    setSelectedCategory(category); // Change category when button is clicked
  };

  // Function to navigate to meal details page
  const goToMealDetails = (mealId) => {
    navigate(`/mealdetails/${mealId}`); // Navigate to MealDetails page with the meal's ID
  };

  const handleBackToMenu = () => {
    navigate('/'); // Assuming '/' is the route for your home/landing page
 
  };

  

  return (
    <div>
      <h1 className='heading'>Please select a meal</h1>

      {/* Categories Buttons */}
      <div  className="meal-buttons">
        {categories.map((category) => (
          <button 
            key={category} 
            className={`meals ${selectedCategory === category ? 'selected-category' : ''}`} // Add 'selected-category' class when the category is selected
            onClick={() => handleCategoryClick(category)} 
           
          >
            {category}
          </button>
        ))}
      </div>

      {/* Display meals under the selected category */}
      <div className="meal-card-container">
        <div style={{  display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly' }}>
          {mealsData[selectedCategory].map((meal) => (
            <div 
              key={meal.id} 
              style={{
                margin: '15px',
                textAlign: 'center',
                cursor: 'pointer',
                width: '200px',
                boxShadow: '0 2px 10px ',
                borderRadius: '8px',
                borderColor:'#ff9700',
                padding: '10px',
                // backgroundColor: 'white'
              }}
              onClick={() => goToMealDetails(meal.id)} // Add onClick to navigate to meal details
            >
              <img 
                src={meal.image} 
                alt={meal.name} 
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '5px' }}
              />
              <h4>{meal.name}</h4>
              <p>{meal.description}</p>
              <p><strong>{meal.price}</strong></p>
              {/* <p>{meal.name}</p>
              <p>{meal.price}</p> */}
            </div>
          ))}
        </div>
      </div>

      <button className='back-btn' onClick={handleBackToMenu}>Back to Main</button>
    </div>
  );
};

export default Meallist;
