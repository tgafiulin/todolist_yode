import { configureStore } from '@reduxjs/toolkit';
import notesSlice from './reducers/notesReducer'

export default configureStore({
  reducer: {
    notes: notesSlice
  },
});
