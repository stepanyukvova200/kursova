import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setGrainBin, setIndexOfActiveSuspension } from '../../../../../redux/reducers/grainBin/slice';
import './style.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useAppSelector } from '../../../../../redux/hooks';

export const TableHull = ({
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
  const cells = Array.from({ length: 84 }, (_, index) => {
    let status = 'normal';
    if (index === 10) {
      status = 'warning';
    } else if (index === 20) {
      status = 'error';
    }
    return {
      id: index + 1,
      value: '1234',
      temp: '+3/21°C',
      status,
    };
  });

  const updateFramesHeight = () => {
    const parentElements = document.querySelectorAll<HTMLElement>('.table-frames-container');

    parentElements.forEach(parentElement => {
      const calculatedHeight = parentElement.offsetHeight * 0.13;
      const targetElements = parentElement.querySelectorAll<HTMLElement>('.table-frame');
      const targetHeaderElements = parentElement.querySelectorAll<HTMLElement>('.table-header-frame');

      targetElements.forEach(targetElement => {
        targetElement.style.height = `${calculatedHeight}px`;
      });

      targetHeaderElements.forEach(targetElement => {
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
    <div className="table-main-hull" onClick={handleBackgroundClick}>
      <div className="table-hull-header">
        <div className="table-contest">{grainBin.grainBin.name}</div>
        <div className="table-changer-container">
          <img src="content/images/icon-temperature.png" alt="Temperature Icon" className="icon" />
          <div className="changer" onClick={toggleMode}>
            <div className={`changer-ball ${mode}`} />
          </div>
          <img src="content/images/icon-plant.png" alt="Plant Icon" className="icon" />
        </div>
      </div>
      <SimpleBar className="table-container-group">
        {[1, 2, 3].map(value => (
          <div className="table-container-info">
            <div className="table-container-contest">
              Силкорпус №{value} {currentView}
            </div>
            <div className="table-frames-container">
              {/* Рядок заголовків */}
              {Array.from({ length: 7 }).map((_, index) => (
                <div key={`group-${index}`} className="table-header-frame">
                  Группа {index + 1}
                </div>
              ))}

              {/* Основні комірки */}
              {cells.map(cell => (
                <div
                  key={cell.id}
                  className={`table-frame ${cell.status}`}
                  style={{ border: cell.id === activeFrame ? '4px solid var(--color-black)' : 'none' }}
                  onClick={e => {
                    e.stopPropagation();
                    setActiveFrame(cell.id);
                  }}
                >
                  <div className="table-frame-contest">{cell.value}</div>
                  <div className="table-frame-temp">{cell.temp}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </SimpleBar>
    </div>
  );
};
