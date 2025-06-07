import React, { CSSProperties } from 'react';
import { IGrainBin } from '../..';
import { BinIndicators } from '../BinIndicators';
import './style.scss';
import { ROUTERS } from '../../../../sharedComponents/constants/routers';
import { useNavigate, useSearchParams } from 'react-router-dom';

const getContrastColor = (backgroundColor: string) => {
  const r = parseInt(backgroundColor.slice(1, 3), 16);
  const g = parseInt(backgroundColor.slice(3, 5), 16);
  const b = parseInt(backgroundColor.slice(5, 7), 16);

  const brightness = r * 0.299 + g * 0.587 + b * 0.114;

  return brightness > 128 ? '#1f212b' : '#fefffe';
};

interface CircleBinTypeProps {
  switchTabContent?: (nameOfTab: string, content: React.ReactNode, newLink: string) => void;
  grainBin: IGrainBin;
  scaledRadius: number;
  scaledX: number;
  scaledY: number;
}

export const CircleBinType = ({ switchTabContent, grainBin, scaledRadius, scaledX, scaledY }: any) => {
  const contrastColor = getContrastColor(grainBin.color || '#cccccc');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  return (
    <div
      key={grainBin.id}
      className="circle-bin-type"
      style={
        {
          '--contrast-color': contrastColor,
          '--circle-bg-color': grainBin.colour || '#979797',
          '--scaled-radius': `${scaledRadius * 2}px`,
          '--scaled-size': `${scaledRadius * 2}px`,
          left: `${scaledX}px`,
          top: `${scaledY}px`,
          cursor: 'pointer',
        } as CSSProperties
      }
      onClick={() => {
        /* switchTabContent('grainBinCard', <div />, ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD); */
        navigate({
          pathname: ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD,
          search: `?silos=${grainBin.id}`,
        });
      }}
    >
      <BinIndicators grainBin={grainBin} />
    </div>
  );
};
