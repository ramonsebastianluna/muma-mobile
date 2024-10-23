import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';
import * as SecureStore from 'expo-secure-store';

//Login
export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await api.post('/Authentication/token', credentials);
    return response.data; // Se asume que la respuesta contiene { token: 'token_value' }
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

const storeToken = async (token) => {
  try {
    await SecureStore.setItemAsync('token', token);
  } catch (error) {
    console.error('Error al guardar el token:', error);
  }
};

const getToken = async () => {
  try {
    const token = await SecureStore.getItemAsync('token');
    return token;
  } catch (error) {
    console.error('Error al obtener el token:', error);
  }
};

const deleteToken = async () => {
  try {
    await SecureStore.deleteItemAsync('token');
    console.log('Token eliminado');
  } catch (error) {
    console.error('Error al eliminar el token:', error);
  }
};

const authSlice = createSlice({
  name: 'login',
  initialState: {
    token: null,
    userId: null,
    role: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.token = null;
      state.userId = null;
      state.role = null;
      deleteToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userId = action.payload.usuario.id;
        state.role = action.payload.usuario.tipoRegistro.descripcion;
        storeToken(state.token);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.errors;
      });
  }});

export const { logout } = authSlice.actions;
export default authSlice.reducer;