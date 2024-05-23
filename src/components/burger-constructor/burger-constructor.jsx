import React from 'react';
import styles from './burger-constructor.module.scss';
import { Button, ConstructorElement, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientsInConstructor } from '../../utils/data';
export default function BurgerConstructor() {
  const selectedIngredients = ingredientsInConstructor.filter((ingredient) => ingredient.__v >= 1).filter((elem) => elem.type != 'bun');

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
            text={`${ingredientsInConstructor[0].name} (верх)`}
            price={ingredientsInConstructor[0].price}
            thumbnail={ingredientsInConstructor[0].image_mobile}
          />
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
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${ingredientsInConstructor[0].name} (низ)`}
            price={ingredientsInConstructor[0].price}
            thumbnail={ingredientsInConstructor[0].image_mobile}
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
