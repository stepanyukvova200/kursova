import { Slider } from '@mui/material';
import React, { FC } from 'react';

import './style.css';

interface CustomSliderProps {
  name?: string;
  silosOpacity?: number | undefined;
  setSilosOpacity?: (value: number) => void;
  min?: number;
  max?: number;
}

const CustomSlider: FC<CustomSliderProps> = ({ name, silosOpacity, setSilosOpacity, min, max }) => (
  <div className="custom-slider-wrapper">
    {name && <p className="custom-slider-title">{name}</p>}
    <div style={{ height: '20px' }}>
      <Slider
        value={silosOpacity} // @ts-ignore
        onChange={(_, value) => setSilosOpacity(value as number)}
        aria-label="Default"
        valueLabelDisplay="auto"
        min={min}
        max={max}
        sx={{
          padding: '0px',
          height: '100%',
          '& .MuiSlider-rail': {
            height: '6px',
            opacity: '1',
            backgroundColor: 'var(--slider-default)',
          },
          '& .MuiSlider-thumb': {
            width: '14px',
            height: '14px',
            backgroundColor: 'var(--main-white)',
            border: '1px solid var(--main-primary)',
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: '0 0 0 8px rgba(50, 134, 36, 0.3)',
            },
          },
          '& .MuiSlider-track': {
            backgroundColor: 'var(--main-primary)',
            height: '6px',
            border: 'none',
          },
        }}
      />
    </div>
  </div>
);

export default CustomSlider;
