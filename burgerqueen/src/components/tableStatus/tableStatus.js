import React from 'react'
import './tableStatus.scss'

const Tablestatus = (props) => {
    return(
        <div className='tablesContainer'>
            <h3>Mesa 1</h3>
                <h4> Disponible </h4>
            <h3>Mesa 2</h3>
                <h4> Enviado </h4> 
            <h3>Mesa 3</h3> 
                <h4> En Proceso </h4>
            <h3>Mesa 4</h3> 
                <h4> Pedido Listo </h4>
            <h3>Mesa 5</h3> 
                <h4> Enviado </h4>
            <h3>Mesa 6</h3>      
                <h4> Entregado </h4>
        </div>        
    )
}

export default Tablestatus