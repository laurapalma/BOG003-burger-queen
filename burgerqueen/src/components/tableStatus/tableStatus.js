import React, {useState, useEffect} from 'react'
import './tableStatus.scss'
import { onSnapshot, collection, orderBy, query } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"

const Tablestatus = (props) => {
        const [table, setTable] = useState()
        
        useEffect(() => {         
            const callOrders = () => { 
                const orderRef = collection(db, "orders");
                onSnapshot(query(orderRef, orderBy("table")), (querySnapshot) => {
                    let clients = []
                        querySnapshot.forEach((doc) => {
                        clients.push({...doc.data(), id: doc.id});
                    });
                setTable(clients);    
                });           
            }
            callOrders()
        }, []); 
        console.log(table);
        return(
            <>
                <div className='tablesContainer'>
                    {table && table.map(item => 
                        <div key={item.id} className='state'>
                            <h3>Mesa {item.table.table}</h3>                            
                            <h4>Estado: {item.state}</h4>
                            <button>Entregado</button>                 
                        </div>
                    )}
                </div>
            </>  
        )
    }
export default Tablestatus