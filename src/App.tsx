import React, { useEffect, useState } from 'react';
import './App.css';
import AppHeader from './components/app-header/app-header';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients';
import BurgerConstructor from './components/burger-constructor/burger-constructor';

function App() {
  const [appState, setAppState] = useState({
    data: [],
  });
  useEffect(() => {
    const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';
    fetch(apiUrl)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setAppState({ data: data.data });
      })
      .catch((error) => console.error(error));
  }, [setAppState]);

  return (
    <div className="App">
      <AppHeader />
      <main>
        <BurgerIngredients data={appState.data} />
        <BurgerConstructor />
      </main>
    </div>
  );
}

export default App;
