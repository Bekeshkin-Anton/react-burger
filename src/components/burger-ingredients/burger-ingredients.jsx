import React, { useState } from 'react';
import styles from './burger-ingredients.module.scss';
import Tabs from '../tabs/tabs';
import IngredientCard from './ingredient-card/ingredient-card';
import Modal from '../modal/modal';
import IngredientDetails from '../Ingredient-details/ingredient-details';

export default function BurgerIngredients(props) {
  const { data } = props;
  const [isModalOpened, setIsModalOpened] = useState(false);

  const dataList = Object.values(data);

  const buns = dataList.filter((bun) => bun.type === 'bun');
  const sauces = dataList.filter((sauce) => sauce.type === 'sauce');
  const fillings = dataList.filter((filling) => filling.type === 'main');

  const onOpenModal = () => setIsModalOpened(true);
  const onCloseModal = () => setIsModalOpened(false);
  return (
    <section className={styles.burgerIngredients}>
      <div className={styles.titleWrapper}>
        <h1 className="text text_type_main-large">Соберите бургер</h1>
      </div>
      <Tabs />
      <div className={styles.burgerIngredients__fields}>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Булки</h2>
          <div className={styles.burgerIngredientsField}>
            {buns.map((filteredBuns) => (
              <IngredientCard
                onClick={onOpenModal}
                key={filteredBuns._id}
                image={filteredBuns.image}
                price={filteredBuns.price}
                title={filteredBuns.name}
                count={filteredBuns.__v}
              />
            ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Соусы</h2>
          <div className={styles.burgerIngredientsField}>
            {sauces.map((filteredSauce) => (
              <IngredientCard
                onClick={onOpenModal}
                key={filteredSauce._id}
                image={filteredSauce.image}
                price={filteredSauce.price}
                title={filteredSauce.name}
                count={filteredSauce.__v}
              />
            ))}
          </div>
        </div>
        <div className={styles.burgerIngredients__field}>
          <h2 className="text text_type_main-medium">Начинки</h2>
          <div className={styles.burgerIngredientsField}>
            {fillings.map((filteredFilling) => (
              <IngredientCard
                onClick={onOpenModal}
                key={filteredFilling._id}
                image={filteredFilling.image}
                price={filteredFilling.price}
                title={filteredFilling.name}
                count={filteredFilling.__v}
              />
            ))}
          </div>
        </div>
      </div>
      {isModalOpened && (
        <Modal title="Детали ингредиента" onClose={onCloseModal}>
          <IngredientDetails />
        </Modal>
      )}
    </section>
  );
}
