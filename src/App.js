import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meallist from './components/MealList';
import { BasketProvider } from './BasketContext';
import MealDetails from './components/MealDetails';
import Checkout from './components/Checkout';
import Payment from './components/Payment';
import LandingPage from './components/LandingPage';



function App() {
  return (

    <BasketProvider>
      <Router>
      <Routes>
        {/* Landing page */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/mealList" element={<Meallist/>} />
        <Route path="/mealdetails/:id" element={<MealDetails />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>

    </BasketProvider>


    
  );
}

export default App;
