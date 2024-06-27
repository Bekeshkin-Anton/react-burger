import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { ingredientPropType } from "../../utils/prop-types.js";
import ingredientItem from "./ingredient-item.module.css";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { useMemo } from "react";

const IngredientItem = ({ ingredient, onTab }) => {
  const { bun, ingredients } = useSelector((state) => state.ingredientsConstructor);
  const [{ isDragging }, drag] = useDrag({
    type: "ingredient",
    item: ingredient,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0.5 : 1;

  const counter = useMemo(() => {
    const ingredientsId = ingredients.filter((item) => item._id === ingredient._id);
    return ingredientsId.length;
  }, [ingredients, ingredient._id]);

  const counterForBun = useMemo(() => {
    if (bun === null) {
      return 0;
    } else if (bun !== null && ingredient._id === bun._id) {
      return 2;
    }
  }, [bun, ingredient._id]);

  return (
    <div className={ingredientItem.ingredient__item} onClick={() => onTab(ingredient)} ref={drag} style={{ opacity }}>
      {ingredient.type !== "bun" ? (
        <Counter count={counter} className={ingredientItem.counter} />
      ) : (
        <Counter count={counterForBun} className={ingredientItem.counter} />
      )}
      <img src={ingredient.image} alt="фото." id={ingredient._id} />
      <div className={`${ingredientItem.ingredient__price} pt-1 pb-1`}>
        <p className="text text_type_digits-default pr-2">{ingredient.price}</p>
        <CurrencyIcon />
      </div>
      <p className={`${ingredientItem.text__align} text text_type_main-default`}>{ingredient.name}</p>
    </div>
  );
};

IngredientItem.propTypes = {
  ingredient: ingredientPropType.isRequired,
};

export default IngredientItem;
