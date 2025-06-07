import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { Area } from '../Area';
import { ColumnSensors } from '../ColumnSensors';
import { Grain } from '../Grain';
import { points, points1, points2, points3, points4 } from '../Helpers/getPoints';
import { calculateColumnSensorsPosition, getColumnSensorsHeight, radii, silosParams } from '../Helpers/getSilosParams';
import { Silos } from '../Silos';

import { Canvas } from '@react-three/fiber';
import { Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';
import { useSearchParams } from 'react-router-dom';
import { RefreshIcon } from '../../../../../GrainBinMap/components/icons';
import ButtonCustom from '../../../../../../sharedComponents/ButtonCustom';

export const Scene = ({
  grainBin,
  thermalSuspension,
  silosVisible,
  grainVisible,
  termSuspVisible,
  areaVisible,
  silosOpacity,
  grainOpacity,
  handleResetAll,
}: {
  grainBin: any;
  thermalSuspension: any[];
  silosVisible: boolean;
  grainVisible: boolean;
  termSuspVisible: boolean;
  areaVisible: boolean;
  silosOpacity: number;
  grainOpacity: number;
  handleResetAll: () => void;
}) => {
  const cameraPosition = new Vector3(30, 0, 30);
  const spotLightPosition = new Vector3(80, 80, 80);

  // @ts-ignore
  const controlsRef = useRef<any>();

  const silosDataParams = silosParams;

  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSuspension, setActiveSuspension] = useState<number | 'full'>('full');

  let activeSusspentions: any[] = [];
  if (activeSuspension !== 'full') {
    if (activeSuspension > thermalSuspension.length) {
      activeSusspentions = thermalSuspension;
    } else activeSusspentions = thermalSuspension;
  } else activeSusspentions = thermalSuspension;

  const handleBackgroundClick = () => {
    searchParams.set('suspension', 'full');
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const activeSuspension = searchParams.get('suspension');
    if (activeSuspension === 'full') {
      setActiveSuspension(activeSuspension);
    } else { // @ts-ignore
      setActiveSuspension(+activeSuspension);
    }
  }, [searchParams]);

  const handleReset = () => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
    handleResetAll();
    searchParams.set('suspension', 'full');
    searchParams.set('sensor', 'full');
    setSearchParams(searchParams);
  };

  return (
    <>
      <Canvas
        style={{
          width: '100%',
          height: '100%',
        }}
        // onClick={handleBackgroundClick}
        camera={{ position: cameraPosition }}
      >
        <ambientLight intensity={1} />
        <spotLight position={spotLightPosition} intensity={1} />
        {silosVisible && (
          <Silos
            position={silosDataParams.position as [x: number, y: number, z: number]}
            width={silosDataParams.width}
            height={silosDataParams.height}
            transparent
            opacity={silosOpacity / 100}
          />
        )}

        {grainVisible && (
          <>
            <Grain
              points={points([0, 0, 0], silosParams.width - 0.1, silosParams.width - 0.1)}
              color="yellow"
              transparent
              opacity={grainOpacity / 100}
            />
            {/* <Grain points={points1} color="yellow" />
          <Grain points={points2} color="yellow" />
          <Grain points={points3} color="yellow" />
          <Grain points={points4} color="yellow" /> */}
          </>
        )}

        {termSuspVisible &&
          activeSusspentions.map((suspension: any, index: number) => {
            const suspensionPosition = suspension.position as -1 | 0 | 1 | 2;
            let sensors = [];
            let h = 0;

            // @ts-ignore
            if (searchParams.get('suspension') === 'full' || suspension.id === +searchParams.get('suspension')) {
              sensors = suspension.sensors;
              h = getColumnSensorsHeight(suspensionPosition);
            }

            return (
              <ColumnSensors
                key={suspension.displayName}
                position={
                  calculateColumnSensorsPosition(
                    [0, 0, 0],
                    radii(grainBin.grainBin.circles)[suspensionPosition],
                    suspension.theta,
                    suspensionPosition
                  ) as [x: number, y: number, z: number]
                }
                sensorsHeight={h}
                sensorsData={sensors}
                name={suspension.id}
                active={activeSuspension}
                handleActiveSuspension={e => {
                  e.stopPropagation(); // @ts-ignore
                  if (+searchParams.get('suspension') === suspension.id) {
                    searchParams.set('suspension', 'full');
                    searchParams.set('sensor', 'full');
                    setSearchParams(searchParams);
                  } else {
                    searchParams.set('suspension', suspension.id);
                    searchParams.set('sensor', 'full');
                    setSearchParams(searchParams);
                  }
                }}
              />
            );
          })}

        {areaVisible && <Area position={[0, 0, 0]} width={silosDataParams.width} height={1.6} color="red" />}

        <OrbitControls
          ref={controlsRef}
          minDistance={10}
          maxDistance={80}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={(0.99 * Math.PI) / 2}
          enablePan={false}
        />
      </Canvas>
      <ButtonCustom variant="filled" buttonClass="refresh-button" onClick={handleReset}>
        <RefreshIcon />
      </ButtonCustom>
    </>
  );
};
