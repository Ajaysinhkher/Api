import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import {getNotes,deleteNote,updateNote} from '../../features/noteSlice';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


function Dashboard() {
  console.log("inside dashboard");
 
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {user} = useSelector((state)=>state.auth);
 
//console.log((user));  getting user here as an object use it further to display user
const [isModalOpen, setIsModalOpen] = useState(false);
const [currentNote, setCurrentNote] = useState({ id: '', title: '', content: '' });

const {notes,status} = useSelector((state) => state.note);

// useEffect(() => {
//   console.log("Updated notes state:", notes);
// }, [notes]);

  useEffect(() => {
    if(user?.id)
    dispatch(getNotes(user.id));
  }, [dispatch,user?.id]);
 
  const handleCreatenote = ()=>{
    navigate('/layout/create');
  };

  const handleDelete = (id)=>{
    if(window.confirm('Are you sure you want to delete this note?')) {
      dispatch(deleteNote(id));
    }
  };
  
  const handleEdit = (note) => {
    setCurrentNote(note);
    console.log(currentNote);
    
    setIsModalOpen(true);
  };

  const handleModalChange = (e) => {
    const { name, value } = e.target;
    setCurrentNote((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalSave = () => {
    dispatch(updateNote(currentNote)); // Dispatch update
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-4/5 max-w-6xl bg-white shadow-lg rounded-xl p-8 flex gap-8">
        
        {/* User Data Section */}
        <div className="w-1/2 border-r pr-6">
          <h2 className="text-2xl font-bold mb-4">User Data</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span>{user?.name ||<Skeleton />}</p>
            <p><span className="font-semibold">Email:</span> {user?.email ||<Skeleton />}</p>
          </div>
          <button onClick = {handleCreatenote} className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
            Create Note
          </button>
        </div>

        {/* User Notes Section */}
        <div className="w-1/2 pl-6">
          <h2 className="text-2xl font-bold mb-4">User Notes</h2>
          <ul className="space-y-4">
            {status === 'loading' ? (
              <p>Loading notes...<Skeleton  count={5}/></p>
              
            ) : notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              notes.map((note) => (
                <li key={note.id} className="bg-gray-100 p-4 rounded shadow-sm flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </div>
                <div className="flex gap-4 ml-4 py-4">
                  <button onClick={() => handleEdit(note)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(note.id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </li>
              ))
            )}
          </ul>
        </div>
                {/* Edit Modal */}
                {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-md w-96">
              <h2 className="text-xl font-bold mb-4">Edit Note</h2>
              <input
                type="text"
                name="title"
                value={currentNote.title}
                onChange={handleModalChange}
                className="w-full border p-2 mb-4 rounded"
                placeholder="Title"
              />
              <textarea
                name="content"
                value={currentNote.content}
                onChange={handleModalChange}
                className="w-full border p-2 mb-4 rounded"
                placeholder="Content"
                rows="4"
              />
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
