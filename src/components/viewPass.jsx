import { React, useState, useEffect } from 'react'
import './viewPass.css'
import { useNavigate } from 'react-router-dom';
import loaderSVG from '../assets/loader.svg'
import Cookie from '../helpers/cookie';
import passCrypt from "../helpers/passCrypt";
import PassCard from './passCard';
import LocomotiveScroll from 'locomotive-scroll';
const locomotiveScroll = new LocomotiveScroll();
const viewPass = () => {
  var user = {}
  var fetching = false
  const [list, setList] = useState([])
  useEffect(() => {
    async function e() {
      if (await Cookie.getCookie("logged") == "true") {
        if (await Cookie.getCookie("user")) {
          user = JSON.parse(await Cookie.getCookie("user"))
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
      .then(async () => {
        try {
          let USERPASS = await passCrypt.crypt(user.pass)
          fetching = true
          fetch(`http://127.0.0.1/getPass?user=${user.accID}&pass=${USERPASS}`)
            .then(resp => resp.json())
            .then(data => {
              fetching = false
              setList(data.data)
            })
        } catch (error) {
          fetching = "Could not load"
          setList(error)
        }
      })
  }, [])
  const navigate = useNavigate();

  return (
    <div data-scroll data-scroll-speed="1" className='list'>
      {
        list != '' ?
          list.map((e, i) => {
            return <PassCard data-scroll index={i} site={e.site} siteusername={e.siteusername} sitepassword={e.sitepassword} ></PassCard>
          })
          : fetching == true ? "Loading ..." : fetching == "Could not load" ? "Could not load" : "Add Passwords, nothing to show yet."
      }
    </div>
  )
}

export default viewPass
