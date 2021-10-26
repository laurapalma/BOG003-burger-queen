

export const ModalContent = ({ subtotal, quants, text, prices}) => {
    console.log('preciomodal', prices)
    return(
        <>
        {quants.map((e, i) => {
            return <div key={i}>
                        <h2> {e} {text[i]} $ {subtotal[i]} </h2>
                    </div>
        })}
        <h1>{prices}</h1>
        
        
        </>
    )
}
