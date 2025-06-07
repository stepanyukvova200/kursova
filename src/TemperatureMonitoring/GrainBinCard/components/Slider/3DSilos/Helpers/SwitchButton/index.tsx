import React, { useState } from 'react';
import './style.css';

export const SwitchButton = ({ name, visible, setVisible }: { name: string; visible: boolean; setVisible: () => void }) => (
  <div className="switch__wrapper">
    <div className="switch__button">
      <div className={`switch__button-ball ${!visible && 'handle-on'}`} onClick={setVisible} />
    </div>
    <p className="switch__title">{name}</p>
  </div>
);
