import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = {
  theme: '',
};

export const viewModeSlice = createSlice({
  name: 'changeViewMode',
  initialState,
  reducers: {
    setThemeToDark: (state) => {
      state.theme = 'dark';
    },
    setThemeToLight: (state) => {
      state.theme = 'light';
    },
    getThemeFromLocalStorage: (state, action: PayloadAction<string>) => {
      state.theme = action.payload;
    },
  },
});
export const { setThemeToDark, setThemeToLight, getThemeFromLocalStorage } =
  viewModeSlice.actions;
export default viewModeSlice.reducer;
