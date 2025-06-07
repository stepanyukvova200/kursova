import React from 'react';
import './style.scss'

interface NumberInputProps {
  value: number;
  onChange: (newValue: number) => void;
  step?: number;
  className?: string;
}

const NumberInput: React.FC<NumberInputProps> = ({
                                                   value,
                                                   onChange,
                                                   step = 1,
                                                   className = '',
                                                 }) => {
  const handleDecrease = () => {
    const newValue = value - step;
    onChange(newValue);
  };

  const handleIncrease = () => {
    const newValue = value + step;
    onChange(newValue);
  };

  return (
    <div className={`number-input-container ${className}`}>
      <button
        className="number-input-decrease"
        onClick={handleDecrease}
      >
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3.7L0 0.7L0.7 0L3 2.3L5.3 0L6 0.7L3 3.7Z" fill="var(--color-black)"/>
        </svg>
      </button>
      <input
        className="number-input-field"
        type="number"
        value={value}
        onChange={(e) => {
          const newValue = +e.target.value;
          onChange(newValue);
        }}

      />
      <button
        className="number-input-increase"
        onClick={handleIncrease}
      >
        <svg width="6" height="4" viewBox="0 0 6 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 1.4L0.7 3.7L0 3L3 0L6 3L5.3 3.7L3 1.4Z" fill="var(--color-black)"/>
        </svg>
      </button>
    </div>
  );
};

export default NumberInput;
