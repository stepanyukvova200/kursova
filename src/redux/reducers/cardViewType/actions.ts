import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateView } from './slice';

export const setCardViewType = createAsyncThunk('view/setView', async (cardViewType: string, thunkAPI: any) => {
  if (!['table', '2d', '3d'].includes(cardViewType)) {
    throw new Error('Invalid view type');
  }
  thunkAPI.dispatch(updateView(cardViewType));
  return cardViewType;
});
