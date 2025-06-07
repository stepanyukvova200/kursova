import { Html } from '@react-three/drei';
import React, { FC, useEffect, useState } from 'react';
import { Sensor } from '../Sensor';
import { useSearchParams } from 'react-router-dom';

export interface SensorData {
  id: number;
  currentTemp: string;
  currentTempColor: string;
  height: number;
}

interface ColumnSensorsProps {
  position: [x: number, y: number, z: number];
  sensorsHeight: number;
  sensorsData: SensorData[];
  name: string;
  transparent?: boolean;
  opacity?: number;
  active: number | 'full';
  handleActiveSuspension: (e: any) => void;
}

const ColumnSensorsName = ({
  position,
  sensorsHeight,
  name,
  active,
  handleActiveSuspension,
}: {
  position: [x: number, y: number, z: number];
  sensorsHeight: number;
  name: string;
  active: number | 'full';
  handleActiveSuspension: (e: any) => void;
}) => (
  <Html
    distanceFactor={70}
    position={[0, 21, 0]}
    style={{
      userSelect: 'none',
      cursor: 'pointer',
    }}
  >
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        border: `${active === name ? '1px solid white' : 'none'}`,
        // width: '100%',
        // height: '30%',
        // marginTop: '-7px',
        // padding: '2px',
      }}
      onClick={handleActiveSuspension}
    >
      {name}
    </div>
  </Html>
);

export const ColumnSensors: FC<ColumnSensorsProps> = ({
  position,
  sensorsHeight,
  sensorsData,
  name,
  transparent,
  opacity,
  active,
  handleActiveSuspension,
}) => {
  const suspensionWidth = 0.01;

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSensor, setActiveSensor] = useState<number | 'full'>('full');

  useEffect(() => {
    const activeSensor = searchParams.get('sensor');
    if (activeSensor === 'full') {
      setActiveSensor(activeSensor);
    } else { // @ts-ignore
      setActiveSensor(+activeSensor);
    }
  }, [searchParams]);

  return (
    <>
      <mesh position={[position[0], position[1], position[2]]}>
        <cylinderGeometry args={[suspensionWidth, suspensionWidth, sensorsHeight, 32]} />
        <meshStandardMaterial color="black" />

        <ColumnSensorsName
          sensorsHeight={sensorsHeight}
          position={position}
          name={name}
          active={active}
          handleActiveSuspension={handleActiveSuspension}
        />
      </mesh>
      {sensorsData.map(value => (
        <Sensor
          key={value.id}
          sensorId={value.id}
          position={[position[0], -sensorsHeight / 2 + ((value.id + 1) * sensorsHeight) / sensorsData.length + position[1], position[2]]}
          currentTemp={value.currentTemp}
          currentTempColor={value.currentTempColor}
          radius={0.4}
          active={activeSensor}
          handleActiveSesnsor={e => {
            e.stopPropagation();

            if (searchParams.get('suspension') !== 'full') { // @ts-ignore
              if (+searchParams.get('sensor') === value.id) {
                searchParams.set('sensor', 'full');
                setSearchParams(searchParams);
              } else {
                searchParams.set('sensor', value.id.toString());
                setSearchParams(searchParams);
              }
            }
          }}
        />
      ))}
    </>
  );
};
