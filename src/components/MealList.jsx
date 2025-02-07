
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import foto from '../images/2 briskets.jpg'
import foto2 from '../images/rib steak.jpg'
import foto3 from '../images/Rib steak-wors-14 chicken.jpg'
import foto12 from '../images/Wings .jpg'
import foto13 from '../images/4 wings + brisket.jpg'
import foto14 from '../images/4 wings + bwors.jpg'
import foto5 from '../images/14 Chicken.jpg'
import foto11 from '../images/bwors-rib steak.jpg'
import foto10 from '../images/bwors-brisket.jpg'
import foto6 from '../images/14 chicken-wors.jpg'
import foto8 from '../images/14 chicken-rib steak.jpg'
import foto7 from '../images/14 chicken-Brisket.jpg'
import foto4 from '../images/1 Rib Steak + 14 Chicken + Bwors + 6 Wings.jpg'

// Example data for meal categories and meal images
const categories = ['Steak Meals', 'Chicken Meals', 'Bwors Meals', 'Wings Meals'];
export const mealsData = {
  'Steak Meals': [
    { id: 1, name: '2 Briskets with Pap & Salad', image: foto, description: '2 pieces of Flame grilled brisket (230g) served with 1 pap portion and 1 salad.', price: 'R57.90' },
    { id: 2, name: '1 Rib steak with Pap & Salad', image: foto2, description: '1 piece of flame grilled Rib steak (250g) served with 1 pap portion and 1 salad.', price: 'R62.90' },
    { id: 3, name: 'Rib steak + 1/4 Chicken & Bwors with Pap and Salad.', image: foto3, description: 'Flame grilled rib steak (250g) with a piece of 1/4 Chicken (250g) and bwors, served with pap, and 1 salad of your choice.', price: 'R129.90' },
    { id: 4, name: 'Rib steak + 1/4 Chicken + Bwors & 4 chicken wings with Pap and Salad.', image: foto4, description: 'Flame grilled rib steak (250g) with a piece of 1/4 Chicken (250g) ,4 wings and bwors, served with pap, and 1 salad of your choice.', price: 'R189.90' }
  ],
  'Chicken Meals': [
    { id: 5, name: '1/4 Chicken with Pap and Salad', image: foto5, description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R52.90' },
    { id: 6, name: '1/4 Chicken & Bwors with Pap and Salad', image: foto6, description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R69.90' },
    { id: 7, name: '1/4 Chicken & Brisket with Pap and Salad', image: foto7, description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R62.90' },
    { id: 8, name: '1/4 Chicken & Rib Steak with Pap and Salad', image: foto8, description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R97.90' },
  ],
  
  'Bwors Meals': [
    // { id: 9, name: 'Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
    { id: 10, name: 'Bwors & Brisket with Pap and Salad', image: foto10, description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R59.90' },
    { id: 11, name: 'Bwors & Rib Steak with Pap and Salad', image: foto11, description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R87.90' },
   
  ],
  'Wings Meals': [
    { id: 12, name: '4 Wings & Rib Steak with Pap and Salad', image: foto12, description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R104.90' },
    { id: 13, name: '4 Wings & Brisket with Pap and Salad', image: foto13, description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R79.90' },
    { id: 14, name: '4 Wings & Bwors with Pap and Salad', image: foto14, description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R84.90' },
    // { id: 15, name: '4 Wings & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  ],
  // 'Extras': [
  //   { id: 16, name: '1/4 Chicken ', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 17, name: 'Bwors', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
  //   { id: 18, name: 'Brisket', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 19, name: 'Rib Steak', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  // ],

  // 'Cold Drinks': [
  //   { id: 20, name: 'Coke', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 21, name: 'Sprite', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
  //   { id: 22, name: 'Fanta', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 23, name: 'Water', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  // ],

  // 'On Promo': [
  //   { id: 24, name: '1/4 Chicken with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g), served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 25, name: '1/4 Chicken & Bwors with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Bwors(130g) served with pap, and 1 salad of your choice.', price: 'R115' },
  //   { id: 26, name: '1/4 Chicken & Brisket with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g),and a piece of Brisket served with pap, and 1 salad of your choice.', price: 'R105' },
  //   { id: 27, name: '1/4 Chicken & Rib Steak with Pap and Salad', image: 'https://via.placeholder.com/150', description: 'Flame grilled 1/4 Chicken (250g) and a piece of Rib Steak(250g) served with pap, and 1 salad of your choice.', price: 'R115' },
  // ],
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
