import React from 'react';
import { Button } from '../UI';
import { UI_TEXT } from '../../constants';

interface ModalFooterProps {
  onClose: () => void;
}

const ModalFooter: React.FC<ModalFooterProps> = ({ onClose }) => {
  return (
    <div className="px-6 py-4 bg-gray-50 rounded-b-lg">
      <div className="flex justify-end">
        <Button onClick={onClose} variant="primary">
          {UI_TEXT.BUTTONS.CLOSE}
        </Button>
      </div>
    </div>
  );
};

export default ModalFooter;