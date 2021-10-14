import React, { useState } from 'react'
import letras from './img/letras.png'
import burguer from './img/burguer.png'
import dish from './img/dish 1.png'
import chef from './img/chef.png'
import './header.scss'

const Header = (props) => {
    const [style, setStyle] = useState(false);
    const bgStyle = {color: '#62EFFF'}
    const bgStyle2 = { boxShadow: 'inset 2px 4px 50px 50px rgba(255,255,255,0.52)'}

    return(
        <header>
           <img className='letters' src={letras} alt='burguerqueen'></img>
           <img className='burguer' src={burguer} alt='burguerqueen'></img>
           <h2 className='hours'>24 hrs</h2>
           <img className='dish' src={dish} alt='burguerqueen' onClick={ () => setStyle(!style) } style={style ? bgStyle2 : bgStyle} ></img>
           <h4 className='waiter'>Modo mesero</h4>
           <img className='chef' src={chef} alt='burguerqueen' onClick={ () => setStyle(!style) } style={style ? bgStyle : bgStyle2}></img>
           <h4 className='kitchen'>Modo cocina</h4>
        </header>   
    )
}

export default Header