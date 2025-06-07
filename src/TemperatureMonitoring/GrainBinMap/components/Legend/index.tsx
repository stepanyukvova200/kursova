import React from 'react';
import { DoorIcon, LadderIcon } from '../icons';
import './legend.scss';

import CustomSwiper from '../../../../sharedComponents/CustomSwiper';

interface ILegend {
  color: string;
  name: string;
}

interface LegendProps {
  legend: ILegend[];
}

const Legend = ({ legend }: LegendProps) => {
  const slidesContent = legend.map((legendItem, index) => (
    <div key={index} className="legend-item">
      <div className="color-box" style={{ backgroundColor: legendItem.color }} />
      <span className="legend-title">{legendItem.name}</span>
    </div>
  ));

  slidesContent.push(
    <div className="legend-item">
      <div className="icon-box">
        <DoorIcon color="var(--color-black)" />
      </div>
      <span className="legend-title">Вхід</span>
    </div>
  );

  slidesContent.push(
    <div className="legend-item">
      <div className="icon-box">
        <LadderIcon color="var(--color-black)" />
      </div>
      <span className="legend-title">Драбина</span>
    </div>
  );

  return (
    <div className="legend-container">
      <CustomSwiper
        slides={slidesContent}
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          930: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1450: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          1800: {
            slidesPerView: 5,
            spaceBetween: 30,
          },
          2200: {
            slidesPerView: 6,
            spaceBetween: 30,
          },
        }}
        customClasses="grain-bin__swiper"
      />
    </div>
  );
};

export default Legend;
