import { React, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import Cookie from '../helpers/cookie';
import './login.css'
import loaderSVG from '../assets/loader.svg'
import passCrypt from "../helpers/passCrypt";
const login = (props) => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    async function dologin() {
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        if (email == '' || pass == '') {
            setErrorMessage("Please fill all details")
        }
        else {
            try {
                const PASS = await passCrypt.crypt(pass)
                document.getElementById('loginBut').innerHTML=`<img id="loader" src=${loaderSVG} alt="Loading ..." />`
                fetch(`http://127.0.0.1/login?email=${email}&password=${PASS}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == true) {
                            Cookie.setCookie("logged", true, 7);
                            Cookie.setCookie("user", JSON.stringify(data.user), 7);
                            navigate('/');
                        }
                        else {
                            document.getElementById('loginBut').innerHTML=`Login`
                            setErrorMessage("Invalid Credentials")
                            navigate('/login')
                        }
                    })
                    .catch(() => {
                        document.getElementById('loginBut').innerHTML=`Login`
                        setErrorMessage("Failed to connect, try again.")
                    })
            }
            catch (error) {
                document.getElementById('loginBut').innerHTML=`Login`
                setErrorMessage("Failed to connect, try again.")
            }
        }
    }
    return (
        <div className='loginbox'>
            <div className="formbox">
                <h2>Login</h2>
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" placeholder="your@email.com" required></input>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="shh! ... Password!" required></input>
                <button onClick={dologin} id='loginBut'>Login</button>
            </div>
            <div className='registerLink'>
                Do not have an account? &nbsp;
                <NavLink to="/register"><b>Register</b></NavLink>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}

export default login
