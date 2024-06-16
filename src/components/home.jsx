import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Cookie from '../helpers/cookie';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddPass from './addPass'
import ViewPass from './viewPass'
import Navbar from './navbar'
import './home.css'
const home = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  useEffect(() => {
    async function e() {
      if (await Cookie.getCookie("logged") == "true") {
        if (await Cookie.getCookie("user")) {
          setUserName(JSON.parse(await Cookie.getCookie("user")).name)
        }
        else {
          navigate('/login')
        }
      }
      else {
        navigate("/login")
      }
    }
    e()

  }, [])
  function logout() {
    Cookie.deleteCookie("logged")
    Cookie.deleteCookie("user")
    navigate("/login")
  }
  const [viewSwitch, setView] = useState(0)
  return (
    <>
      <Navbar  />
      <div data-scroll className="home">
        <div data-scroll data-scroll-speed="1" className="sideActions" id='sideAction'>
          <button className='sideButton' onClick={() => { setView(0) }}>View Passwords</button>
          <button className='sideButton' onClick={() => { setView(1) }}>Add New Password</button>
          <button onClick={logout} className='sideButton'>Logout</button>
        </div>
        <div  className="main">
          {viewSwitch == 0 ? <ViewPass /> : <AddPass />}
        </div>
      </div>
    </>
  )
}

export default home
