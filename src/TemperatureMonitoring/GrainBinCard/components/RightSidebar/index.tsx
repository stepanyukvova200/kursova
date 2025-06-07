import React, { useEffect, useState } from 'react';
import GrainBinInfo from './GrainBinInfo';
// import { data } from '@/helper/getGrainBin';
import './style.scss';

import Checkbox from '../../../../sharedComponents/inputs/Checkbox';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { IconButton } from '@mui/material';
import { useAppSelector } from '../../../../redux/hooks';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { useSearchParams } from 'react-router-dom';
import CustomDropdown from '../../../../sharedComponents/CustomDropdown';

const RightSidebar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);
  const [isReversed, setIsReversed] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const toggleDrawer = () => {
    setIsOpenSidebar(!isOpenSidebar);
  };

  const bin = useAppSelector(state => state.grainBin);

  const [suspensionId, setSuspensionId] = useState(searchParams.get('suspension'));
  const [activeSuspension, setActiveSuspension] = useState<any>();
  const [activeSensor, setActiveSensor] = useState<number>();

  useEffect(() => {
    setSuspensionId(searchParams.get('suspension'));

    const getActiveSensor = searchParams.get('sensor');
    if (getActiveSensor) {
      setActiveSensor(+getActiveSensor);
    } else {
      setActiveSensor(-1);
    }
  }, [searchParams]);

  useEffect(() => {
    const suspensions = bin.entity?.grainBin?.thermalSuspensions;

    if (!suspensions || suspensions.length === 0) return; // Чекаємо, поки з'являться дані
    // @ts-ignore
    const foundSuspension = suspensions.find(s => s.id === +suspensionId);

    setActiveSuspension(foundSuspension || suspensions[0]); // Якщо не знайдено, беремо перший елемент
  }, [suspensionId, bin.entity]);

  const allSuspensions = bin.entity?.grainBin?.thermalSuspensions || [];
  const allSuspensionsDisplayName = [...allSuspensions].map(item => item.displayName); // @ts-ignore
  const sensorsArray = activeSuspension?.sensors?.map(sensor => sensor.id) || [];

  const updateSearchParamSuspensionId = (suspensionDisplayName: string) => { // @ts-ignore
    const result = allSuspensions.find(({ displayName }) => displayName.toLowerCase() === suspensionDisplayName.toLowerCase());
    setSuspensionId(result.id);
    searchParams.set('suspension', result.id);
    searchParams.set('sensor', 'full');
    setSearchParams(searchParams);
  };

  const handleSensorClick = (sensorId: any) => {
    if (searchParams.get('suspension') === 'full') {
      searchParams.set('suspension', '0');
    }
    searchParams.set('sensor', sensorId.toString());
    setSearchParams(searchParams);
  };

  return (
    <div className="sidebar__right">
      <div className={isOpenSidebar ? 'sidebar__right-additional' : 'sidebar__right-additional close'}>
        <div className="icon__arrow">
          <IconButton onClick={toggleDrawer}>
            {isOpenSidebar ? (
              <ChevronRightIcon style={{ color: '#328624', fontSize: '2.4rem' }} />
            ) : (
              <ChevronLeftIcon style={{ color: '#328624', fontSize: '2.4rem' }} />
            )}
          </IconButton>
        </div>
        <div className={isOpenSidebar ? 'content' : 'content close'}>
          <h2 className="title">{bin.entity?.grainBin?.grainBin?.displayName}</h2>

          <GrainBinInfo
            culture={bin.entity?.grainBin?.grainBin?.culture}
            co2={bin.entity?.grainBin?.grainBin?.co2}
            humidity={bin.entity?.grainBin?.grainBin?.humidity}
            weight={bin.entity?.grainBin?.grainBin?.weight}
          />

          <div className="temperature-view">
            <h2>Температура</h2>

            <div className="checkbox-group">
              {/* You should change it for a real one */}
              <Checkbox id="individual" label="Індивідуально" defaultChecked disabled />
              <Checkbox id="active" label="Зробити неактивним" defaultChecked={false} disabled />
            </div>

            <div className="section">
              <h3>Рівні температури</h3>
              <div className="dropdown-group">
                <div className="group">
                  <p className="text">Норма</p>
                  <div className="value">{bin.entity?.grainBin?.grainBin?.normaTemp}</div>
                </div>
                <div className="group">
                  <p className="text">Попередження</p>
                  <div className="value">{bin.entity?.grainBin?.grainBin?.warningTemp}</div>
                </div>
                <div className="group">
                  <p className="text">Аварійний</p>
                  <div className="value">{bin.entity?.grainBin?.grainBin?.emergencyTemp}</div>
                </div>
              </div>
            </div>
            <div className="section last-section">
              <h3>Рівні динаміки температури</h3>
              <div className="dropdown-group">
                <div className="dropdown-group">
                  <div className="group">
                    <p className="text">Норма</p>
                    <div className="value">{bin.entity?.grainBin?.grainBin?.normaDeltaTemp}</div>
                  </div>
                  <div className="group">
                    <p className="text">Попередження</p>
                    <div className="value">{bin.entity?.grainBin?.grainBin?.warningDeltaTemp}</div>
                  </div>
                  <div className="group">
                    <p className="text">Аварійний</p>
                    <div className="value">{bin.entity?.grainBin?.grainBin?.emergencyDeltaTemp}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sidebar__right-main">
        <div className="sidebar__header">
          <div
            className="reverse"
            style={{
              borderColor: isReversed ? 'var(--color-primary)' : 'var(--color-stroke)',
            }}
            onClick={() => setIsReversed(!isReversed)}
          >
            <FontAwesomeIcon
              icon={faArrowUp}
              size="xs"
              style={{
                color: isReversed ? 'var(--color-primary)' : 'var(--color-stroke)',
                position: 'absolute',
                top: '10px',
                left: '11px',
              }}
            />
            <FontAwesomeIcon
              icon={faArrowDown}
              size="xs"
              style={{
                color: isReversed ? 'var(--color-primary)' : 'var(--color-stroke)',
                position: 'absolute',
                bottom: '10px',
                right: '11px',
              }}
            />
          </div>

          {/* <Dropdown isOpen={isDropdownOpen} toggle={() => setIsDropdownOpen(!isDropdownOpen)} className="dropdown">
            <DropdownToggle caret className="dropdown-toggle">
              {activeSuspension?.displayName}
            </DropdownToggle>
            <DropdownMenu className="dropdown-menu">
              {allSuspensions.map((element, index) => (
                <DropdownItem
                  key={index}
                  className="dropdown-item"
                  onClick={() => {
                    setSuspensionId(element.id);
                    searchParams.set('suspension', element.id);
                    searchParams.set('sensor', 'full');
                    setSearchParams(searchParams);
                  }}
                >
                  {element.displayName}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown> */}
          <CustomDropdown
            title="Виберіть Підвіску"
            data={allSuspensionsDisplayName[0]}
            options={allSuspensionsDisplayName}
            updateSearchParam={updateSearchParamSuspensionId}
            type="suspensions"
          />
        </div>

        <SimpleBar className="custom-scrollbar">
          <div className="info">
            <div className="column">
              <div className="main-text">№</div>

              {sensorsArray // @ts-ignore
                .sort((a, b) => (isReversed ? b - a : a - b)) // @ts-ignore
                .map((value, index) => (
                  <div
                    className={`number ${activeSensor === index ? 'selected' : ''}`}
                    key={value}
                    onClick={() => handleSensorClick(index)}
                  >
                    {value}
                  </div>
                ))}
            </div>

            <div className="column">
              <div className="main-text">Вис.</div>

              {/*@ts-ignore*/}
              {activeSuspension?.sensors.map(value => (
                <div className={`height ${activeSensor === value.id ? 'selected' : ''}`} onClick={() => handleSensorClick(value.id)}>
                  {value.height}
                </div>
              ))}
            </div>

            <div className="column">
              <div className="main-text">Темп.</div>

              {/*@ts-ignore*/}
              {activeSuspension?.sensors.map(value => (
                <div className={`temperature ${activeSensor === value.id ? 'selected' : ''}`} onClick={() => handleSensorClick(value.id)}>
                  {value.currentTemp}
                </div>
              ))}
            </div>

            <div className="column">
              <div className="main-text">Динам.</div>

              {/*@ts-ignore*/}
              {activeSuspension?.sensors.map(value => (
                <div
                  className={`delta-temperature ${activeSensor === value.id ? 'selected' : ''}`}
                  onClick={() => handleSensorClick(value.id)}
                >
                  {value.deltaTemp}
                </div>
              ))}
            </div>
          </div>
        </SimpleBar>

        <div className="bottom">
          <div className="displacement">Зміщення</div>
          <div className="displacement-value">0.0</div>
        </div>
      </div>
    </div>
  );
};

export default RightSidebar;
