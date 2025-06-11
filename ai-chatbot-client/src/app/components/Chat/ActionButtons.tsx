import React from 'react';

interface ActionButton {
  label: string;
  payload: string;
}

interface ActionButtonsProps {
  buttons: ActionButton[];
  onButtonClick: (payload: string) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ buttons, onButtonClick }) => {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button.payload)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons; 