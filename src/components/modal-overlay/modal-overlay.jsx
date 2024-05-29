import React, { useState } from 'react';
import styles from './modal-overlay.module.scss';
import propTypes from 'prop-types';

export default function ModalOverlay({ ...props }) {
  return (
    <div className={styles.modalOverlay} onClick={props.onClose}>
      <>{props.title}</>
      <>{props.children}</>
    </div>
  );
}
ModalOverlay.propTypes = {
  title: propTypes.string,
  onClose: propTypes.func,
  children: propTypes.node,
};
