import { onSnapshot, collection } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { useEffect, useState} from "react";
import '../kitchen/kitchen.scss'
import { updateOrder } from "../firebase/functionsFirebase";

const Kitchen = () => {
    const handleUpdate = (id, state_) => {
        updateOrder(id, {state: state_});
    }
    const [value, setValue] = useState()
    const filterHelp = (e) => {
        if ( (e.state !== "Entregado") || (e.state !== "Listo")) {
            return true
        }
        else {
            return false
        }
    }
    
    useEffect(() => {         
        const callOrders = () => { 
            onSnapshot(collection(db, "orders"), (querySnapshot) => {
                let clients = []
                let orders
                    querySnapshot.forEach((doc) => {
                    clients.push({...doc.data(), id: doc.id});
                });
                orders = clients.filter((e) => filterHelp(e));
                setValue(orders);    
            });           
        }
        callOrders()
    }, []);  
    console.log(value);
    return(
        <>
            <div className='orderkitchens'>
                {value && value.map(item => 
                    <div key={item.id} className='orderSummary'>
                        <h1>Mesa {item.table.table}: {item.name.name}</h1>
                        {item.quant.quants.map((quant, i )=> 
                            <div key={i} className='products'>
                                <h4>{quant}</h4>
                                <h3>{item.product.text[i]}</h3>
                            </div>
                            )}
                    {item.state === 'Enviado'
                    ? <button className='btnReceived' onClick={()=> handleUpdate(item.id, 'En proceso')}>Preparar</button> 
                    : <button className='btnReady' onClick={()=> handleUpdate(item.id, 'Listo')}>Listo</button>}    
                        <p></p>                 
                    </div>
                )}
            </div>
        </>  
    )
}

export default Kitchen