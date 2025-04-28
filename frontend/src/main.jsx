import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider} from "react-router";
import { Provider } from 'react-redux'
import store from './app/store.js'
import Login from './components/auth/Login.jsx';
import Layout from './components/Layout.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import CreateNote from './components/Notes/CreateNote.jsx';

const router = createBrowserRouter([
    {
        path:"/",
        Component:Login,    
    },
    {
        path:"/layout",
        Component:Layout,
        children:[
            {  
                path:"home",
                Component: Dashboard              
            },
            {
                path:"create",
                Component:CreateNote,
            },      
            
        ]
        
    }
]);


createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
