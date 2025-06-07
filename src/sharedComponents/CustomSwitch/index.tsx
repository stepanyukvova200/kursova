import React, { FC } from 'react';
import './style.css';

interface CustomSwitchProps {
  name?: string;
  visible: boolean;
  setVisible: (value: boolean) => void;
  light?: boolean;
  controls?: boolean;
}

const CustomSwitch: FC<CustomSwitchProps> = ({ name, visible, setVisible, light, controls }) => (
  <div className="custom-switch-wrapper">
    <div
      className={`custom-switch-button ${light ? 'custom-switch-button-light' : 'custom-switch-button-default'} ${visible && 'custom-switch-button-active'}`}
      onClick={() => setVisible(!visible)}
    >
      <div className={`custom-switch-ball ${visible && 'custom-switch-ball-active'}`} />
    </div>
    {name && <p className="custom-switch-title">{name}</p>}
    {controls && <p className="custom-switch-controls">{visible ? 'Ввімкнено' : 'Вимкнено'}</p>}
  </div>
);

export default CustomSwitch;
