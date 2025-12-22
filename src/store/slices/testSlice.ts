import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface TestState {
  testString: string;
}

const initialState: TestState = {
  testString: 'Hello from Redux Toolkit!',
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setTestString: (state, action: PayloadAction<string>) => {
      state.testString = action.payload;
    },
    resetTestString: (state) => {
      state.testString = initialState.testString;
    },
    appendTestString: (state, action: PayloadAction<string>) => {
      state.testString += action.payload;
    },
  },
});

export const { setTestString, resetTestString, appendTestString } = testSlice.actions;

export default testSlice.reducer;
