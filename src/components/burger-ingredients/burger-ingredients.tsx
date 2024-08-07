import { useState, useMemo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import ingredientsStyles from './burger-ingredients.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { useAppDispatch, useAppSelector } from '../../services/index';
import { openModalIngredientDetails, returnTabIngredient } from '../../services/actions/ingredient-deteils-actions';

import { useInView } from 'react-intersection-observer';
import { useLocation, Link } from 'react-router-dom';
import Loader from '../loader/loader';
import { IIngredient } from '../../utils/types';

function BurgerIngredients() {
  const { burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed } = useAppSelector(
    (state) => state.rootReducer.burgerIngredients
  );

  const dispatch = useAppDispatch();
  const location = useLocation();

  const [current, setCurrent] = useState<string>('one');

  const bun = 'bun';
  const sauce = 'sauce';
  const main = 'main';

  function handleOpenModalIngredient(item: IIngredient) {
    dispatch(openModalIngredientDetails());
    dispatch(returnTabIngredient(item));
  }

  const buns = useMemo(() => burgerIngredients.filter((m) => m.type === bun), [burgerIngredients]);

  const sauces = useMemo(() => burgerIngredients.filter((m) => m.type === sauce), [burgerIngredients]);

  const fillings = useMemo(() => burgerIngredients.filter((m) => m.type === main), [burgerIngredients]);

  const tabStorage = (selectTab: string) => {
    setCurrent(selectTab);
    const item = document.getElementById(selectTab);
    if (item) {
      return item.scrollIntoView({ behavior: 'auto' });
    }
  };

  const [oneRef, oneInView] = useInView({ threshold: 0.5 });
  const [twoRef, twoInView] = useInView({ threshold: 1 });
  const [threeRef, threeInView] = useInView({ threshold: 0.2 });

  if (burgerIngredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (burgerIngredientsRequest) {
    return <Loader />;
  } else {
    return (
      <div data-cy="BurgerIngredients">
        <div data-cy="BurgerIngredientsTabsWrapper" style={{ display: 'flex' }} className="pt-5 pb-5">
          <Tab data-cy="Tab-1" value="one" active={oneInView === true} onClick={tabStorage}>
            Булки
          </Tab>
          <Tab data-cy="Tab-2" value="two" active={twoInView === true} onClick={tabStorage}>
            Соусы
          </Tab>
          <Tab data-cy="Tab-3" value="three" active={threeInView === true} onClick={tabStorage}>
            Начинки
          </Tab>
        </div>
        <div className={`${ingredientsStyles.ingredient__container} mt-5`} id="scroll-list">
          <div className="pb-5">
            <h2 className="text text_type_main-medium pb-1" id="one">
              Булки
            </h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`} id="one" ref={oneRef}>
              {buns.map((ingredients: IIngredient) => (
                <div data-cy="link">
                  <Link
                    key={ingredients._id}
                    className={`${ingredientsStyles.ingredient__link} `}
                    to={`/ingredients/${ingredients._id}`}
                    state={{ background: location }}
                  >
                    <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5">
            <h2 className="text text_type_main-medium pb-1" id="two">
              Соусы
            </h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`} ref={twoRef}>
              {sauces.map((ingredients: IIngredient) => (
                <div data-cy="link">
                  <Link
                    key={ingredients._id}
                    to={`/ingredients/${ingredients._id}`}
                    state={{ background: location }}
                    className={`${ingredientsStyles.ingredient__link} `}
                  >
                    <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5" ref={threeRef}>
            <h2 className="text text_type_main-medium pb-1" id="three">
              Начинки
            </h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`}>
              {fillings.map((ingredients: IIngredient) => (
                <div data-cy="link">
                  <Link
                    key={ingredients._id}
                    to={`/ingredients/${ingredients._id}`}
                    state={{ background: location }}
                    className={`${ingredientsStyles.ingredient__link} `}
                  >
                    <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                  </Link>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default BurgerIngredients;
