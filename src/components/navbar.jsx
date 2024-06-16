import { React, useState, useEffect } from 'react'
import "./navbar.css"
import Cookie from '../helpers/cookie';
const navbar = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    async function e() {
      if (await Cookie.getCookie("user")) {
        setUserName(JSON.parse(await Cookie.getCookie("user")).name)
      }
    }
    e()
  }, [])
  return (
    <div className='nav '>
      {/* <div className="logo"></div> */}
      <div className="head">Passy</div>
      <div className="hello" id='hello'>/ Hey, {userName}</div>
    </div>
  )
}

export default navbar
