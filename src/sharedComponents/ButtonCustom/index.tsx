import React from 'react';
import { Button } from '@mui/material';
import './style.scss';

interface IProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | null;
  variant: 'filled' | 'empty';
  buttonClass?: string;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode; // Дозволяє передавати будь-який контент
  disabled?: boolean;
}

const ButtonCustom: React.FC<IProps> = ({ onClick = null, variant, buttonClass = '', children, type = 'button', disabled = false }) => (
  <>
    {/*@ts-ignore*/}
    <Button onClick={onClick} className={`buttonCustom ${variant} ${buttonClass}`} type={type} disabled={disabled}>
      {children}
    </Button>
  </>
);

export default ButtonCustom;
