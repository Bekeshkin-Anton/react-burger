import React from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';
import IngredientInfoPopup from './components/popups/ingredient-info-popup/ingredient-info-popup';
import OrderAcceptPopup from './components/popups/order-accept-popup/order-accept-popup';

function App() {
  return (
    <div className="App">
      <IngredientInfoPopup />
      <OrderAcceptPopup />
      <AppHeader />
      <main>
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
