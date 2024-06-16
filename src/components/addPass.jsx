import { React, useState, useEffect } from 'react'
import './addPass.css'
import { useNavigate } from 'react-router-dom';
import loaderSVG from '../assets/loader.svg'
import Cookie from '../helpers/cookie';
import passCrypt from "../helpers/passCrypt";
const addPass = () => {
  var user = {}
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
  }, [])
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  async function addPassword() {
    let site = document.getElementById('site').value
    let siteusername = document.getElementById('siteusername').value
    let sitepassword = document.getElementById('sitepassword').value
    if (site == '' || siteusername == '' || sitepassword == '') {
      setErrorMessage("Please fill all details")
    }
    else {
      try {
        document.getElementById('addbut').innerHTML = `<img id="loader" src=${loaderSVG} alt="Loading ..." />`
        user = JSON.parse(await Cookie.getCookie("user"))
        let USERPASS = await passCrypt.crypt(user.pass)
        fetch(`http://127.0.0.1/addPass?site=${site}&sitepassword=${sitepassword}&siteusername=${siteusername}&user=${user.accID}&userpass=${USERPASS}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.status == true) {
              document.getElementById('site').value=""
              document.getElementById('siteusername').value=""
              document.getElementById('sitepassword').value=""
              document.getElementById('addbut').innerHTML = `Add`
              setSuccessMessage("Password secured successfully.")
            }
            else {
              document.getElementById('addbut').innerHTML = `Add`
              setErrorMessage("Some error occured")
            }
          })
          .catch(() => {
            document.getElementById('addbut').innerHTML = `Add`
            setErrorMessage("Failed to connect, try again.")
          })
      }
      catch (error) {
        document.getElementById('addbut').innerHTML = `Add`
        setErrorMessage("Failed to connect, try again.")
      }
    }
  }
  return (
    <div data-scroll className='addWrap'>
      <div className='loginbox addbox'>
        <div className="addformbox formbox">
          <h2>Add Password</h2>
          <label for="site">Website</label>
          <input type="url" name="site" id="site" placeholder="example.com" required></input>
          <label for="siteusername">Username / E-mail</label>
          <input type="text" name="siteusername" id="siteusername" placeholder="username / e-mail" required></input>
          <label for="sitepassword">Password</label>
          <input type="text" name="sitepassword" id="sitepassword" placeholder="shh! ... Password!" required></input>
          <button onClick={addPassword} id='addbut'>Add</button>
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        {successMessage && <div className="error-message success-message">{successMessage}</div>}
      </div>
    </div>
  )
}

export default addPass
