import React from 'react';

const calculateCoordinates = (x0: number, y0: number, r: number, theta: number) => {
  const thetaRadians = (theta * Math.PI) / 180;
  const x = x0 + r * Math.cos(thetaRadians);
  const y = y0 + r * Math.sin(thetaRadians);
  return { x, y };
};

// @ts-ignore
export const SliderItem = ({ containerWidth, containerHeight, thermalSuspension, activeSuspension, setActiveSuspension, isActive }) => {
  if (!thermalSuspension) return null;

  const centerX = containerWidth / 2;
  const centerY = containerHeight / 2;
  const baseRadius = Math.min(centerX, centerY) / 4;

  // Define radii for each position level
  const radii = {
    0: baseRadius,
    1: baseRadius * 2,
    2: baseRadius * 3,
    external: baseRadius * 4, // External circle
  };

  // Handle click outside suspensions
  const handleSvgClick = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    if (e.target instanceof SVGCircleElement && e.target.dataset.type === 'suspension') {
      return;
    }
    setActiveSuspension(null); // Reset active state to external
  };

  // console.log(activeSuspension);

  return (
    <svg viewBox={`0 0 ${containerWidth} ${containerHeight}`} onClick={handleSvgClick}>
      {Object.entries(radii).map(([key, radius]) => (
        <circle
          key={key}
          cx={centerX}
          cy={centerY}
          r={radius}
          fill={key === 'external' ? '#e7e7e760' : 'none'}
          // eslint-disable-next-line no-nested-ternary
          stroke={key === 'external' ? (activeSuspension === null && isActive ? '#000000' : '#aaa') : '#328624'} // TODO: fix nested ternary
          strokeWidth={key === 'external' ? 3 : 1}
          strokeDasharray={key === 'external' ? 'none' : '110,11'} // Dashed for external
        />
      ))}

      <defs>
        {/*@ts-ignore*/}
        {thermalSuspension.map(suspension => (
          <filter id={`shadow-${suspension.id}`} key={`filter-${suspension.id}`} x="-50%" y="-50%" width="250%" height="250%">
            <feDropShadow dx="2" dy="2" stdDeviation="20 20" floodColor={suspension.color} />
          </filter>
        ))}
      </defs>

      {thermalSuspension.map((suspension: any, index: number) => {
        if (!suspension.enabledUI) return null; // Skip disabled suspensions

        // @ts-ignore
        const suspensionRadius = radii[suspension.position] || radii.external;

        // Calculate position on the circle
        const { x, y } = calculateCoordinates(centerX, centerY, suspensionRadius, suspension.theta);

        return (
          <g
            key={`${suspension.id}-${index}`}
            onClick={e => {
              e.stopPropagation();
              setActiveSuspension(suspension.id);
            }}
          >
            <circle
              cx={x}
              cy={y}
              r={radii.external / 10}
              fill={suspension.color}
              // strokeWidth={5}
              filter={`url(#shadow-${suspension.id})`}
              stroke={activeSuspension === suspension.id ? '#000000' : 'none'} // Add red stroke to active
              strokeWidth={activeSuspension === suspension.id ? 2 : 0}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            />
            <text x={x - 15} y={y - 5} fontSize="0.625rem" fill="#fff">
              {suspension.displayName}
            </text>
            <text x={x - 18} y={y + 10} fontSize="0.725rem" fill="#fff">
              {suspension.deltaTemperature}/{suspension.currentTemperature}
            </text>
          </g>
        );
      })}
    </svg>
  );
};
