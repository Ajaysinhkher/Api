import React,{useEffect} from 'react';
import { useNavigate } from 'react-router';
import { useSelector,useDispatch } from 'react-redux';
import {getNotes} from '../../features/noteSlice';



function Dashboard() {
  console.log("inside dashboard");
 
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const {user} = useSelector((state)=>state.auth);
 
//  console.log((user));  getting user here as an object use it further to display user


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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-4/5 max-w-6xl bg-white shadow-lg rounded-xl p-8 flex gap-8">
        
        {/* User Data Section */}
        <div className="w-1/2 border-r pr-6">
          <h2 className="text-2xl font-bold mb-4">User Data</h2>
          <div className="space-y-2">
            <p><span className="font-semibold">Name:</span>{user?.name}</p>
            <p><span className="font-semibold">Email:</span> {user?.email}</p>
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
              <p>Loading notes...</p>
            ) : notes.length === 0 ? (
              <p>No notes found.</p>
            ) : (
              notes.map((note) => (
                <li key={note.id} className="bg-gray-100 p-4 rounded shadow-sm">
                  <h3 className="font-semibold text-lg">{note.title}</h3>
                  <p className="text-sm text-gray-700">{note.content}</p>
                </li>
              ))
            )}
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;
