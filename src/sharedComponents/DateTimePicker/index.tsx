import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker, DateCalendar } from '@mui/x-date-pickers';
import ukLocale from 'date-fns/locale/uk';
import { Box, Button, Typography, IconButton, Modal, TextField, Select, MenuItem } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { styled } from '@mui/system';
import './style.scss';

const CustomTimeSelector = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '9px',
}));

const TimeUnitBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
}));

type CalendarHeaderProps = {
  currentMonth: Date;
  onMonthChange: (newMonth: number) => void;
  onYearChange: (newYear: number) => void;
};

const CustomTextField = (params: any, handleOpen: () => void) => (
  <TextField
    {...params}
    fullWidth
    InputProps={{
      endAdornment: (
        <IconButton onClick={handleOpen}>
          <CalendarTodayIcon />
        </IconButton>
      ),
    }}
  />
);

const CustomCalendarHeader = React.memo(({ currentMonth, onMonthChange, onYearChange }: CalendarHeaderProps) => {
  const months = Array.from({ length: 13 }, (_, i) => new Date(0, i).toLocaleString('uk-UA', { month: 'long' }));
  const years = Array.from({ length: 11 }, (_, i) => new Date().getFullYear() - 5 + i);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0',
        marginBottom: '16px',
      }}
    >
      <Select
        value={currentMonth.getMonth()}
        onChange={e => onMonthChange(Number(e.target.value))}
        sx={{
          height: '24px',
          width: 'auto',
          color: 'var(--color-secondary-gray)',
          borderColor: 'var(--color-stroke)',
          borderRadius: '16px',
          alignItems: 'center',
          padding: '0',
          '& svg': {
            color: 'var(--color-secondary-gray)',
          },
        }}
      >
        {months.map((month, index) => (
          <MenuItem key={index} value={index}>
            {month}
          </MenuItem>
        ))}
      </Select>
      <Select
        value={currentMonth.getFullYear()}
        onChange={e => onYearChange(Number(e.target.value))}
        sx={{
          height: '24px',
          width: 'auto',
          color: 'var(--color-secondary-gray)',
          borderColor: 'var(--color-stroke)',
          borderRadius: '16px',
          alignItems: 'center',
          padding: '0',
          '& svg': {
            color: 'var(--color-secondary-gray)',
          },
        }}
      >
        {years.map(year => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
});

const CustomCalendarHeaderWrapper =
  ({
    currentMonth,
    onMonthChange,
    onYearChange,
  }: {
    currentMonth: Date | null;
    onMonthChange: (newMonth: number) => void;
    onYearChange: (newYear: number) => void;
  }) =>
  () => // @ts-ignore
    <CustomCalendarHeader currentMonth={currentMonth} onMonthChange={onMonthChange} onYearChange={onYearChange} />;

const unitMap = {
  0: 'hours',
  1: 'minutes',
  2: 'seconds',
};

interface CustomDatePickerProps {
  currentValue: Date | null;
  setCurrentValue: React.Dispatch<React.SetStateAction<Date | null>>;
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ currentValue, setCurrentValue }) => {
  const [tempDate, setTempDate] = useState<Date | null>(new Date());
  const [openTimeSelector, setOpenTimeSelector] = useState(false);

  const adjustTime = (unit: 'hours' | 'minutes' | 'seconds', amount: number) => {
    const newDate = new Date(tempDate || new Date());
    if (unit === 'hours') newDate.setHours(newDate.getHours() + amount);
    if (unit === 'minutes') newDate.setMinutes(newDate.getMinutes() + amount);
    if (unit === 'seconds') newDate.setSeconds(newDate.getSeconds() + amount);
    setTempDate(newDate);
  };

  const handleMonthChange = (newMonth: number) => {
    if (tempDate) {
      const updatedDate = new Date(tempDate); // Clone tempDate
      updatedDate.setMonth(newMonth);
      setTempDate(updatedDate);
    }
  };

  const handleYearChange = (newYear: number) => {
    if (tempDate) {
      const updatedDate = new Date(tempDate); // Clone tempDate
      updatedDate.setFullYear(newYear);
      setTempDate(updatedDate);
    }
  };

  return ( // @ts-ignore
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ukLocale}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <DateTimePicker
          value={currentValue}
          ampm={false}
          openTo="seconds"
          views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']} // @ts-ignore
          components={{
            OpenPickerIcon: CalendarTodayIcon,
          }}
          slots={{
            textField: params => CustomTextField(params, () => setOpenTimeSelector(true)),
          }}
        />

        <Modal
          open={openTimeSelector}
          onClose={() => setOpenTimeSelector(false)}
          aria-labelledby="time-selector-modal"
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <Box
            sx={{
              backgroundColor: 'var(--color-white)',
              borderRadius: '16px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              boxShadow: 24,
              padding: '16px',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '32px',
              }}
            >
              <Box
                sx={{
                  position: 'relative',

                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: '-17px',
                    width: '1px',
                    height: '100%',
                    backgroundColor: 'var(--color-primary)',
                  },
                }}
              >
                <DateCalendar
                  value={tempDate}
                  onChange={newValue => setTempDate(newValue)}
                  fixedWeekNumber={6}
                  showDaysOutsideCurrentMonth
                  dayOfWeekFormatter={day => {
                    const dayMap: Record<string, string> = {
                      Mon: 'Пн',
                      Tue: 'Вт',
                      Wed: 'Ср',
                      Thu: 'Чт',
                      Fri: 'Пт',
                      Sat: 'Сб',
                      Sun: 'Нд',
                    }; // @ts-ignore
                    const formattedDay = dayMap[day] || day;
                    return formattedDay.charAt(0).toUpperCase() + formattedDay.slice(1);
                  }} // @ts-ignore
                  components={{
                    CalendarHeader: CustomCalendarHeaderWrapper({
                      currentMonth: tempDate,
                      onMonthChange: handleMonthChange,
                      onYearChange: handleYearChange,
                    }),
                  }}
                  sx={{
                    fontFamily: 'Inter',
                    fontWeight: '500',
                    fontSize: '14px',
                  }}
                />
              </Box>
              <div>
                <CustomTimeSelector>
                  {['Год', 'Хв', 'Сек'].map((unit, index) => (
                    <TimeUnitBox key={unit}>
                      <Typography
                        variant="h6"
                        sx={{
                          marginBottom: 2,
                          color: 'var(--color-primary)',
                        }}
                      >
                        {unit}
                      </Typography>
                      <Button // @ts-ignore
                        onClick={() => adjustTime(unitMap[index], 1)}
                        sx={{
                          color: 'var(--color-gray)',
                        }}
                      >
                        ▲
                      </Button>
                      <Typography
                        variant="h6"
                        sx={{
                          display: 'flex',
                          position: 'relative',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: '40px',
                          width: '46px',
                          color: 'var(--color-white)',
                          backgroundColor: 'var(--color-primary)',
                          borderRadius: '12px',

                          ...(index === 0 || index === 1
                            ? {
                                '&::after': {
                                  content: '":"',
                                  position: 'absolute',
                                  top: '-10px',
                                  right: '-18px',
                                  fontSize: '34px',
                                  color: 'var(--color-gray)',
                                },
                              }
                            : {}),
                        }}
                      >
                        {index === 0 && (tempDate?.getHours() || 0)}
                        {index === 1 && (tempDate?.getMinutes() || 0)}
                        {index === 2 && (tempDate?.getSeconds() || 0)}
                      </Typography>
                      <Button // @ts-ignore
                        onClick={() => adjustTime(unitMap[index], -1)}
                        sx={{
                          width: '46px',
                          color: 'var(--color-gray)',
                        }}
                      >
                        ▼
                      </Button>
                    </TimeUnitBox>
                  ))}
                </CustomTimeSelector>
              </div>
            </Box>
            <Box
              sx={{
                display: 'flex',
                gap: '8px',
                width: '100%',
              }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={() => {
                  setTempDate(currentValue);
                  setOpenTimeSelector(false);
                }}
                sx={{
                  height: '40px',
                  width: 'calc(50% - 4px)',
                  backgroundColor: 'transparent',
                  color: 'var(--color-primary)',
                  border: '2px solid var(--color-primary)',
                  borderRadius: '12px',
                }}
              >
                Скасувати
              </Button>
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setCurrentValue(tempDate);
                  setOpenTimeSelector(false);
                }}
                sx={{
                  height: '40px',
                  width: 'calc(50% - 4px)',
                  backgroundColor: 'var(--color-primary)',
                  color: 'var(--color-white)',
                  borderRadius: '12px',
                }}
              >
                Зберегти
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </LocalizationProvider>
  );
};

export default CustomDatePicker;
