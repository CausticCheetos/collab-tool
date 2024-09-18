import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import CreateTask from './components/CreateTask.tsx'
import CreateGroup from './components/CreateGroup.tsx'
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
  }
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
