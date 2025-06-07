import React, { memo, useEffect, useState } from 'react';
import GrainBinMap, { GrainBinType, IElementGrainBin, IGrainBin, IThermometryLegend } from './GrainBinMap';
import './style.scss';

import Tabs, { Tab } from '../sharedComponents/Tabs';
import { ROUTERS } from '../sharedComponents/constants/routers';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IRootState, AppDispatch } from '../redux/store';
import { fetchGrainBins } from '../redux/slices/grainBinsActions';

export interface IGrainBinSections {
  grainBins: IGrainBin[];
  elementGrainBins: IElementGrainBin[];
  thermometryLegends: IThermometryLegend[];
}

const mockContainerProps: {
  width: number;
  height: number;
  sections: IGrainBinSections;
} = {
  width: 1024, // Backend provided width of the container in px
  height: 860, // Backend provided height of the container in px
  sections: {
    grainBins: [
      {
        id: '1',
        name: 'Силос №1',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 0,
        yPosition: 0,
        radius: 90,
        color: '#328624',
        grainCropsType: 'Пшениця 1 кл',
        humidity: 13.5,
        co2: 0.03,
        maxTemperature: 14.5,
        deltaT: 0.3,
        weight: 6553,
        width: 0,
        height: 0,
      },
      {
        id: '2',
        name: 'Силос №2',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 200,
        yPosition: 50,
        radius: 70,
        color: '#328624',
        grainCropsType: 'Пшениця 2 кл',
        humidity: 12.7,
        co2: 0.04,
        maxTemperature: 14.2,
        deltaT: 0.63,
        weight: 7544,
        width: 0.23,
        height: 0,
      },
      {
        id: '3',
        name: 'Силос №3',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 350,
        yPosition: 50,
        radius: 70,
        color: '#328624',
        grainCropsType: 'Пшениця 3 кл',
        humidity: 11.1,
        co2: 0.02,
        maxTemperature: 13.9,
        deltaT: 0.34,
        weight: 4224,
        width: 0,
        height: 0,
      },
      {
        id: '4',
        name: 'Силос №4',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 25,
        yPosition: 400,
        radius: 70,
        color: '#328624',
        grainCropsType: 'Пшениця 4 кл',
        humidity: 14.1,
        co2: 0.04,
        maxTemperature: 13.7,
        deltaT: 0.51,
        weight: 6231,
        width: 0,
        height: 0,
      },
      {
        id: '5',
        name: 'Силос №5',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 200,
        yPosition: 400,
        radius: 70,
        color: '#328624',
        grainCropsType: 'Жито 1 кл',
        humidity: 13.3,
        co2: 0.03,
        maxTemperature: 11.3,
        deltaT: 0.41,
        weight: 2323,
        width: 0,
        height: 0,
      },
      {
        id: '6',
        name: 'Силос №6',
        grainBinType: GrainBinType.CIRCLE,
        xPosition: 350,
        yPosition: 400,
        radius: 70,
        color: '#328624',
        grainCropsType: 'Жито 2 кл',
        humidity: 14.9,
        co2: 0.03,
        maxTemperature: 11.1,
        deltaT: 0.11,
        weight: 2121,
        width: 0,
        height: 0,
      },
      {
        id: '7',
        name: 'Силкорпус №1',
        grainBinType: GrainBinType.RECTANGLE,
        xPosition: 500,
        yPosition: 50,
        width: 275,
        height: 210,
        color: '#328624', // @ts-ignore
        grainCropsType: null,
        humidity: 35,
        co2: 0.3,
        maxTemperature: 35,
        deltaT: 15,
        weight: 300,
      },
      {
        id: '8',
        name: 'Силкорпус №2',
        grainBinType: GrainBinType.RECTANGLE,
        xPosition: 550,
        yPosition: 350,
        width: 150,
        height: 200,
        color: '#328624',
        humidity: 30,
        co2: 0.8,
        maxTemperature: 30,
        deltaT: 10,
        weight: 200,
      },
    ],

    elementGrainBins: [
      /* {
        id: '1',
        elementType: ElementGrainBinType.DOOR,
        xPosition: 180,
        yPosition: 160,
      },
      {
        id: '2',
        elementType: ElementGrainBinType.LADDER,
        xPosition: 200,
        yPosition: 200,
      }, */
    ],
    thermometryLegends: [
      { color: '#FF0000', name: 'Аварійна межа' },
      { color: '#FFC107', name: 'Попереджувальна межа' },
      { color: '#4CAF50', name: 'В межах норми' },
      { color: '#2196F3', name: 'Нижче норми' },
      { color: '#BDBDBD', name: 'Дані відсутні' },
    ],
  },
};

const TemperatureMonitoring = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentData, setCurrentData] = useState<any>();

  const dispatch = useDispatch<AppDispatch>();
  const { data, loading, error } = useSelector((state: IRootState) => state.grainBins);

  useEffect(() => {
    dispatch(fetchGrainBins()); // перший запит при завантаженні компонента

    const interval = setInterval(() => {
      dispatch(fetchGrainBins()); // запит кожні 10 хвилин
    }, 60000); // 600000ms = 10 хвилин

    return () => clearInterval(interval); // очищаємо інтервал при відмонтовані компонента
  }, []);

  useEffect(() => {
    if (loading) {
      console.log('loading AHAHAHA');
      setIsLoading(true);
    } else if (error) {
      console.error(error);
      setIsLoading(false);
    } else if (data) {
      console.log('data', data);
      setIsLoading(false);
      setCurrentData(data);
    }
  }, [loading, error, data]);

  const tabs: Tab[] =
    !isLoading && currentData
      ? [
          {
            name: 'grainBinMap',
            label: '1',
            content: (
              <GrainBinMap
                originalContainerWidth={currentData[0].containerWidth}
                originalContainerHeight={currentData[0].containerHeight}
                sections={currentData}
              />
            ),
            link: ROUTERS.THERMOMETRY_TEMPERATURE,
          },
          {
            name: 'grainBinCard',
            label: '2',
            content: <div />,
            link: ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD,
          },
        ]
      : [];

  const [currentActiveTab, setCurrentActiveTab] = useState(0);
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname === ROUTERS.THERMOMETRY_TEMPERATURE_SILOSCARD || pathname === ROUTERS.THERMOMETRY_TEMPERATURE_HULLCARD) {
      setCurrentActiveTab(1);
    } else {
      setCurrentActiveTab(0);
    }
  }, [pathname]);

  return (
    <div>
      <div className="wrapper__artificial-intelligence">
        <img src="content/images/artificial-intelligence.svg" width={50} height={50} alt="AI" />
      </div>
      {tabs.length > 0 && <Tabs key={currentActiveTab} tabs={tabs} position="right" indexOfActiveTab={currentActiveTab} />}
    </div>
  );
};

export default memo(TemperatureMonitoring);
