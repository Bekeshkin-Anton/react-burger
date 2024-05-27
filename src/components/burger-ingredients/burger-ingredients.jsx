import React, { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.scss';
import Tabs from '../tabs/tabs';
import IngredientCard from './ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../Ingredient-details/ingredient-details';

export default function BurgerIngredients(props) {
  const { data } = props;

  const dataList = Object.values(data);

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
            {dataList
              .filter((bun) => bun.type === 'bun')
              .map((dataListItem) => (
                <IngredientCard
                  key={dataListItem._id}
                  image={dataListItem.image}
                  price={dataListItem.price}
                  ingredientName={dataListItem.name}
                  count={dataListItem.__v}
                  ingredientCalories={dataListItem.calories}
                  ingredientsProteins={dataListItem.proteins}
                  ingredientFat={dataListItem.fat}
                  ingredientsCarbohydrates={dataListItem.carbohydrates}
                />
              ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={styles.burgerIngredientsField}>
            {dataList
              .filter((sauce) => sauce.type === 'sauce')
              .map((dataListItem) => (
                <IngredientCard
                  key={dataListItem._id}
                  image={dataListItem.image}
                  price={dataListItem.price}
                  ingredientName={dataListItem.name}
                  count={dataListItem.__v}
                  ingredientCalories={dataListItem.calories}
                  ingredientsProteins={dataListItem.proteins}
                  ingredientFat={dataListItem.fat}
                  ingredientsCarbohydrates={dataListItem.carbohydrates}
                />
              ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={styles.burgerIngredientsField}>
            {dataList
              .filter((filling) => filling.type === 'main')
              .map((dataListItem) => (
                <IngredientCard
                  key={dataListItem._id}
                  image={dataListItem.image}
                  price={dataListItem.price}
                  ingredientName={dataListItem.name}
                  count={dataListItem.__v}
                  ingredientCalories={dataListItem.calories}
                  ingredientsProteins={dataListItem.proteins}
                  ingredientFat={dataListItem.fat}
                  ingredientsCarbohydrates={dataListItem.carbohydrates}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
