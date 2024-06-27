import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerIngredient from "./burger-ingredient.module.css";
import { burgerIngredientTypes } from "../../utils/prop-types";
import { DELETE_INGREDIENTS_CONSTRUCTOR } from "../../services/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { useRef } from "react";

const BurgerIngredient = ({ ingredient, moveItemIngredient }) => {
  const id = ingredient.key;
  const { ingredients } = useSelector((state) => state.ingredientsConstructor);

  const index = ingredients.indexOf(ingredient);
  const dispatch = useDispatch();

  const onDelete = () => {
    return dispatch({
      type: DELETE_INGREDIENTS_CONSTRUCTOR,
      key: ingredient.key,
      uniqueId: ingredient.uniqueId,
    });
  };

  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "item",
    item: () => ({ id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;

  const [{ handlerId }, drop] = useDrop({
    accept: "item",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
    drop(item) {
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItemIngredient(dragIndex, hoverIndex);
    },
  });
  const dragDropRef = drag(drop(ref));

  return (
    <div className={`${burgerIngredient.ingredient__container} pl-2`} data-handler-id={handlerId} ref={dragDropRef} style={{ opacity }}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image_mobile}
        handleClose={() => onDelete()}
      />
    </div>
  );
};

BurgerIngredient.propTypes = {
  ingredient: burgerIngredientTypes,
};

export default BurgerIngredient;
