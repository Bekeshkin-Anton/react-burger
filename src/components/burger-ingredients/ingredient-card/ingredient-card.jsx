import React, { useState, useEffect } from 'react';
import styles from './ingredient-card.module.scss';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../../modal/modal';
import IngredientDetails from '../../Ingredient-details/ingredient-details';

export default function IngredientCard({ ...props }) {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const onShowModal = () => {
    setIsModalOpened(true);
  };
  const onCloseModal = (e) => {
    setIsModalOpened(false);
  };

  const classChanger = props.count === 0 ? 'counter' : 'counter_show';

  return (
    <>
      <div className={styles.ingredientCard} onClick={onShowModal}>
        <div className={styles[classChanger]}>
          <Counter count={props.count} size="default" extraClass="m-1" />
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
          <p className="text text_type_main-default">{props.ingredientName}</p>
        </div>
      </div>
      {isModalOpened && (
        <Modal title="Детали ингредиента" onClose={onCloseModal}>
          <IngredientDetails {...props} />
        </Modal>
      )}
    </>
  );
}
