import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClose, children }) {
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onClose();
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  function handleBackDropClick(event) {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }

  return createPortal(
    <div className={s.Modal__backdrop} onClick={handleBackDropClick}>
      <div className={s.Modal__content}>{children}</div>
    </div>,
    modalRoot,
  );
}

Modal.propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.node,
};

export default Modal;
