import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { useEffect, useState} from "react";
import '../kitchen/kitchen.scss'
import { updateOrder } from "../firebase/functionsFirebase";

const Kitchen = () => {

    const handleUpdateInit = (id, state_, temp1) => {
        updateOrder(id, {
            state: state_,
            tempInit: temp1
        });
    }
    const handleUpdateEnd = (id, state_, temp2) => {
        updateOrder(id, {
            state: state_,
            tempEnd: temp2
        });
    }
    const [value, setValue] = useState();


    useEffect(() => {         
        const callOrders = () => {
            const orderRef = collection(db, "orders"); 
            onSnapshot(query(orderRef, orderBy("date", "desc")),{includeMetadataChanges:true},(querySnapshot) => {
                let clients = []
                let orders
                    querySnapshot.forEach((doc) => {
                    clients.push({...doc.data(), id: doc.id});
                });
                orders = clients.filter((e) =>  e.state !== "Entregado");
                setValue(orders); 
                const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
                console.log("Kitchen Data came from " + source);
            });           
        }
        callOrders()
    }, []);  
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
                            <div className="btnKitchen"> 
                    {(() => {switch (item.state) {
                        case 'Enviado':
                            return <button className='btnReceived' onClick={()=> handleUpdateInit(item.id, 'En proceso', new Date().getMinutes())}>Preparar</button>
                        case 'En proceso':
                            return <button className='btnReady' onClick={()=> handleUpdateEnd(item.id, 'Listo', new Date().getMinutes())}>Listo</button>
                        case 'Listo':
                            return <p>¡Tardaste {Math.abs(item.tempEnd-item.tempInit)} Minutos en preparar la orden!</p>
                        default:
                            break;
                    }})()}    
                        </div>          
                    </div>
                )}
            </div>
        </>  
    )
}

export default Kitchen