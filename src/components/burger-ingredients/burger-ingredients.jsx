import { useState, useMemo, useEffect } from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientsStyles from "./burger-ingredients.module.scss";
import IngredientItem from "../ingredient-item/ingredient-item";
import Modal from "../modal/modal";
import IngredientDetails from "../ingredient-details/ingredient-details";
import { useSelector, useDispatch } from "react-redux";
import {
  getData,
  openModalIngredientDetails,
  closeModalIngredientDetails,
  returnTabIngredient,
  deleteTabIngredient,
} from "../../services/actions/actions";
import { useInView } from "react-intersection-observer";

function BurgerIngredients() {
  const { burgerIngredients, burgerIngredientsRequest, burgerIngredientsFailed } = useSelector((state) => state.burgerIngredients);
  const { isOpenIngredient } = useSelector((state) => state.ingredientDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getData());
  }, [dispatch]);

  const [current, setCurrent] = useState("one");
  const bun = "bun";
  const sauce = "sauce";
  const main = "main";

  function handleOpenModalIngredient(item) {
    dispatch(openModalIngredientDetails());
    dispatch(returnTabIngredient(item));
  }

  const handleCloseModalIngredient = () => {
    dispatch(closeModalIngredientDetails());
    dispatch(deleteTabIngredient());
  };

  const buns = useMemo(() => burgerIngredients.filter((m) => m.type === bun), [burgerIngredients]);

  const sauces = useMemo(() => burgerIngredients.filter((m) => m.type === sauce), [burgerIngredients]);

  const fillings = useMemo(() => burgerIngredients.filter((m) => m.type === main), [burgerIngredients]);

  const tabStorage = (selectTab) => {
    setCurrent(selectTab);
    const item = document.getElementById(selectTab);
    if (item) {
      return item.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [oneRef, oneInView] = useInView({ threshold: 0.5 });
  const [twoRef, twoInView] = useInView({ threshold: 1 });
  const [threeRef, threeInView] = useInView({ threshold: 0.2 });

  if (burgerIngredientsFailed) {
    return <p>Произошла ошибка при получении данных</p>;
  } else if (burgerIngredientsRequest) {
    return <p>Загрузка данных...</p>;
  } else {
    return (
      <>
        <div style={{ display: "flex" }} className="pt-5 pb-5">
          <Tab value="one" active={oneInView === true} onClick={tabStorage}>
            Булки
          </Tab>
          <Tab value="two" active={twoInView === true} onClick={tabStorage}>
            Соусы
          </Tab>
          <Tab value="three" active={threeInView === true} onClick={tabStorage}>
            Начинки
          </Tab>
        </div>
        <div className={`${ingredientsStyles.ingredient__container} mt-5`} id="scroll-list">
          <div className="pb-5">
            <h2 className="text text_type_main-medium pb-1" id="one">
              Булки
            </h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`} id="one" ref={oneRef}>
              {buns.map((ingredients) => (
                <li key={ingredients._id}>
                  <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5">
            <h2 className="text text_type_main-medium pb-1">Соусы</h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`} id="two" ref={twoRef}>
              {sauces.map((ingredients) => (
                <li key={ingredients._id}>
                  <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-5 pb-5" ref={threeRef}>
            <h2 className="text text_type_main-medium pb-1">Начинки</h2>
            <ul className={`${ingredientsStyles.ingredient__list} pt-5`} id="three">
              {fillings.map((ingredients) => (
                <li key={ingredients._id}>
                  <IngredientItem ingredient={ingredients} onTab={handleOpenModalIngredient} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        {isOpenIngredient && (
          <Modal onClose={handleCloseModalIngredient} title="Детали ингредиента">
            {/* <IngredientDetails /> */}
            <IngredientDetails />
          </Modal>
        )}
      </>
    );
  }
}

export default BurgerIngredients;
