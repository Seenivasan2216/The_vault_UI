import React from 'react';
import { Dialog } from '@material-tailwind/react';

const AlertPopup = ({ isOpen, onClose, title, message }) => {
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Header>
        <h2 className="text-lg font-semibold">{title}</h2>
      </Dialog.Header>
      <Dialog.Body>
        <p className="text-sm">{message}</p>
      </Dialog.Body>
      <Dialog.Footer>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </Dialog.Footer>
    </Dialog>
  );
};


export default AlertPopup;