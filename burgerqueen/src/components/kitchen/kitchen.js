import { onSnapshot, collection } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { useEffect, useState} from "react";
import '../kitchen/kitchen.scss'

const Kitchen = () => {

    const [value, setValue] = useState()
    
    useEffect(() => {         
        const callOrders = () => { 
            onSnapshot(collection(db, "orders"), (querySnapshot) => {
                let clients = []
                    querySnapshot.forEach((doc) => {
                    clients.push({...doc.data(), id: doc.id});
                });
               console.log(clients); 
               setValue(clients);    
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
                        <button>Recibido</button> 
                        <p></p>                 
                    </div>
                )}
            </div>
        </>  
    )
}

export default Kitchen