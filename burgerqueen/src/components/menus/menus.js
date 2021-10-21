import React from 'react'
import './menus.scss'

const Menus = ({dispatch, actionA, actionB}) => {
    return (
    <div className='menuContainer'>
        <button onClick = {e => dispatch({type:actionA})}>
            Desayuno
        </button>
        <button onClick = {e => dispatch({type:actionB})}>
            Almuerzo/Cena
        </button>
    </div>
    )
}

export default Menus