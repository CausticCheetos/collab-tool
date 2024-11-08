import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CreateTask from './components/CreateTask.tsx'
import CreateGroup from './components/CreateGroup.tsx'
import Admin from './components/Admin.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/newTask",
    element: <CreateTask/>
  },
  {
    path: "/newGroup",
    element: <CreateGroup/>
  },
  {
    path: "/Admin",
    element: <Admin/>
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
