import React from 'react'
import './passCard.css'
import globeSVG from '../assets/globe.svg'
import deleteSVG from '../assets/delete.svg'
const passCard = (props) => {
    const show = (id) => {
        document.getElementById(id).children[1].classList.contains("show") ? document.getElementById(id).children[1].classList.remove("show") : document.getElementById(id).children[1].classList.add("show")
        document.getElementById(id).children[2].classList.contains("show") ? document.getElementById(id).children[2].classList.remove("show") : document.getElementById(id).children[2].classList.add("show")
        document.getElementById(id).children[3].classList.contains("show") ? document.getElementById(id).children[3].classList.remove("show") : document.getElementById(id).children[3].classList.add("show")
    }

    return (
        <div onClick={() => { show(props.index) }} id={props.index} className='card'>
            <h3><img src={globeSVG} />{props.site}</h3>
            <p>Username : {props.siteusername}</p>
            <p>Password : {props.sitepassword}</p>
            <p className='passActions'>
                <button className='passbut' onClick={(e)=>{e.stopPropagation();console.log('delete')}} >
                    <img id='deletesvg' src={deleteSVG} alt="" />
                </button>
                <button className='passbut' onClick={(e)=>{e.stopPropagation();console.log('delete')}} >
                    Copy Username
                </button>
                <button className='passbut' onClick={(e)=>{e.stopPropagation();console.log('delete')}} >
                    Copy Password
                </button>
            </p>
        </div>
    )
}

export default passCard
