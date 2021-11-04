import React, {useState, useEffect} from 'react'
import './tableStatus.scss'
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"
import { updateOrder } from '../firebase/functionsFirebase';

const Tablestatus = (props) => {
        const [table, setTable] = useState()
        
        useEffect(() => {         
            const callOrders = () => { 
                const orderRef = collection(db, "orders");
                onSnapshot(query(orderRef, orderBy("table")),{includeMetadataChanges:true},(querySnapshot) => {
                    let clients = [];
                    let orders
                        querySnapshot.forEach((doc) => {
                        clients.push({...doc.data(), id: doc.id});
                    });
                    orders = clients.filter((e)=> e.state !== "Entregado")
                    setTable(orders);  
                    const source = querySnapshot.metadata.fromCache ? "local cache" : "server";
                    console.log("Data came from " + source);  
                });           
            }
            callOrders()
        }, []); 
        
        return(
            <>
                <div className='tablesContainer'>
                    {table && table.map(item => 
                        <div key={item.id} className='state'>
                            <h3>Mesa {item.table.table}</h3>                            
                            <h4>Estado: {item.state}</h4>
                            <button onClick={() => updateOrder(item.id, {state:"Entregado"})}>Entregar</button>                 
                        </div>
                    )}
                </div>
            </>  
        )
    }
export default Tablestatus