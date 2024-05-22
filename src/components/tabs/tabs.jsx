import React from 'react';
import styles from './tabs.module.scss';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
export default function Tabs() {
  const [current, setCurrent] = React.useState('one');
  return (
    <div className={styles.ingredientTabs}>
      <Tab value="one" active={current === 'one'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="two" active={current === 'two'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="three" active={current === 'three'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  );
}
