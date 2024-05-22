import React, { useState } from 'react';
import styles from './ingredient-info-popup.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsData } from '../../../utils/data';
export default function IngredientInfoPopup(props) {
  const [isShow, setIsShow] = useState(false);
  const classChanger = isShow ? 'popupLayout_show' : 'popupLayout';
  const hidePopup = () => setIsShow(!isShow);
  return (
    <div className={styles[classChanger]}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <p className="text text_type_main-large">Детали ингридиента</p>
          <CloseIcon type="primary" onClick={() => hidePopup()} />
        </div>

        <div className={styles.ingredientImageWrapper}>
          <img src={ingredientsData[0].image_large} alt="" />
        </div>
        <div className={styles.ingredientTitleWrapper}>
          <p className="text text_type_main-medium mt-4">{ingredientsData[0].name}</p>
        </div>
        <div className={styles.compound}>
          <div className={styles.compound__item}>
            <p className="text text_type_main-default text_color_inactive">Калории, Калл</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredientsData[0].calories}</p>
          </div>
          <div className={styles.compound__item}>
            <p className="text text_type_main-default text_color_inactive">Белки, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredientsData[0].proteins}</p>
          </div>
          <div className={styles.compound__item}>
            <p className="text text_type_main-default text_color_inactive">Жиры, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredientsData[0].fat}</p>
          </div>
          <div className={styles.compound__item}>
            <p className="text text_type_main-default text_color_inactive">Углеводы, г</p>
            <p className="text text_type_digits-default text_color_inactive">{ingredientsData[0].carbohydrates}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
