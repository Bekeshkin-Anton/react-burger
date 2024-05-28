import React, { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.scss';
import Tabs from '../tabs/tabs';
import IngredientCard from './ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../Ingredient-details/ingredient-details';
import IngredientCategory from './ingredient-category/ingredient-category';

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
        <IngredientCategory list={dataList} categoryTitle="Булки" itemType="bun" />
        <IngredientCategory list={dataList} categoryTitle="Соусы" itemType="sauce" />
        <IngredientCategory list={dataList} categoryTitle="Начинки" itemType="main" />
      </div>
    </section>
  );
}
