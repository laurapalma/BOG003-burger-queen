import React, {useEffect} from 'react'
import {collection, getDocs} from 'firebase/firestore'
import db from '../firebase/firebaseConfig.js'



export const ModalContent = ({name, table, subtotal, quants, text, prices}) => {
    useEffect(() => {
        const getData =  async () => {
            const datos = await getDocs(collection(db, 'pedidos'));
            console.log('Firebase: ', datos.docs[0].data());
        }
        getData();
        
    }, []);
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
            <button>Confirmar Pedido</button>
            
        
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
