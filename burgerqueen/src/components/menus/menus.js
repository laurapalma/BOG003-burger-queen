import React, {useState} from 'react'
import Hamburguesa from './img/Hamburguesa.webp'
import Sandwich from './img/Sandwich.webp'
import './menus.scss'

const Menus = ({dispatch, actionA, actionB}) => {
    const [style, setStyle] = useState(true);
    const bgStyle = {color: '#62EFFF'}
    const bgStyle2 = { boxShadow: 'inset 2px 4px 50px 50px rgba(255,255,255,0.52)'}
    return (
    <div className='menuContainer'>
        <img src={Sandwich} alt='Sandwich' onClick = { (e) => { dispatch({type:actionA}) ; setStyle(!style) }}style={style ? bgStyle2 : bgStyle}/>

        <img src={Hamburguesa} alt='burguer' onClick = { (e) => { dispatch({type:actionB}) ; setStyle(!style) }}style={style ? bgStyle : bgStyle2}/>
    </div>
    )
}

export default Menus