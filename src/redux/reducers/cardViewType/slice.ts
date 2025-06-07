import { createSlice } from '@reduxjs/toolkit';

interface IViewState {
  currentView: string; // 'table' | '2d' | '3d'
}

export const initialState: IViewState = {
  currentView: '2d', // значення за замовчуванням
};

const { actions, reducer } = createSlice({
  name: 'view',
  initialState,
  reducers: {
    updateView(state, action) {
      state.currentView = action.payload;
    },
  },
});

export const { updateView } = actions;
export { reducer };
