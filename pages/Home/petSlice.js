import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiAuthenticated from '../../api/apiAuthenticated';
import * as SecureStore from 'expo-secure-store';

export const getPets = createAsyncThunk('pet/pets', async (petId = null, {rejectWithValue}) => {
  const token = await SecureStore.getItemAsync('token');
  if (!token) {
    return rejectWithValue("No token found"); 
  }
  const requestAuthenticated = apiAuthenticated(token);
  try {
    const endpoint = petId ? `/Mascotas/${petId}` : '/Mascotas';
    const response = await requestAuthenticated.get(endpoint);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Error desconocido");
  }
});

export const getProtector = createAsyncThunk('protector/protectors', async (protectorId = null, {rejectWithValue}) => {
  const token = await SecureStore.getItemAsync('token');
  if (!token) {
    return rejectWithValue("No token found"); 
  }
  const requestAuthenticated = apiAuthenticated(token);
  try {
    const endpoint = protectorId ? `/Protectoras/${protectorId}` : '/Protectoras';
    const response = await requestAuthenticated.get(endpoint);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data || "Error desconocido");
  }
});

const petSlice = createSlice({
  name: 'pets',
  initialState : {
    petsAvailable: [],
    protectorsAvailable: [],
    selectedPet: null,
    selectedProtector: null,
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      // Reducers para getPets
      .addCase(getPets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.petsAvailable = action.payload;
          state.selectedPet = null;
        } else {
          state.selectedPet = action.payload;
          state.petsAvailable = [];
        }
      })
      .addCase(getPets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Reducers para getProtector
      .addCase(getProtector.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProtector.fulfilled, (state, action) => {
        state.loading = false;

        if (Array.isArray(action.payload)) {
          state.protectorsAvailable = action.payload;
          state.selectedProtector = null;
        } else {
          state.selectedProtector = action.payload;
          state.protectorsAvailable = [];
        }
      })
      .addCase(getProtector.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default petSlice.reducer;

