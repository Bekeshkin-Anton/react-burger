import React from 'react';
import styles from './app-header.module.scss';
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export default function AppHeader() {
  return (
    <header>
      <nav className={styles.headerNav}>
        <a className={styles.headerNav__elem_active} href="#">
          <BurgerIcon type="primary" /> <span className="text text_type_main-default">Конструктор</span>
        </a>
        <a className={styles.headerNav__elem} href="#">
          <ListIcon type="secondary" /> <span className="text text_type_main-default">Лента заказов</span>
        </a>
      </nav>
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.personalArea}>
        <ProfileIcon type="secondary" /> <span className="text text_type_main-default">Личный кабинет</span>
      </div>
    </header>
  );
}
