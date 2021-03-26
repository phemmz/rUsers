import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import type { RootState } from '../../app/store';
import makeApiRequest from '../../helpers/makeApiRequest';

export interface UserShape {
  id: {
    name: string;
  };
  name: {
    first: string;
    last: string;
    title: string;
  };
  phone: string;
  picture: {
    large: string;
  };
};

interface UserResponse {
  results: UserShape[];
};

interface SliceShape {
  users: UserResponse;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | undefined;
}

const initialState = {
  users: {
    results: [],
  },
  status: 'idle',
  error: undefined,
} as SliceShape;

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (page: number) => {
  const response = await makeApiRequest(`/?inc=id,name,phone,picture&results=20&${page}`);

  return response as UserShape[];
})

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
  },
  extraReducers: builder => {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading';
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.users = {
        ...action.payload,
        results: [...state.users.results, ...action.payload.results]
      };
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    })
  }
});

export const selectCount = (state: RootState) => state.users;

export default userSlice.reducer;
