import React, { useContext, useMemo, useRef, useState } from 'react';
import { IGrainBinSections } from '..';
import { CircleBinType } from './components/CircleBinType';
import ElementGrainBin from './components/ElementGrainBin';
import Legend from './components/Legend';
import './style.scss';

import { useResponsiveContainer } from '../../sharedComponents/useResponsiveContainer';
import Loader from '../../sharedComponents/Loader';

// TODO: move to separate files
export enum ElementGrainBinType {
  DOOR = 'door',
  LADDER = 'ladder',
}

export enum GrainBinType {
  CIRCLE = 'circle',
  SQUARE = 'square',
  RECTANGLE = 'rectangle',
}

export interface IGrainBin {
  id: string;
  name: string;
  grainBinType: GrainBinType;
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  radius?: number;
  grainCropsType?: string;
  color: string;
  humidity: number;
  co2: number;
  maxTemperature: number;
  deltaT: number;
  weight: number;
}

export interface IElementGrainBin {
  id: string;
  elementType: ElementGrainBinType;
  xPosition: number;
  yPosition: number;
}

export interface IThermometryLegend {
  color: string;
  name: string;
}

// Helper function to scale positions and sizes
export const scaleValue = (value: number, containerSize: number, screenSize: number) => (value / containerSize) * screenSize;

interface GrainBinMapProps {
  switchTabContent?: (nameOfTab: string, content: React.ReactNode, newLink: string) => void;
  originalContainerWidth: number;
  originalContainerHeight: number;
  sections: IGrainBinSections;
}

const GrainBinMap = ({ switchTabContent, originalContainerWidth, originalContainerHeight, sections }: any) => {
  const theme = 'light';
  const containerRef = useRef<HTMLDivElement>(null);
  const { containerWidth, containerHeight } = useResponsiveContainer({ containerRef });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // TODO: for testing purposes only
  setTimeout(() => {
    setIsLoading(false);
  }, 200);

  const renderGrainBins = useMemo(() => {
    if (!sections?.length) return null;

    // @ts-ignore
    return sections.map(grainBin => {
      const { id, grainBinType = GrainBinType.CIRCLE, xPosition, yPosition, radius } = grainBin;
      const constRadius = radius * 100;
      const scaledX = scaleValue(xPosition, originalContainerWidth, containerWidth);
      const scaledY = scaleValue(yPosition, originalContainerHeight, containerHeight);

      if (grainBinType === GrainBinType.CIRCLE) {
        const scaledRadius = scaleValue(constRadius || 0, originalContainerWidth, containerWidth);

        return (
          <CircleBinType
            key={id}
            grainBin={grainBin}
            scaledRadius={scaledRadius}
            scaledX={scaledX}
            scaledY={scaledY}
            switchTabContent={switchTabContent}
          />
        );
      }

      /* if (grainBinType === GrainBinType.SQUARE || grainBinType === GrainBinType.RECTANGLE) {
        const scaledWidth = scaleValue(width || 0, originalContainerWidth, containerWidth);
        const scaledHeight =
          grainBinType === GrainBinType.SQUARE ? scaledWidth : scaleValue(height || 0, originalContainerHeight, containerHeight);

        return (
          <SquareBinType
            key={id}
            grainBin={grainBin}
            scaledWidth={scaledWidth}
            scaledHeight={scaledHeight}
            scaledX={scaledX}
            scaledY={scaledY}
            switchTabContent={switchTabContent}
          />
        );
      } */

      return null;
    });
  }, [sections.grainBins, containerWidth, containerHeight]);

  const renderElementGrainBins = useMemo(() => {
    if (!sections.elementGrainBins?.length) return null;

    // @ts-ignore
    return sections.elementGrainBins.map(elementGrainBin => {
      const scaledX = scaleValue(elementGrainBin.xPosition, originalContainerWidth, containerWidth);
      const scaledY = scaleValue(elementGrainBin.yPosition, originalContainerHeight, containerHeight);

      return <ElementGrainBin key={elementGrainBin.id} element={elementGrainBin} scaledX={scaledX} scaledY={scaledY} theme={theme} />;
    });
  }, [sections.elementGrainBins, containerWidth, containerHeight]);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div ref={containerRef} className="bin-map__container">
        {isLoading ? (
          <Loader />
        ) : (
          <div>
            {renderGrainBins}
            {renderElementGrainBins}
          </div>
        )}
      </div>

      {sections?.thermometryLegends && <Legend legend={sections.thermometryLegends} />}
    </div>
  );
};

export default GrainBinMap;
