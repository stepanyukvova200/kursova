import { EntityState } from '../reducer.utils';
import { setSilosIndex } from './actions';

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
      .addCase(setSilosIndex, (state, action) => {
        state.entity = { silosIndex: action.payload };
      })
  }
);
