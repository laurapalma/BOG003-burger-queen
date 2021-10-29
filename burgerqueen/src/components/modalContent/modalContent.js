import React, {useEffect} from 'react'
import { createOrder, getOrders, getOrder, updateOrder } from '../firebase/functionsFirebase.js'


export const ModalContent = ({name, table, subtotal, quants, text, prices, closeModal}) => {
    /* useEffect(() => {
        const callOrders = async () => { 
            createOrder(4, 'Laura', 17, 'café', 17, 10, 'pendiente');
            const querySnapshot =  await getOrders();
            querySnapshot.forEach((doc) => {
                console.log(doc.data());    
            })
            const orderById = await getOrder('FuL2iskyrssmKw3VbHWf');
           // console.log('con el Id', orderById.data());
            updateOrder('FuL2iskyrssmKw3VbHWf', {
                state: 'ok'
            })
            console.log('Actualizado', orderById.data());
        }
        callOrders()
    }, []); */
    if (quants) {
        return(
            <>
            <div className='client'>
                <h2 className='table'>Mesa: {table}</h2>
                <h2 className='user'> Cliente: {name}</h2> 
            </div>
            {quants.map((e, i) => {
                return <div key={i} className='productList'>
                            <h2 className='product'> <span>{e}</span>   {text[i]}</h2>
                            <p> ${subtotal[i]} </p>                         
                        </div>
            })}
            <div className='totalPrice'>
                <h2 className='total'>Total a pagar</h2>
                <p className='totalNumber'> ${prices} </p>
            </div>
            <button onClick={ (e) => {createOrder({table}, {name}, {quants}, {text}, {subtotal}, {prices}, 'enviado'); closeModal()}}>Confirmar Pedido</button>
            
        
            </>
        )
    }  else {
        return(
            <>
            <p>Esperando...</p>
            
            </>
        )
    }
}
