import React, { useRef } from 'react';
import 'swiper/css';
import 'swiper/swiper-bundle.css';
import './customSwiper.scss';

import clsx from 'clsx';
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from 'swiper/react';

interface CustomSwiperProps extends SwiperProps {
  slides: React.ReactNode[];
  loop?: boolean;
  pagination?: boolean;
  navigation?: boolean;
  autoplay?: boolean;
  customClasses?: string;
  breakpoints?: any;
}

const CustomSwiper: React.FC<CustomSwiperProps> = ({
  slides,
  loop = true,
  pagination = true,
  navigation = true,
  autoplay = false,
  customClasses = '',
  breakpoints,
  ...swiperProps
}) => {
  const sliderRef = useRef<SwiperRef>(null);

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

  return (
    <div className="inner__slider">
      <Swiper
        ref={sliderRef}
        loop={loop}
        pagination={pagination ? { clickable: true } : false}
        navigation={navigation}
        autoplay={autoplay ? { delay: 3000 } : false}
        className={clsx('swiper__default', customClasses)}
        breakpoints={breakpoints}
        slidesPerView="auto"
        {...swiperProps}
      >
        {slides.map((slideContent, index) => (
          <SwiperSlide key={index}>{slideContent}</SwiperSlide>
        ))}
      </Swiper>
      <button onClick={prevSlide} className="custom__arrow">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none" className="prevBtn">
          <path
            d="M-3.68924e-07 8.50531C-3.5144e-07 8.90531 0.159999 9.28531 0.439999 9.56531L7.42 16.5053C7.7 16.8053 8.08 16.9453 8.46 16.9453C8.86 16.9453 9.24 16.8053 9.54 16.5053C10.12 15.9053 10.12 14.9653 9.52 14.3853L3.62 8.50531L9.52 2.62531C10.12 2.04531 10.12 1.08531 9.54 0.505313C8.94 -0.0946869 8 -0.0946869 7.42 0.505314L0.439999 7.44531C0.159999 7.72531 -3.86409e-07 8.10531 -3.68924e-07 8.50531Z"
            fill="#B5B5B5"
          />
        </svg>
      </button>
      <button onClick={nextSlide} className="custom__arrow right">
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17" fill="none" className="nextBtn">
          <path
            d="M10 8.49518C10 8.09518 9.84 7.71518 9.56 7.43518L2.58 0.495175C2.3 0.195175 1.92 0.0551754 1.54 0.0551754C1.14 0.0551754 0.760001 0.195175 0.460001 0.495175C-0.119999 1.09517 -0.120001 2.03517 0.479999 2.61517L6.38 8.49518L0.479999 14.3752C-0.120001 14.9552 -0.12 15.9152 0.46 16.4952C1.06 17.0952 2 17.0952 2.58 16.4952L9.56 9.55517C9.84 9.27518 10 8.89517 10 8.49518Z"
            fill="#B5B5B5"
          />
        </svg>
      </button>
    </div>
  );
};

export default CustomSwiper;
