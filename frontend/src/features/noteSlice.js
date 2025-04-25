
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const createNote = createAsyncThunk('note/create',  
  async (noteData, { rejectWithValue }) => {
    console.log("api hit",noteData);  
    try {
      const response = await axios.post(`${API_URL}/create`, noteData);
      console.log("backend data:",response.data);
      
      return response.data; // assuming backend returns the created note
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getNotes = createAsyncThunk('notes/get',
    async(userId,{rejectWithValue})=>{

        try{
            const response  = await axios.get(`${API_URL}/get?user_id=${userId}`);
                return response.data.notes;
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);



const noteSlice = createSlice({
  name: 'note',
  initialState: {
    notes: [],
    status: 'idle',
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createNote.pending, (state) => {
        console.log("object")
        state.status = 'loading';
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log("fulfilled");
        
        state.notes.push(action.payload); // add note returned from backend and state updated
        // console.log("note stored in state:",state.notes);
        
      })
      .addCase(createNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(getNotes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.notes = action.payload;
      })
      .addCase(getNotes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default noteSlice.reducer;

