import React, { useState } from 'react';
import styles from './order-accept-popup.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsData } from '../../../utils/data';
import successImg from '../../../images/success.svg';
export default function OrderAcceptPopup(props) {
  const [isShow, setIsShow] = useState(false);
  const classChanger = isShow ? 'popupLayout_show' : 'popupLayout';
  const hidePopup = () => setIsShow(!isShow);
  return (
    <div className={styles[classChanger]}>
      <div className={styles.popup}>
        <div className={styles.popupCloseBtnWrapper}>
          <CloseIcon type="primary" onClick={() => hidePopup()} />
        </div>
        <div className={styles.orderIdWrapper}>
          <p className="text text_type_digits-large">023932</p>
          <p className="text text_type_main-medium">Идентификатор заказа</p>
        </div>
        <div className="mt-15">
          <img src={successImg} alt="" />
        </div>

        <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-default text_color_inactive mt-2">Дождитесь готовности на орбитальной станции</p>
      </div>
    </div>
  );
}
