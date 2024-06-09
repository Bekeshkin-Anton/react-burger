import { ConstructorElement, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import burgerStyles from "./burger-constructor.module.scss";
import BurgerIngredient from "../burger-ingredient/burger-ingredient";
import { useMemo, useCallback } from "react";
import Modal from "../modal/modal";
import OrderDetails from "../order-details/order-details";
import TotalPrice from "../total-price/total-price";
import { useSelector, useDispatch } from "react-redux";
import {
  addIngredients,
  addIngredientsBun,
  openModalOrderDetails,
  closeModalOrderDetails,
  postOrderFetch,
  moveIngredientItem,
  clearConstructorIngredients,
  clearConstructorBun,
} from "../../services/actions/actions";
import { useDrop } from "react-dnd";

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { bun, ingredients } = useSelector((state) => state.ingredientsConstructor);
  console.log();
  const { isOpenOrder } = useSelector((state) => state.orderDetails);
  const saucesAndMains = useMemo(() => ingredients.filter((m) => m.type !== "bun"), [ingredients]);

  const orderIngredients = useMemo(() => ingredients.map((m) => m._id), [ingredients]);

  function onDropHandler(item) {
    if (item.type === "bun") {
      return dispatch(addIngredientsBun(item));
    } else if (item.type !== "bun") {
      return dispatch(addIngredients(item));
    }
  }

  const [{ isActive }, drop] = useDrop({
    accept: "ingredient",
    drop(itemId) {
      onDropHandler(itemId);
    },
    collect: (monitor) => ({
      isActive: monitor.canDrop() && monitor.isOver(),
    }),
  });
  const handleOpenModal = () => {
    dispatch(openModalOrderDetails());
    const allIngredients = [...orderIngredients, bun._id];
    dispatch(postOrderFetch(allIngredients));
  };

  const handleCloseModal = () => {
    dispatch(closeModalOrderDetails());
    dispatch(clearConstructorIngredients());
    dispatch(clearConstructorBun());
  };

  const totalPrice = useMemo(() => {
    const priceIngredients = saucesAndMains.reduce((acc, item) => {
      return acc + item.price;
    }, 0);
    const bunPrice = () => {
      if (bun) {
        return 2 * bun.price;
      } else {
        return 0;
      }
    };
    return priceIngredients + bunPrice();
  }, [saucesAndMains, bun]);

  const moveItemIngredient = useCallback(
    (dragIndex, hoverIndex) => {
      dispatch(moveIngredientItem(dragIndex, hoverIndex));
    },
    [dispatch]
  );

  return (
    <div>
      <div className={`${burgerStyles.ingredient} pl-4 pb-5`} ref={drop}>
        {isActive && "булочку закинь повыше, соусы и начинки - посередине"}
        {bun && (
          <ConstructorElement
            type="top"
            isLocked="true"
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
            ingredient={bun}
          />
        )}
        <ul className={`${burgerStyles.ingredient__list} pt-5`}>
          {ingredients.map((item) => (
            <li key={item.uniqueId} className={`${burgerStyles.ingredient__item} pb-4`}>
              <BurgerIngredient ingredient={item} moveItemIngredient={moveItemIngredient} />
            </li>
          ))}
        </ul>
        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked="true"
            text={`${bun.name} (низ)`}
            price={bun.price}
            thumbnail={bun.image_mobile}
            ingredient={bun}
          />
        )}
      </div>
      <div className={`${burgerStyles.order} pt-5 pr-4`}>
        <TotalPrice totalPrice={totalPrice} />
        {bun ? (
          <div className="pl-5">
            <Button htmlType="button" type="primary" size="large" onClick={handleOpenModal}>
              Оформить заказ
            </Button>
          </div>
        ) : (
          <div className="pl-5">
            <Button htmlType="button" type="primary" size="large">
              Оформить заказ
            </Button>
          </div>
        )}
      </div>
      {isOpenOrder && (
        <Modal onClose={handleCloseModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
}

export default BurgerConstructor;
