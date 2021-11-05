import { createOrder } from '../firebase/functionsFirebase.js'

export const ModalContent = ({initialState, name, table, subtotal, quants, text, prices, closeModal,handleCleaner}) => {
    const date = new Date().getTime();

    const handleModal = () => {
        createOrder({table}, {name}, {quants}, {text}, {subtotal}, {prices}, 'Enviado', date, '', '' ); 
        closeModal();
        handleCleaner()
    }       
    
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
            <button onClick={handleModal}>Confirmar Pedido</button>           
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
