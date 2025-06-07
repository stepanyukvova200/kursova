import axios from 'axios';
import { setLoading, setData, setError } from './grainBinsSlice';
import { AppDispatch } from '../store';

export const fetchGrainBins = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading());

  try {
    const response = await axios.get('/api/grain-bins');
    dispatch(setData(response.data));
  } catch (error: any) {
    dispatch(setError(error.response?.data || 'Unknown error'));
  }
};
