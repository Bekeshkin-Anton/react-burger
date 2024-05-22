import React from 'react';
import styles from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsData } from '../../utils/data';
export default function BurgerConstructor() {
  return (
    <section className={styles.burgerConstructor}>
      <div className={styles.constructorField}>
        <div className={styles.constructorElemWrapper}>
          <div className={styles.dragIconWrap}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={20}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </div>
        <div className={styles.constructorElemWrapper}>
          {' '}
          <div className={styles.dragIconWrap_visible}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text="Соус традиционный галактический" price={30} thumbnail={ingredientsData[5].image_mobile} />
        </div>
        <div className={styles.constructorElemWrapper}>
          {' '}
          <div className={styles.dragIconWrap_visible}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text="Мясо бессмертных моллюсков Protostomia" price={300} thumbnail={ingredientsData[4].image_mobile} />
        </div>
        <div className={styles.constructorElemWrapper}>
          {' '}
          <div className={styles.dragIconWrap_visible}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text="Плоды Фалленианского дерева" price={80} thumbnail={ingredientsData[7].image_mobile} />
        </div>
        <div className={styles.constructorElemWrapper}>
          {' '}
          <div className={styles.dragIconWrap_visible}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text="Хрустящие минеральные кольца" price={300} thumbnail={ingredientsData[8].image_mobile} />
        </div>
        <div className={styles.constructorElemWrapper}>
          {' '}
          <div className={styles.dragIconWrap_visible}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement text="Хрустящие минеральные кольца" price={300} thumbnail={ingredientsData[8].image_mobile} />
        </div>
        <div className={styles.constructorElemWrapper}>
          <div className={styles.dragIconWrap}>
            <DragIcon type="primary" />
          </div>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={20}
            thumbnail={ingredientsData[0].image_mobile}
          />
        </div>
      </div>
      <div className={styles.checkoutField}>
        <div className={styles.orderPriceWrap}>
          <p className="text text_type_digits-medium">610</p>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" size="large">
          Оформить заказ
        </Button>
      </div>
    </section>
  );
}
