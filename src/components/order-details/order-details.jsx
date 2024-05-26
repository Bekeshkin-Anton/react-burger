import React from 'react';
import successImg from '../../images/success.svg';
import styles from './order-details.module.scss';
export default function OrderDetails(props) {
  return (
    <>
      <div className="text text_type_digits-large">763523</div>
      {/* <div className="text text_type_digits-large">{props.orderNum}</div> */}
      <p className="text text_type_main-medium mt-10">Идентификатор заказа</p>
      <div className="mt-15">
        <img src={successImg} alt="" />
      </div>
      <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-default text_color_inactive mt-2 mb-120">Дождитесь готовности на орбитальной станции</p>
    </>
  );
}
