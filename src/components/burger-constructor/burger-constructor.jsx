import React, { useState } from 'react';
import styles from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';

export default function BurgerConstructor(props) {
  const { data } = props;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dataList = Object.values(data);
  console.log('dataList: ', dataList);

  const selectedIngredients = dataList.filter((ingredient) => ingredient.type != 'bun');

  const onOpenModal = () => setIsModalOpened(true);
  const onCloseModal = () => setIsModalOpened(false);
  return (
    <section className={styles.burgerConstructor}>
      <div className={styles.constructorField}>
        <div className={styles.constructorElemWrapper}>
          <div className={styles.dragIconWrap}>
            <DragIcon type="primary" />
          </div>
          {dataList.length > 0 && (
            <ConstructorElement
              type="top"
              isLocked={true}
              text={`${dataList[0].name} (верх)`}
              price={dataList[0].price}
              thumbnail={dataList[0].image_mobile}
            />
          )}
        </div>
        <div className={styles.constructorField_scroll}>
          {selectedIngredients.map((ingredient, index) => (
            <div key={index} className={styles.constructorElemWrapper}>
              <div className={styles.dragIconWrap_visible}>
                <DragIcon type="primary" />
              </div>
              <ConstructorElement text={ingredient.name} price={ingredient.price} thumbnail={ingredient.image_mobile} />
            </div>
          ))}
        </div>
        <div className={styles.constructorElemWrapper}>
          <div className={styles.dragIconWrap}>
            <DragIcon type="primary" />
          </div>
          {dataList.length > 0 && (
            <ConstructorElement
              type="bottom"
              isLocked={true}
              text={`${dataList[0].name} (низ)`}
              price={dataList[0].price}
              thumbnail={dataList[0].image_mobile}
            />
          )}
        </div>
      </div>
      <div className={styles.checkoutField}>
        <div className={styles.orderPriceWrap}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large" onClick={onOpenModal}>
          Оформить заказ
        </Button>
      </div>
      {isModalOpened && (
        <Modal title="" onClose={onCloseModal} onClick={onCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}
