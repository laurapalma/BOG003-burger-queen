import React from 'react'
import letras from './img/letras.png'
import burguer from './img/burguer.png'
import dish from './img/dish 1.png'
import chef from './img/chef.png'
import './header.scss'

const Header = (props) => {
    return(
        <header>
           <img className='letters' src={letras} alt='burguerqueen'></img>
           <img className='burguer' src={burguer} alt='burguerqueen'></img>
           <h2 className='hours'>24 hrs</h2>
           <img className='dish' src={dish} alt='burguerqueen'></img>
           <h4 className='waiter'>Modo mesero</h4>
           <img className='chef' src={chef} alt='burguerqueen'></img>
           <h4 className='kitchen'>Modo cocina</h4>
        </header>   
    )
}

export default Header