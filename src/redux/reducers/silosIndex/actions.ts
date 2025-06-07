import { createAction } from '@reduxjs/toolkit';

// Локальна дія для збереження indexOfActiveSuspension
export const setSilosIndex = createAction<number>('example/set_silos_index');
