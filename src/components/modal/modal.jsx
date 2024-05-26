import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import IngredientDetails from '../Ingredient-details/ingredient-details';

export default function Modal(props) {
  const modalRoot = document.getElementById('react-modal');

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        <p className="text text_type_main-large">{props.title}</p>
        <div className={styles.modalCloseBtnWrapper}>
          <CloseIcon type="primary" onClick={props.onClick} />
        </div>
      </div>
      {props.children}
      {/* <IngredientDetails /> */}
    </div>,
    modalRoot
  );
}
