import React from 'react'
import Hamburguesa from './img/Hamburguesa.png'
import Sandwich from './img/Sandwich.png'
import './menus.scss'

const Menus = ({dispatch, actionA, actionB}) => {
    return (
    <div className='menuContainer'>
        <img src={Hamburguesa} alt='burguer' onClick = {e => dispatch({type:actionA})}/>
        <img src={Sandwich} alt='Sandwich' onClick = {e => dispatch({type:actionB})}/>
    </div>
    )
}

export default Menus