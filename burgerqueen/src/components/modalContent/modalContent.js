

export const ModalContent = ({name, table, subtotal, quants, text, prices}) => {
    if (quants) {
        return(
            <>
            <h2 className='table'>Mesa: {table}</h2>
            <h2 className='user'> Cliente: {name}</h2>
            {quants.map((e, i) => {
                return <div key={i}>
                            <h2 className='product'> {e} {text[i]} <p> ${subtotal[i]} </p> </h2>                            
                        </div>
            })}
            <h2 className='total'>Total a pagar <p> ${prices} </p></h2>
        
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
