import { createAction } from '@reduxjs/toolkit';

// Локальна дія для збереження indexOfActiveSensor
export const setIndexOfActiveSensor = createAction<number>('example/set_index_of_active_sensor');

// Локальна дія для збереження indexOfActiveSuspension
export const setIndexOfActiveSuspension = createAction<number>('example/set_index_of_active_suspension');

// Локальна дія для збереження grainBin
export const setGrainBin = createAction<any>('example/set_grain_bin');
