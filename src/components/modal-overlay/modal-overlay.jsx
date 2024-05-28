import React, { useState } from 'react';
import styles from './modal-overlay.module.scss';

export default function ModalOverlay({ ...props }) {
  return (
    // <div className={styles.modalOverlay}>
    <div className={styles.modalOverlay} onClick={props.onClose}>
      <>{props.title}</>
      <>{props.children}</>
    </div>
  );
}
