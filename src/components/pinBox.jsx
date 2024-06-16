import React from 'react'
import './pinBox.css'
const pinBox = () => {
    return (
        <div className='pinBox'>
            <h2>Verification</h2>
            <label for="pin">Enter your pin</label>
            <input type="number" min="0000" max="9999" name="pin" id="pin" placeholder="Enter your 4-digit pin." required></input>
            <button onClick={verify} id='verifyBut'>Verify</button>
        </div>
    )
}

export default pinBox
