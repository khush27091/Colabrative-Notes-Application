import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NoteState {
  content: string;
  usersEditing: string[];
}

const initialState: NoteState = {
  content: '',
  usersEditing: [],
};

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setContent: (state, action: PayloadAction<string>) => {
      state.content = action.payload;
    },
    setUsersEditing: (state, action: PayloadAction<string[]>) => {
      state.usersEditing = action.payload;
    },
  },
});

export const { setContent, setUsersEditing } = noteSlice.actions;
export default noteSlice.reducer;
