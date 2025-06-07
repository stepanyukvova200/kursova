import React, { useRef, useState, useEffect } from 'react';
import 'swiper/css';
import { SliderHull } from './hull';
import { TableHull } from './TableHull';
import { SliderSilos } from './SliderSilos';
import { TableSilos } from './TableSilos';
import './slider.scss';

import { data } from '../../../../sharedComponents/getGrainBin';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import { useLocation, useSearchParams } from 'react-router-dom';
import { ROUTERS } from '../../../../sharedComponents/constants/routers';
import { useDispatch } from 'react-redux';
import { setGrainBin } from '../../../../redux/reducers/grainBin/actions';
import { Silos3D } from './3DSilos';

const Slider = () => {
  const sliderRef = useRef<SwiperRef>(null);
  const containerRef = useRef<null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSuspension, setActiveSuspension] = useState<string | null>(null);
  const [swiperKey, setSwiperKey] = useState(0);

  const { pathname } = useLocation();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [startSilosIndex, setStartSilosIndex] = useState<number | null>(null);
  const currentView = searchParams.get('viewType');

  useEffect(() => {
    if (!currentView) {
      setSearchParams(prev => {
        const newParams = new URLSearchParams(prev);
        newParams.set('viewType', '2d');
        return newParams;
      });
    }
  }, [currentView, setSearchParams]);

  const getSlidesPerView = () => (pathname === ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD && currentView === '2d' ? 3 : 1);

  const nextSlide = () => {
    if (sliderRef.current) {
      const { swiper } = sliderRef.current;
      swiper.slideNext();
    }
  };

  const prevSlide = () => {
    if (sliderRef.current) {
      const { swiper } = sliderRef.current;
      swiper.slidePrev();
    }
  };

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.swiper.update(); // Примусове оновлення
    }
  }, [pathname, currentView]);

  useEffect(() => {
    setSwiperKey(prevKey => prevKey + 1);
  }, [pathname, currentView]);

  const circlesData = data.filter(grainBin => grainBin.grainBin.binType === 'CIRCLE');
  const rectangleData = data.filter(grainBin => grainBin.grainBin.binType === 'RECTANGLE');

  useEffect(() => {
    // @ts-ignore
    const index = +searchParams.get('silos');
    if (index) {
      setStartSilosIndex(index);
    } else {
      setStartSilosIndex(1);
      searchParams.set('silos', '1');
      setSearchParams(searchParams);
    }

    const suspensionSearch = searchParams.get('suspension');
    if (!suspensionSearch) {
      searchParams.set('suspension', 'full');
      setSearchParams(searchParams);
    }

    if (pathname === ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD) {
      dispatch(setGrainBin(circlesData[index - 1]));
    } else {
      dispatch(setGrainBin(rectangleData[index - 1]));
    }
  }, []);

  useEffect(() => {
    if (!startSilosIndex) return; // Переконатимь, що `silos` є в URL
    if (activeIndex + 1 === Number(searchParams.get('silos'))) return; // Не оновлювати, якщо вже правильний

    searchParams.set('silos', (activeIndex + 1).toString());
    setSearchParams(searchParams);
    searchParams.set('suspension', 'full');
    setSearchParams(searchParams);
    searchParams.delete('sensor');
    setSearchParams(searchParams);

    if (pathname === ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD) {
      dispatch(setGrainBin(circlesData[activeIndex]));
    } else {
      dispatch(setGrainBin(rectangleData[activeIndex]));
    }
  }, [activeIndex]);

  return (
    <>
      <div className="slider__arrow-inner" onClick={prevSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none" className="prevBtn">
          <path
            d="M-3.68924e-07 8.50531C-3.5144e-07 8.90531 0.159999 9.28531 0.439999 9.56531L7.42 16.5053C7.7 16.8053 8.08 16.9453 8.46 16.9453C8.86 16.9453 9.24 16.8053 9.54 16.5053C10.12 15.9053 10.12 14.9653 9.52 14.3853L3.62 8.50531L9.52 2.62531C10.12 2.04531 10.12 1.08531 9.54 0.505313C8.94 -0.0946869 8 -0.0946869 7.42 0.505314L0.439999 7.44531C0.159999 7.72531 -3.86409e-07 8.10531 -3.68924e-07 8.50531Z"
            fill="#B5B5B5"
          />
        </svg>
      </div>

      {startSilosIndex !== null && (
        <Swiper
          key={swiperKey}
          // @ts-ignore
          onSlideChange={swiper => {
            setActiveIndex(swiper.realIndex);
          }}
          ref={sliderRef}
          slidesPerView={getSlidesPerView()}
          spaceBetween={0}
          initialSlide={startSilosIndex - 1}
          loop
          rewind
          simulateTouch={false}
          className={`slider__container ${getSlidesPerView() === 3 ? 'for2d' : ''}`}
          breakpoints={{
            320: { slidesPerView: getSlidesPerView() },
            768: { slidesPerView: getSlidesPerView() },
            1440: { slidesPerView: getSlidesPerView() },
          }}
          centeredSlides
        >
          {pathname === ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD
            ? circlesData.map((grainBin, index) => (
                <SwiperSlide key={grainBin.grainBin.name}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      ref={containerRef}
                      className="slider__slide__content"
                      style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {currentView === 'table' && <TableSilos grainBin={grainBin} isActive={activeIndex === index} />}
                      {currentView === '2d' && (
                        <>
                          <SliderSilos
                            grainBin={grainBin}
                            thermalSuspension={grainBin.thermalSuspensions}
                            isActive={activeIndex === index}
                            // @ts-ignore
                            containerRef={containerRef}
                          />
                          <h4>{grainBin.grainBin.name}</h4>
                        </>
                      )}
                      {currentView === '3d' && <Silos3D grainBin={grainBin} thermalSuspension={grainBin.thermalSuspensions} />}
                    </div>
                  </div>
                </SwiperSlide>
              ))
            : rectangleData.map((grainBin, index) => (
                <SwiperSlide key={grainBin.grainBin.name}>
                  <div
                    style={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <div
                      style={{
                        width: '100%',
                        height: '100%',
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {currentView === 'table' && pathname === ROUTERS.THERMOMETRY_TEMPERATURE_HULLCARD && (
                        <TableHull
                          grainBin={grainBin}
                          thermalSuspension={grainBin.thermalSuspensions}
                          activeSuspension={activeIndex === index ? activeSuspension : null}
                          setActiveSuspension={activeIndex === index ? setActiveSuspension : () => null}
                          isActive={activeIndex === index}
                        />
                      )}
                      {currentView === '2d' && pathname === ROUTERS.THERMOMETRY_TEMPERATURE_HULLCARD && (
                        <SliderHull
                          grainBin={grainBin}
                          thermalSuspension={grainBin.thermalSuspensions}
                          activeSuspension={activeIndex === index ? activeSuspension : null}
                          setActiveSuspension={activeIndex === index ? setActiveSuspension : () => null}
                          isActive={activeIndex === index}
                        />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
        </Swiper>
      )}

      <div className="slider__arrow-inner right" onClick={nextSlide}>
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none" className="nextBtn">
          <path
            d="M10 8.49518C10 8.09518 9.84 7.71518 9.56 7.43518L2.58 0.495175C2.3 0.195175 1.92 0.0551754 1.54 0.0551754C1.14 0.0551754 0.760001 0.195175 0.460001 0.495175C-0.119999 1.09517 -0.120001 2.03517 0.479999 2.61517L6.38 8.49518L0.479999 14.3752C-0.120001 14.9552 -0.12 15.9152 0.46 16.4952C1.06 17.0952 2 17.0952 2.58 16.4952L9.56 9.55517C9.84 9.27518 10 8.89517 10 8.49518Z"
            fill="#B5B5B5"
          />
        </svg>
      </div>
    </>
  );
};

export default Slider;
