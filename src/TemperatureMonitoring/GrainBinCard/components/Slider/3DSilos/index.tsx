import React, { useRef, useState, useEffect } from 'react';
import { Scene } from './Scene';
import { SliderSilos } from '../SliderSilos';
import CustomSwitch from '../../../../../sharedComponents/CustomSwitch';
import CustomSlider from '../../../../../sharedComponents/CustomSlider';

export const Silos3D = ({ grainBin, thermalSuspension }: { grainBin: any; thermalSuspension: any[] }) => {
  const containerRef = useRef<null>(null);

  const [silosVisible, setSilosVisible] = useState(true);
  const [grainVisible, setGrainVisible] = useState(true);
  const [termSuspVisible, setTermSuspVisible] = useState(true);
  const [areaVisible, setAreaVisible] = useState(true);

  const [silosOpacity, setSilosOpacity] = useState(15);
  const [grainOpacity, setGrainOpacity] = useState(20);

  const handleResetAll = () => {
    setSilosVisible(true);
    setGrainVisible(true);
    setTermSuspVisible(true);
    setAreaVisible(true);
    setSilosOpacity(15);
    setGrainOpacity(20);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: '5%',
        width: '100%',
        height: '100%',
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          width: '65%',
          height: '100%',
        }}
      >
        <Scene
          grainBin={grainBin}
          thermalSuspension={thermalSuspension}
          silosVisible={silosVisible}
          grainVisible={grainVisible}
          termSuspVisible={termSuspVisible}
          areaVisible={areaVisible}
          silosOpacity={silosOpacity}
          grainOpacity={grainOpacity}
          handleResetAll={handleResetAll}
        />
        <div style={{ fontSize: '24px', fontWeight: '700', color: 'white' }}>{grainBin.grainBin.displayName}</div>
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: '16px',
          height: '100%',
          width: '30%',
          justifyContent: 'space-evenly',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <CustomSwitch name="Силос" visible={silosVisible} setVisible={() => setSilosVisible(!silosVisible)} />
          <CustomSwitch name="Зерно" visible={grainVisible} setVisible={() => setGrainVisible(!grainVisible)} />
          <CustomSwitch name="Підвіски" visible={termSuspVisible} setVisible={() => setTermSuspVisible(!termSuspVisible)} />
          <CustomSwitch name="Область" visible={areaVisible} setVisible={() => setAreaVisible(!areaVisible)} />
        </div>
        <div
          style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingRight: '15px', marginBottom: '32px', maxWidth: '260px' }}
        >
          <CustomSlider name="Прозорість силоса:" min={5} max={100} silosOpacity={silosOpacity} setSilosOpacity={setSilosOpacity} />
          <CustomSlider name="Прозорість зерна:" min={5} max={100} silosOpacity={grainOpacity} setSilosOpacity={setGrainOpacity} />
        </div>

        <div ref={containerRef} style={{ height: '40%', width: 'auto', marginBottom: '79px', maxHeight: '50%' }}>
          {/*@ts-ignore*/}
          <SliderSilos grainBin={grainBin} thermalSuspension={grainBin.thermalSuspensions} containerRef={containerRef} isActive />
        </div>
      </div>
    </div>
  );
};
