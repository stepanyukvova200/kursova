import React, { useEffect, useState, useRef } from 'react';
import './style.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { useSearchParams } from 'react-router-dom';

export const TableSilos = ({ grainBin, isActive }: { grainBin: any; isActive: boolean }) => {
  const [activeSensor, setActiveSensor] = useState(-1);
  const [isChangedSuspension, setIsChangedSuspension] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSuspension, setActiveSuspension] = useState<number | 'full'>('full');
  const framesContainerRef = useRef<HTMLElement | null>(null);

  // Handle click outside suspensions
  const handleBackgroundClick = () => {
    searchParams.set('suspension', 'full');
    setSearchParams(searchParams);
  };

  const suspensions = grainBin.thermalSuspensions; // @ts-ignore
  const maxSensors = Math.max(...grainBin.thermalSuspensions.map(suspension => suspension.sensors.length));

  const forceRepaintActiveSlide = () => {
    const activeSlide = document.querySelector<HTMLElement>('.swiper-slide-active');
    if (activeSlide) {
      activeSlide.style.width = `${activeSlide.offsetWidth + 1}px`; // Змінюємо ширину на +1px
      setTimeout(() => {
        activeSlide.style.width = ''; // Повертаємо назад
      }, 0);
    }
  };

  useEffect(() => {
    forceRepaintActiveSlide();
  }, [isActive]);

  useEffect(() => {
    const activeSuspension = searchParams.get('suspension');
    if (activeSuspension === 'full') {
      setActiveSuspension(activeSuspension);
    } else { // @ts-ignore
      setActiveSuspension(+activeSuspension);
    }

    const activeSensor = searchParams.get('sensor');
    if (activeSensor) {
      setActiveSensor(+activeSensor);
    } else {
      setActiveSensor(-1);
    }
  }, [searchParams]);

  const updateFramesHeight = () => {
    const parentElements = document.querySelectorAll<HTMLElement>(`.find-${grainBin.grainBin.id}`);
    framesContainerRef.current = document.querySelector<HTMLElement>('.table-silos-main-hull');
    if (!framesContainerRef.current) return; // перевірка, щоб уникнути помилки

    parentElements.forEach(parentElement => { // @ts-ignore
      const calculatedHeight = framesContainerRef.current.offsetHeight / maxSensors; // @ts-ignore
      const calculateWidth = (framesContainerRef.current.offsetWidth - 50) / (suspensions.length + 1) - 4;
      const targetElements = parentElement.querySelectorAll<HTMLElement>('.table-silos-frame');
      const targetHeaderElements = parentElement.querySelectorAll<HTMLElement>('.table-silos-header-frame');

      targetElements.forEach(targetElement => {
        targetElement.style.height = `${calculatedHeight}px`;
        targetElement.style.width = `${calculateWidth}px`;
      });

      targetHeaderElements.forEach(targetElement => {
        targetElement.style.height = `${calculatedHeight}px`;
        targetElement.style.width = `${calculateWidth}px`;
      });
    });
  };

  useEffect(() => {
    updateFramesHeight();

    const observer = new ResizeObserver(updateFramesHeight);
    if (framesContainerRef.current) {
      observer.observe(framesContainerRef.current);
    }

    return () => observer.disconnect();
  }, [isActive, grainBin.thermalSuspensions]);

  return (
    <div className="table-silos-main-hull" onClick={handleBackgroundClick}>
      <div className="table-silos-hull-header">
        <div className="table-silos-contest">{grainBin.grainBin.name}</div>
      </div>
      <SimpleBar className="table-silos-container-group">
        <div className="table-silos-container-info">
          <div
            className={`table-silos-frames-container find-${grainBin.grainBin.id}`}
            style={{ gridTemplateColumns: `repeat(${suspensions.length}, 1fr)`, gridTemplateRows: `repeat(${maxSensors + 1}, 1fr)` }}
          >
            {/* Перший рядок - заголовки колонок */}
            <div className="table-silos-header-frame">Датчики</div>
            {Array.from({ length: maxSensors }).map((_, index) => (
              <div key={`row-${index}`} className="table-silos-header-frame">
                {index + 1}
              </div>
            ))}

            {/* Основна таблиця */} {/*@ts-ignore*/}
            {suspensions.map((suspension, index) => (
              <>
                {/* Перший стовпець - заголовки рядків */}
                <div key={`column-${index}`} className="table-silos-header-column-frame">
                  {suspension.displayName}
                </div>

                {/* Дані в таблиці (по 10 на рядок) */} {/*@ts-ignore*/}
                {suspension.sensors.map(sensor => (
                  <div
                    key={`${suspension.displayName}${sensor.id}`}
                    className="table-silos-frame"
                    style={{
                      backgroundColor: sensor.currentTempColor,
                      border: sensor.id === activeSensor && activeSuspension === suspension.id ? '4px solid var(--color-black)' : 'none',
                    }}
                    onClick={e => {
                      setIsChangedSuspension(activeSuspension !== suspension.id);
                      e.stopPropagation();
                      searchParams.set('suspension', suspension.id);
                      setSearchParams(searchParams);
                      searchParams.set('sensor', sensor.id);
                      setSearchParams(searchParams);
                    }}
                  >
                    <div className="table-silos-frame-contest">{`${sensor.deltaTemp} / ${sensor.currentTemp}`}</div>
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </SimpleBar>
    </div>
  );
};
