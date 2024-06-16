import { React, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom'
import './login.css'
import loaderSVG from '../assets/loader.svg'
const login = () => {
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    function doRegister() {
        let email = document.getElementById('email').value
        let pass = document.getElementById('password').value
        let name = document.getElementById('name').value
        let pin = document.getElementById('pin').value
        if (email == '' || pass == '' || name == '' || pin == '') {
            setErrorMessage("Please fill all details")
        }
        else if (String(pin).length != 4) {
            setErrorMessage("Please enter a valid 4 digit pin")
        }
        else {
            try {
                document.getElementById('loginBut').innerHTML = `<img id="loader" src=${loaderSVG} alt="Loading ..." />`
                fetch(`http://127.0.0.1/register?email=${email}&password=${pass}&name=${name}&pin=${pin}`)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.status == true) {
                            navigate('/login', { data: data });
                        }
                        else {
                            document.getElementById('loginBut').innerHTML = `Login`
                            setErrorMessage(data.message ? data.message : "Some error occurred")
                        }
                    })
                    .catch(() => {
                        document.getElementById('loginBut').innerHTML = `Login`
                        setErrorMessage("Failed to connect, try again.")
                    })
            }
            catch (error) {
                document.getElementById('loginBut').innerHTML = `Login`
                setErrorMessage("Failed to connect, try again.")
            }
        }
    }
    return (
        <div className='loginbox'>
            <div className="formbox register-box">
                <h2>Register</h2>
                <label for="name">Name</label>
                <input type="text" name="name" id="name" placeholder="Spiderman" required></input>
                <label for="email">E-Mail</label>
                <input type="email" name="email" id="email" placeholder="your@email.com" required></input>
                <label for="password">Password</label>
                <input type="password" name="password" id="password" placeholder="shh! ... Password!" required></input>
                <label for="pin">Pin</label>
                <input type="number" min="0000" max="9999" name="pin" id="pin" placeholder="Your 4-digit pin to view saved passwords." required></input>
                <button onClick={doRegister} id='loginBut'>Register</button>
            </div>
            <div className='registerLink'>
                Already have an account? &nbsp;
                <NavLink to="/login"><b>Login</b></NavLink>
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
    )
}

export default login
