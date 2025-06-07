import React, { CSSProperties } from 'react';
import { IGrainBin } from '../..';
import { BinIndicators } from '../BinIndicators';
import GrainBinCard from '../../../../TemperatureMonitoring/GrainBinCard';
import { ROUTERS } from '../../../../sharedComponents/constants/routers';
import { setSilosIndex } from '../../../../redux/reducers/silosIndex/actions';
import { useDispatch } from 'react-redux';

const getContrastColor = (backgroundColor: string) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  return brightness > 128 ? '#1f212b' : '#fefffe';
};

interface SquareBinTypeProps {
  switchTabContent?: (nameOfTab: string, content: React.ReactNode, newLink: string) => void;
  grainBin: IGrainBin;
  scaledX: number;
  scaledY: number;
  scaledWidth: number;
  scaledHeight: number;
}

export const SquareBinType = ({ switchTabContent, grainBin, scaledX, scaledY, scaledWidth, scaledHeight }: SquareBinTypeProps) => {
  const { id, color } = grainBin;
  const contrastColor = getContrastColor(grainBin.color || '#cccccc');
  const dispatch = useDispatch();

  return (
    <div
      key={id}
      className="square-bin-type"
      style={
        {
          '--contrast-color': contrastColor,
          '--scaled-size': `${Math.min(scaledHeight, scaledWidth)}px`,
          left: `${scaledX}px`,
          top: `${scaledY}px`,
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,

          backgroundColor: color || '#979797',
          cursor: 'pointer',
        } as CSSProperties
      }
      onClick={() => {
        dispatch(setSilosIndex(+grainBin.id)); // @ts-ignore
        switchTabContent('grainBinCard', <GrainBinCard />, ROUTERS.THERMOMETRY_TEMPERATURE_HULLCARD);
      }}
    >
      <BinIndicators grainBin={grainBin} />
    </div>
  );
};
