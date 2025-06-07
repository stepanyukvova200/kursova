import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

const calculateCoordinates = (x0: number, y0: number, r: number, theta: number) => {
  const thetaRadians = (theta * Math.PI) / 180;
  const x = x0 + r * Math.cos(thetaRadians);
  const y = y0 + r * Math.sin(thetaRadians);
  return { x, y };
};

export const SliderSilos = ({
  grainBin,
  thermalSuspension,
  isActive,
  containerRef,
}: {
  grainBin: any;
  thermalSuspension: any[];
  isActive: boolean;
  containerRef: React.RefObject<HTMLDivElement>;
}) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSuspension, setActiveSuspension] = useState<number | 'full'>('full');

  useEffect(() => {
    if (!containerRef) return undefined;

    const observer = new ResizeObserver(entries => {
      const { width, height } = entries[0].contentRect;
      setContainerHeight(height);
      setContainerWidth(width);
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  if (!thermalSuspension) return null;
  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const baseRadius = Math.min(centerX, centerY) / 4;


  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (isActive) {
      const maxSizeCoef = 1.3;
      let sizeCoef = containerHeight / (baseRadius * 8 + 75);
      sizeCoef = Math.min(sizeCoef, maxSizeCoef);

      document.documentElement.style.setProperty('--swiper-active-scale', sizeCoef.toString());
    }
  }, [baseRadius, containerHeight, containerWidth]);

  const countCircles = grainBin.grainBin.circles;
  const baseLevels = Array.from({ length: countCircles }, (_, i) => i);
  const constantaForRadiuses = 4 / (countCircles + 1);
  // Define radii for each position level
  const radii = {
    '-1': 0.01,
    ...Object.fromEntries(baseLevels.map(level => [level, baseRadius * (level + 1) * constantaForRadiuses])),
    external: baseRadius * 4, // External circle
  };

  // Handle click outside suspensions
  const handleBackgroundClick = () => {
    searchParams.set('sensor', 'full');
    searchParams.set('suspension', 'full');
    setSearchParams(searchParams);
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const activeSuspension = searchParams.get('suspension');
    if (activeSuspension === 'full') {
      setActiveSuspension(activeSuspension);
    } else { // @ts-ignore
      setActiveSuspension(+activeSuspension);
    }
  }, [searchParams]);

  return (
    <div
      style={{
        boxSizing: 'border-box',
        position: 'relative',
        width: baseRadius * 8,
        height: baseRadius * 8,
        borderRadius: '50%',
        border: `5px solid ${activeSuspension !== 'full' ? 'gray' : 'black'}`,
        background: '#e7e7e760',
        margin: '0 auto',
        alignSelf: 'center',
        justifySelf: 'center',
      }}
      onClick={handleBackgroundClick}
    >
      {/* Circles */}
      {Object.entries(radii).map(
        ([key, radius]) =>
          key !== 'external' && (
            <div
              key={key}
              style={{
                position: 'absolute',
                width: radius * 2,
                height: radius * 2,
                borderRadius: '50%',
                border: '1px solid gray',
                background: 'transparent',
                top: (baseRadius * 8) / 2 - radius,
                left: (baseRadius * 8) / 2 - radius,
              }}
            />
          )
      )}

      {/* Thermal suspensions */}
      {thermalSuspension.map((suspension: any, index: number) => {
        if (!suspension.enabledUI) return null; // Skip disabled suspensions

        // @ts-ignore
        const suspensionRadius = radii[suspension.position] || radii.external;

        // Calculate position on the circle
        const { x, y } = calculateCoordinates(baseRadius * 8, baseRadius * 8, suspensionRadius, suspension.theta);

        return (
          <div
            key={`${grainBin.grainBin.id}-${suspension.id}-${index}`}
            style={{
              position: 'absolute',
              top: y - radii.external - radii.external / 10,
              left: x - radii.external - radii.external / 10,
              width: (radii.external / 10) * 2,
              height: (radii.external / 10) * 2,
              borderRadius: '50%',
              background: suspension.color, // @ts-ignore
              boxShadow: `0px 0px ${(radii.external / 10) * 2}px ${radii['0'] / 6}px ${suspension.color}`,
              border: activeSuspension === suspension.id ? '2px solid #000000' : 'none',
              cursor: 'pointer',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={e => {
              e.stopPropagation();
              searchParams.set('suspension', suspension.id);
              searchParams.set('sensor', 'full');
              setSearchParams(searchParams);
            }}
          >
            <div
              style={{
                color: '#fff',
                fontSize: '0.5rem',
                textAlign: 'center',
              }}
            >
              <div>{suspension.displayName}</div>
              <div>
                {suspension.deltaTemperature}/{suspension.currentTemperature}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
