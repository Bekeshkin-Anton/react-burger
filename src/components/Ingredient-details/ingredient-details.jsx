import React from 'react';
import styles from './ingredient-details.module.scss';
export default function IngredientDetails(props) {
  return (
    <>
      <div className={styles.ingredientImageWrapper}>
        <img src={props.image} alt="" />
      </div>
      <div className={styles.ingredientTitleWrapper}>
        <p className="text text_type_main-medium mt-4">{props.ingredientName}</p>
      </div>
      <div className={styles.compound}>
        <div className={styles.compound__item}>
          <p className="text text_type_main-default text_color_inactive">Калории, Калл</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredientCalories}</p>
        </div>
        <div className={styles.compound__item}>
          <p className="text text_type_main-default text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredientsProteins}</p>
        </div>
        <div className={styles.compound__item}>
          <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredientFat}</p>
        </div>
        <div className={styles.compound__item}>
          <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.ingredientsCarbohydrates}</p>
        </div>
      </div>
    </>
  );
}
