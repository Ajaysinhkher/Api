
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api';

export const createNote = createAsyncThunk('note/create',  
  async (noteData, { rejectWithValue }) => {
    console.log("api hit",noteData);  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${API_URL}/create`, noteData,{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      });
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
          const token = localStorage.getItem('token');
            const response  = await axios.get(`${API_URL}/get?user_id=${userId}`,{
              headers:{
                Authorization: `Bearer ${token}`,
              }
            });
                return response.data.notes;
        }catch(err){
            return rejectWithValue(err.response?.data || err.message);
        }
    }
);

export const updateNote = createAsyncThunk(
  'note/updateNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(`${API_URL}/update/${noteData.id}`, noteData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("updated daat:", response.notes);
      
      return response.data.note; // return updated note
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);



export const deleteNote = createAsyncThunk('notes/delete', async (noteId, thunkAPI) => {
  const token = localStorage.getItem('token');
  await axios.delete(`${API_URL}/delete/${noteId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return noteId;
});



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
      })
      .addCase(deleteNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Remove the deleted note from the state by matching the note ID
        state.notes = state.notes.filter(note => note.id !== action.payload);
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(updateNote.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.status = 'succeeded';
        // Find the note and update it
        const index = state.notes.findIndex(note => note.id === action.payload.id);
        if (index !== -1) {
          state.notes[index] = action.payload;
        }
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  },
});

export default noteSlice.reducer;

