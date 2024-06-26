import modalOverlay from "./modal-overlay.module.scss";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  return <div className={modalOverlay.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;
