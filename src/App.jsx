import React from 'react'
import Login from './components/login';
import Home from './components/home';
import Navbar from './components/navbar'
import Register from './components/Register'
import Cursor from './components/cursor'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <><Navbar/><Login/></>
    },
    {
      path: "/",
      element:
        <>
          <Home/>
        </>
    },
    {
      path: "/register",
      element:
        <>
          <Navbar/><Register/>
        </>
    }
  ])
  return (
    <div className='mainBody'>
      <Cursor></Cursor>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
