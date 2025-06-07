import React from 'react';
import { IGrainBin } from '../..';
import { CO2Icon, DeltaTIcon, TemperatureMaxIcon, WaterIcon } from '../icons';

const getContrastColor = (backgroundColor: string) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  return brightness > 128 ? '#1f212b' : '#fefffe';
};

interface BinIndicatorsProps {
  grainBin: IGrainBin;
}

export const BinIndicators = ({ grainBin }: BinIndicatorsProps) => {
  const { name, color, weight, humidity, co2, maxTemperature, deltaT, grainBinType, grainCropsType } = grainBin;
  const contrastColor = getContrastColor(color || '#cccccc');

  return (
    <>
      <p className={`bin-type__name ${grainBinType}`}>{name}</p>
      {grainCropsType && <div className="info__field">{grainCropsType}</div>}
      <div className={`info__container ${grainBinType}`}>
        <div className="info__group">
          <div className="info__item">
            <WaterIcon color={contrastColor} />
            <p>{humidity}%</p>
          </div>
          <div className="info__item">
            <CO2Icon color={contrastColor} />
            <p>{co2}%</p>
          </div>
        </div>
        <div className="info__group">
          <div className="info__item icon__custom">
            <TemperatureMaxIcon color={contrastColor} />
            <p>{maxTemperature}°C</p>
          </div>
          <div className="info__item">
            <DeltaTIcon color={contrastColor} />
            <p>{deltaT}°C</p>
          </div>
        </div>
      </div>
      <p className={`info__weight ${grainBinType}`}>Вага: ~{weight} т</p>
    </>
  );
};
