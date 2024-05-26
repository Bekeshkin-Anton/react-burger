import React, { useState } from 'react';
import styles from './modal-overlay.module.scss';
import Modal from '../modal/modal';

export default function ModalOverlay() {
  const [isVisible, setIsVisible] = useState(false);
  const handleOpenModal = () => {
    setIsVisible(true);
  };
  const handleCloseModal = () => {
    setIsVisible(false);
  };
  return (
    <>
      {isVisible && (
        <div className={styles.modalOverlay}>
          <Modal title="Детали ингридиента" />
        </div>
      )}
    </>
  );
}
