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
      {buttons.map((button, index) => {
        const isPrimary = button.label.toLowerCase() === 'yes';
        return (
          <button
            key={index}
            onClick={() => onButtonClick(button.payload)}
            className={`px-5 py-2 rounded-full font-semibold shadow transition-colors duration-200
              ${isPrimary
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}
            `}
          >
            {button.label}
          </button>
        );
      })}
    </div>
  );
};

export default ActionButtons; 