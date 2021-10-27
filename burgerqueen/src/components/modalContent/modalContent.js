

export const ModalContent = ({ name, table, subtotal, quants, text, prices}) => {
    if (quants) {
        return(
            <>
            <h1>Mesa: {table}</h1>
            <h2> Cliente: {name}</h2>
            {quants.map((e, i) => {
                return <div key={i}>
                            <h2> {e} {text[i]} ${subtotal[i]} </h2>
                        </div>
            })}
            <h1>Total a pagar ${prices}</h1>
            
            
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
