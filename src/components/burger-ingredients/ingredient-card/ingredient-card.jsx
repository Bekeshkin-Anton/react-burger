import React from 'react';
import styles from './ingredient-card.module.scss';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
export default function IngredientCard(props) {
  return (
    <div className={styles.ingredientCard}>
      <div className={styles.itemCount}>
        <p className="text text_type_digits-default">{props.currentItemCount}</p>
      </div>
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
