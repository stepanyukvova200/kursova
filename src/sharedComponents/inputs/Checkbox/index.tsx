import React, { useContext } from 'react';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import './checkbox.scss';

// import { ThemeContext } from '@/config/context/theme-context';
import clsx from 'clsx';

interface CheckboxProps {
  id: string;
  label?: string;
  disabled?: boolean;
  required?: boolean;
  checked?: boolean; // Додаємо checked для контролю ззовні
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Додаємо onChange
  defaultChecked?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, label, disabled, required, checked, onChange, defaultChecked, register, errors }) => {
  // const { theme } = useContext(ThemeContext);
  const theme = 'light';
  console.log(register, required);
  /* console.clear(); */

  return (
    <div className={clsx('checkbox-container', { checkbox__disabled: disabled })}>
      {/*@ts-ignore*/}
      <label htmlFor={id} className={clsx('checkbox-label', { checkbox__light: theme === 'light' }, { checkbox__dark: theme === 'dark' })}>
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          defaultChecked={defaultChecked}
          disabled={disabled} // @ts-ignore
          className={clsx('checkbox-input', { checkbox__light: theme === 'light' }, { checkbox__dark: theme === 'dark' })}
        />
        {label}
      </label>
      {/* Виведення помилки, якщо є */}
      {errors && errors[id] && <p className="error__message">{errors[id]?.message as React.ReactNode}</p>}
    </div>
  );
};

export default Checkbox;
