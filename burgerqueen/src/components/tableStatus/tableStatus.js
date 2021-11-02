import React, {useState, useEffect} from 'react'
import './tableStatus.scss'
import { onSnapshot, collection } from "firebase/firestore";
import db  from "../firebase/firebaseConfig"

const Tablestatus = (props) => {
        const [table, setTable] = useState()
        
        useEffect(() => {         
            const callOrders = () => { 
                onSnapshot(collection(db, "orders"), (querySnapshot) => {
                    let clients = []
                        querySnapshot.forEach((doc) => {
                        clients.push({...doc.data(), id: doc.id});
                    });
                   console.log(clients); 
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
                            <h4>{item.state}</h4>                 
                        </div>
                    )}
                </div>
            </>  
        )
    }
export default Tablestatus