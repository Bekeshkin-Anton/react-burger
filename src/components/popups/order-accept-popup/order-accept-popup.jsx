import React from 'react';
import styles from './order-accept-popup.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsData } from '../../../utils/data';
export default function OrderAcceptPopup() {
  return (
    <div className={styles.popupWrapper}>
      <div className={styles.popup}>
        <div className={styles.popupHeader}>
          <p className="text text_type_main-large">Детали ингридиента</p>
          <CloseIcon type="primary" />
        </div>
      </div>
    </div>
  );
}
