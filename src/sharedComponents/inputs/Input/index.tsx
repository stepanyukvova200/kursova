import React, { useContext } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import './input.scss';

// import { ThemeContext } from '@/config/context/theme-context';
import clsx from 'clsx';

interface InputProps {
  id: string;
  label?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  checkboxValue?: boolean;
  // defaultChecked?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  className?: string;
}

const Input: React.FC<InputProps> = ({ id, label, placeholder, type = 'text', disabled, register, required, errors, className }) => {
  const theme = 'light';

  return (
    <div className={!disabled ? 'input__wrapper' : 'input__wrapper disabled'}>
      {label && (
        <label htmlFor={id} className="label">
          {label}
        </label>
      )}
      <input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
        disabled={disabled}
        className={clsx(
          'input',
          { input__light: theme === 'light' }, // @ts-ignore
          { input__dark: theme === 'dark' },
          { input__error: errors[id] },
          className
        )}
        aria-invalid={errors[id] ? 'true' : 'false'}
      />
      {errors && errors[id] && <p className="error__message">{errors[id]?.message as React.ReactNode}</p>}
    </div>
  );
};

export default Input;
