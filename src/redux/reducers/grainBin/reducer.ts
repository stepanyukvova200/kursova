import { EntityState } from '../reducer.utils';
import { setGrainBin,setIndexOfActiveSuspension,setIndexOfActiveSensor } from './actions';

import { createReducer } from '@reduxjs/toolkit';

export const exampleReducer = createReducer<EntityState<any>>(
  {
    loading: false,
    errorMessage: null,
    updateSuccess: false,
    updating: false,  // Додаємо властивість updating
    entities: [],
    entity: null,
  },
  (builder) => {
    builder
      // Обробка дії для збереження indexOfActiveSuspension
      .addCase(setIndexOfActiveSensor, (state, action) => {
        state.entity = { indexOfActiveSensor: action.payload };
      })
      // Обробка дії для збереження indexOfActiveSuspension
      .addCase(setIndexOfActiveSuspension, (state, action) => {
        state.entity = { indexOfActiveSuspension: action.payload };
      })
      // Обробка дії для збереження grainBin
      .addCase(setGrainBin, (state, action) => {
        state.entity = { grainBin: action.payload };
      });
  }
);
