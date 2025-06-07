import React from 'react';
import Legend from '../../../GrainBinMap/components/Legend';
import { GrainBinsSlider } from '../GrainBinsSlider';
import './style.scss';

// TODO: this data will be fetched from the server
const legend = [
  { color: '#FF0000', name: 'Аварійна межа' },
  { color: '#FFC107', name: 'Попереджувальна межа' },
  { color: '#4CAF50', name: 'В межах норми' },
  { color: '#2196F3', name: 'Нижче норми' },
  { color: '#BDBDBD', name: 'Дані відсутні' },
];

export const GrainBinContainer = () => (
  <div className="grain-bin__container">
    <GrainBinsSlider />
    <Legend legend={legend} />
  </div>
);
