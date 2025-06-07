import React, { useEffect, useRef, useState } from 'react';
import './style.css';
import { ChevronDownIcon, ChevronUpIcon } from '../../TemperatureMonitoring/GrainBinMap/components/icons';
import { useSearchParams } from 'react-router-dom';

const CustomDropdownOptionItem = ({
  item,
  position,
  onClick,
  className,
}: {
  item: string;
  position?: 'top' | 'bottom' | 'not-found' | 'single';
  className?: any;
  onClick?: () => void;
}) => (
  <div
    className={`custom-dropdown-option-item ${position === 'top' && 'custom-dropdown-option-item-top'} ${position === 'bottom' && 'custom-dropdown-option-item-bottom'} ${position === 'not-found' && 'custom-dropdown-option-item-not-found'} ${position === 'single' && 'custom-dropdown-option-item-single'} ${className}`}
    onClick={onClick}
  >
    <p>{item}</p>
  </div>
);

interface DropdownProps {
  title?: string;
  options: string[];
  search?: boolean;
  updateSearchParam?: (option: string) => void;
  type?: 'suspensions' | 'viewType' | null;
  data?: string;
  setData?: (option: string) => void;
  style?: any;
}

const CustomDropdown: React.FC<DropdownProps> = ({
  title,
  options,
  search = false,
  updateSearchParam,
  type = null,
  data,
  setData,
  style,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectOption, setSelectOption] = useState<string | null>(data || null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const suspensionId = searchParams.get('suspension') !== 'full' ? searchParams.get('suspension') : 0;
  const types = { // @ts-ignore
    suspensions: options[suspensionId],
    viewType: searchParams.get('viewType')?.toUpperCase(),
  };

  const filteredOptions = search ? options.filter(option => option.toLowerCase().includes(searchTerm.toLowerCase())) : options;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (type) {
      setSelectOption(types[type]);
    }
  }, [searchParams]);

  const optionsLength = filteredOptions.length;
  let position;

  return (
    <div className="custom-dropdow-wrapper" ref={dropdownRef} style={style}>
      <div className="custom-dropdown-default">
        {search ? (
          <input
            className="custom-dropdown-search"
            type="text"
            placeholder={title}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            onFocus={() => setIsOpen(true)}
          />
        ) : (
          <p className={`custom-dropdown-title ${selectOption && 'custom-dropdown-title-active'}`}>{selectOption || title}</p>
        )}
        <div className="custom-dropdown-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <ChevronUpIcon color="#979797" /> : <ChevronDownIcon color="#979797" />}
        </div>
      </div>
      <div
        className="custom-dropdown-content"
        style={{ opacity: isOpen ? 1 : 0, visibility: isOpen ? 'visible' : 'hidden', transition: 'opacity 0.3s ease, transform 0.3s ease' }}
      >
        {optionsLength !== 0 ? (
          filteredOptions.map((option, index) => {
            if (index === 0) {
              position = 'top';
            } else if (index !== optionsLength - 1) {
              position = '';
            } else {
              position = 'bottom';
            }

            if (optionsLength === 1) {
              position = 'single';
            }
            return (
              <CustomDropdownOptionItem
                key={index}
                item={option} // @ts-ignore
                position={position}
                onClick={() => {
                  setSelectOption(option);
                  setIsOpen(false);
                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  setData ? setData(option) : () => {};
                  setSearchTerm(option);
                  if (updateSearchParam) {
                    updateSearchParam(option.toLowerCase());
                  }
                }}
                className={selectOption === option && 'custom-dropdown-option-item-active'}
              />
            );
          })
        ) : (
          <CustomDropdownOptionItem item="Не знайдено" position="not-found" />
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
