import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGrainBin, setIndexOfActiveSuspension } from '../../../../../redux/reducers/grainBin/slice';
import './style.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useAppSelector } from '../../../../../redux/hooks';

export const SliderHull = ({
  grainBin,
  thermalSuspension,
  activeSuspension,
  setActiveSuspension,
  isActive,
}: {
  grainBin: any;
  thermalSuspension: any[];
  activeSuspension: string | null;
  setActiveSuspension: (id: string | null) => void;
  isActive: boolean;
}) => {
  console.log(thermalSuspension, activeSuspension, isActive);
  console.clear();

  const dispatch = useDispatch();
  const [mode, setMode] = useState<'temperature' | 'plant'>('temperature');
  const [activeFrame, setActiveFrame] = useState(-1);

  const { currentView } = useAppSelector(state => state.cardViewType);

  // Handle click outside suspensions
  const handleBackgroundClick = () => {
    dispatch(setGrainBin(grainBin));
    dispatch(setIndexOfActiveSuspension(0));
    setActiveSuspension(null); // Reset active state to external
  };

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'temperature' ? 'plant' : 'temperature'));
  };

  // Дані для клітинок (імітація API)
  const cells = Array.from({ length: 100 }, (_, index) => {
    let status = 'normal';
    if (index === 10) {
      status = 'warning';
    } else if (index === 20) {
      status = 'error';
    }
    return {
      id: index + 1,
      value: index + 1,
      temp: `${(Math.random() * 3).toFixed(2)}/${(Math.random() * 26).toFixed(2)}°C`,
      status,
    };
  });

  const updateFramesHeight = () => {
    const parentElements = document.querySelectorAll<HTMLElement>('.frames-container');

    parentElements.forEach(parentElement => {
      const calculatedHeight = parentElement.offsetHeight * 0.14;
      const targetElements = parentElement.querySelectorAll<HTMLElement>('.frame');

      targetElements.forEach(targetElement => {
        targetElement.style.height = `${calculatedHeight}px`;
      });
    });
  };

  useEffect(() => {
    updateFramesHeight();
    window.addEventListener('resize', updateFramesHeight);
    return () => {
      window.removeEventListener('resize', updateFramesHeight);
    };
  }, []);

  return (
    <div className="main-hull" onClick={handleBackgroundClick}>
      <div className="hull-header">
        <div className="contest">{grainBin.grainBin.name}</div>
        <div className="changer-container">
          <img src="content/images/icon-temperature.png" alt="Temperature Icon" className="icon" />
          <div className="changer" onClick={toggleMode}>
            <div className={`changer-ball ${mode}`} />
          </div>
          <img src="content/images/icon-plant.png" alt="Plant Icon" className="icon" />
        </div>
      </div>
      <SimpleBar className="container-group">
        {[1, 2, 3].map(value => (
          <div className="container-info">
            <div className="container-contest">
              Силкорпус №{value} {currentView}
            </div>
            <div className="frames-container">
              {cells.map(cell => (
                <div
                  key={cell.id}
                  className={`frame ${cell.status}`}
                  style={{ border: cell.id === activeFrame ? '4px solid var(--color-black)' : 'none' }}
                  onClick={e => {
                    e.stopPropagation();
                    setActiveFrame(cell.id);
                  }}
                >
                  <div className="frame-contest">{cell.value}</div>
                  <div className="frame-temp">{cell.temp}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </SimpleBar>
      {/* Thermal suspensions */}
      {/* {thermalSuspension.map((suspension: any, index: number) => {
        if (!suspension.enabledUI) return null; // Skip disabled suspensions

        return (
          <div
            key={`${suspension.id}-${index}`}
            style={{
            }}
            onClick={(e) => {
              e.stopPropagation();
              dispatch(setGrainBin(grainBin));
              dispatch(setIndexOfActiveSuspension(suspension.id));
              setActiveSuspension(suspension.id);
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
      })} */}
    </div>
  );
};
