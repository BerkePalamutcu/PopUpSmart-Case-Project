import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://6310d74236e6a2a04ef90bcf.mockapi.io/todos';

const initialState: any = {
  todoData: [],
  pending: false,
  error: '',
};

export const fetchTodos = createAsyncThunk('fetchTodos', async () => {
  const response = await axios.get<any>(BASE_URL);
  return response.data;
});

export const postTodos = createAsyncThunk('postTodos', async (data: any) => {
  await axios.post<any>(BASE_URL, data);
});

export const editTodos = createAsyncThunk(
  'editTodos',
  async (data: { editMode: any; id: Number; content: string }) => {
    await axios.put<any>(`${BASE_URL}/${data.id}`, data);
  }
);

export const deleteTodo = createAsyncThunk(
  'deleteTodos',
  async (id: string | number) => {
    await axios.delete<any>(`${BASE_URL}/${id}`);
  }
);

const todoListData = createSlice({
  name: 'getDataFromApi',
  initialState,
  reducers: {
    filterCompletedTodos: (state) => {
      state.todoData = state.todoData.filter((item: any) => item.isCompleted);
    },
    filterInCompletedTodos: (state) => {
      state.todoData = state.todoData.filter(
        (item: any) => item.isCompleted === false
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.pending = true;
      state.error = '';
    });
    builder.addCase(
      fetchTodos.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.todoData = action.payload.reverse();
        state.pending = false;
      }
    );
    builder.addCase(fetchTodos.rejected, (state) => {
      state.pending = false;
      state.error = 'something happened while getting data';
    });
  },
});

export const { filterCompletedTodos, filterInCompletedTodos } =
  todoListData.actions;
export default todoListData.reducer;
