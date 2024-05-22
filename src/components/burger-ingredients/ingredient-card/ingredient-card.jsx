import React from 'react';
import styles from './ingredient-card.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export default function IngredientCard(props) {
  return (
    <div className={styles.ingredientCard}>
      <Counter count={props.count} size="default" extraClass="m-1" />
      <div className={styles.ingredientCard__image}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles.ingredientCard__priceWrapper}>
        <div className="text text_type_main-medium">{props.price}</div>
        <div className={styles.ingredientCard__priceImage}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <div className="pb-10 pt-4">
        <p className="text text_type_main-default">{props.title}</p>
      </div>
    </div>
  );
}