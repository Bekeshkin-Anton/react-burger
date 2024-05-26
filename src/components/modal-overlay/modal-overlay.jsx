import React, { useState } from 'react';
import styles from './modal-overlay.module.scss';

export default function ModalOverlay({ title, onClose, children }) {
  return (
    <div className={styles.modalOverlay}>
      <>{title}</>
      <>{children}</>
    </div>
  );
}
