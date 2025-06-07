import React from 'react';
import { ElementGrainBinType, IElementGrainBin } from '../..';
import { DoorIcon, LadderIcon } from '../icons';

interface ElementGrainBinProps {
  element: IElementGrainBin;
  scaledX: number;
  scaledY: number;
  // scaledWidth: number;
  // scaledHeight: number;
  theme: string;
}

const ElementGrainBin = ({ element, scaledX, scaledY, theme }: ElementGrainBinProps) => {
  const getIconColor = (theme: string) => (theme === 'light' ? '#1f212b' : '#fefffe');

  return (
    <div
      key={element.id}
      className="icon-bin-type"
      style={{
        position: 'absolute',
        left: `${scaledX}px`,
        top: `${scaledY}px`,
        // width: `${scaledWidth}px`,
        // height: `${scaledHeight}px`,
      }}
    >
      {element.elementType === ElementGrainBinType.DOOR ? (
        <DoorIcon color={getIconColor(theme)} />
      ) : (
        <LadderIcon color={getIconColor(theme)} />
      )}
    </div>
  );
};

export default ElementGrainBin;
