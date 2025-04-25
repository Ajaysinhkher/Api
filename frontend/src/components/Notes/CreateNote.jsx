import React, { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { createNote } from '../../features/noteSlice';
import {useNavigate} from 'react-router'

function CreateNoteForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state)=>state.auth.user);
  console.log("create note:",user);
  
  const userId = user?.id; 
//   console.log(userId);
  

  const handleSubmit = (e) => {
    console.log("form clicked");
    
    e.preventDefault();
    if (!title || !content || !userId) return;

    // Dispatch to Redux
    dispatch(createNote({ title, content,user_id: userId }));
    navigate('/layout/home');
    setTitle('');
    setContent('');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Create New Note</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note title"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="block mb-1 font-medium text-gray-700">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter note content"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNoteForm;
