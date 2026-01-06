import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../../api/services/userService';
import type { User, PaginationParams } from '../../types/user';

interface UsersState {
  users: User[];
  selectedUser: User | null;
  total: number;
  skip: number;
  limit: number;
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  total: 0,
  skip: 0,
  limit: 10,
  loading: false,
  error: null,
};

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params?: PaginationParams) => {
    const response = await userService.getAllUsers(params);
    return response;
  }
);

export const fetchUserById = createAsyncThunk('users/fetchUserById', async (id: string) => {
  const response = await userService.getUserById(id);
  return response;
});

export const deleteOwnProfile = createAsyncThunk('users/deleteOwnProfile', async () => {
  await userService.deleteOwnProfile();
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearSelectedUser: (state) => {
      state.selectedUser = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    setPage: (state, action: PayloadAction<{ skip: number; limit: number }>) => {
      state.skip = action.payload.skip;
      state.limit = action.payload.limit;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.users = action.payload.users;
      state.total = action.payload.total;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch users';
    });

    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedUser = action.payload;
    });
    builder.addCase(fetchUserById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || 'Failed to fetch user';
    });

    builder.addCase(deleteOwnProfile.fulfilled, (state) => {
      state.loading = false;
    });
  },
});

export const { clearSelectedUser, clearError, setPage } = usersSlice.actions;
export default usersSlice.reducer;
