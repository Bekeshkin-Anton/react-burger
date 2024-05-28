import React from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/modal-overlay';

export default function Modal({ ...props }) {
  const modalRoot = document.getElementById('react-modal');
  return createPortal(
    <>
      <ModalOverlay title={props.title} onClose={props.onClose} onClick={props.onClose} />
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <p className="text text_type_main-large">{props.title}</p>
          <div className={styles.modalCloseBtnWrapper} onClick={props.onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        {props.children}
      </div>
    </>,
    modalRoot
  );
}
