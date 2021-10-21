import React from 'react'

const Menus = ({dispatch, actionA, actionB}) => {
    return (
    <div>
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