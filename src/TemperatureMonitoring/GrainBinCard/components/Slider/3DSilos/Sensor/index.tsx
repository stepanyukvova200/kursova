import React, { FC, useState } from 'react';

import { Html } from '@react-three/drei';
import { useSearchParams } from 'react-router-dom';

interface SensorsProps {
  sensorId: number;
  position: [x: number, y: number, z: number];
  radius: number;
  currentTemp: string;
  currentTempColor: string;
  transparent?: boolean;
  opacity?: number;
  active: number | 'full';
  handleActiveSesnsor: (e: any) => void;
}

const SensorsTemp = ({ temp, active, sensorId }: { temp: string; active: number | 'full'; sensorId: number }) => (
  <Html
    distanceFactor={active === sensorId ? 60 : 40}
    position={[0, 0, 0]}
    style={{
      userSelect: 'none',
      cursor: 'pointer',
      pointerEvents: 'none',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: '0%',
        height: '0%',
        marginTop: '-9px',
        color: `${active === sensorId ? 'white' : '#ffffffbc'}`,
      }}
    >
      {(+temp).toFixed(1)}
    </div>
  </Html>
);

export const Sensor: FC<SensorsProps> = ({
  sensorId,
  position,
  radius,
  currentTemp,
  currentTempColor,
  transparent,
  opacity,
  active,
  handleActiveSesnsor,
}) => {
  const r = active === sensorId ? radius * 2 : radius;

  return (
    <mesh position={position} onClick={handleActiveSesnsor}>
      <sphereGeometry args={[r, 32, 32]} />
      <meshStandardMaterial color={currentTempColor} />
      <SensorsTemp temp={currentTemp} active={active} sensorId={sensorId} />
    </mesh>
  );
};
