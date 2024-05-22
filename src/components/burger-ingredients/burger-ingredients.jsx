import React from 'react';
import styles from './burger-ingredients.module.scss';
import Tabs from '../tabs/tabs';
import { ingredientsData } from '../../utils/data';
import IngredientCard from './ingredient-card/ingredient-card';

export default function BurgerIngredients() {
  const buns = ingredientsData.filter((bun) => bun.type === 'bun');
  const sauces = ingredientsData.filter((sauce) => sauce.type === 'sauce');
  const fillings = ingredientsData.filter((filling) => filling.type === 'main');

  return (
    <section className={styles.burgerIngredients}>
      <div className={styles.titleWrapper}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <Tabs />
      <div className={styles.burgerIngredients__fields}>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={styles.burgerIngredientsField}>
            {buns.map((filteredBuns) => (
              <IngredientCard
                key={filteredBuns._id}
                image={filteredBuns.image}
                price={filteredBuns.price}
                title={filteredBuns.name}
                count={filteredBuns.__v}
              />
            ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={styles.burgerIngredientsField}>
            {sauces.map((filteredSauce) => (
              <IngredientCard
                key={filteredSauce._id}
                image={filteredSauce.image}
                price={filteredSauce.price}
                title={filteredSauce.name}
                count={filteredSauce.__v}
              />
            ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={styles.burgerIngredientsField}>
            {fillings.map((filteredFilling) => (
              <IngredientCard
                key={filteredFilling._id}
                image={filteredFilling.image}
                price={filteredFilling.price}
                title={filteredFilling.name}
                count={filteredFilling.__v}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
