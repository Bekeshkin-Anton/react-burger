import React from 'react';
import styles from './ingredient-category.module.scss';
import IngredientCard from '../ingredient-card/ingredient-card';
import propTypes from 'prop-types';

export default function IngredientCategory({ ...props }) {
  const { list } = props;

  return (
    <div className={styles.burgerIngredients__field}>
      <h2 className="text text_type_main-medium">{props.categoryTitle}</h2>
      <div className={styles.burgerIngredientsField}>
        {list
          .filter((item) => item.type === `${props.itemType}`)
          .map((dataListItem) => (
            <IngredientCard
              onClick={props.onClick}
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
  );
}

IngredientCategory.propTypes = {
  categoryTitle: propTypes.string,
  itemType: propTypes.string,
};
