import React from 'react'
import './takingOrders.scss'
import Modal from '../modal/modal.js'
import { useModal } from '../../hooks/useModal'
import { ModalContent } from '../modalContent/modalContent.js'
import '../modal/modal.scss'



const Takingorders = ({initialState, state, menuData, menuState, on_change, handleInputChange, prices}) => {

    let text=[], subtotal=[], cant, name, table, quants 
        let message = document.getElementById('message')
        name = state.name;
        table = state.table;
        const keys = Object.entries(menuState); // Para obtener arreglo con las propiedades
        quants = keys.filter((key)=> key[1] !== '0'); // Para obtener los productos (key) que pidió el cliente
        cant  = quants.map((e)=> e[1]); 
        const letras = quants.map((e)=> e[0]);  // Para obtener solo las keys 
        for (let i=0; i < letras.length; i++){ // ciclo que recorre las keys de los productos seleccionados
            for (let j=0; j< menuData.length; j++){  // Ciclo anidado que recorre cada elemento del menú 
                if (menuData[j].key === letras[i]){  // Validar si la key actual es igual a alguna de las que tiene el menú
                    text.push(menuData[j].producto); // Si se cumple la condición anterior, extraemos el nombre de ese producto
                    subtotal.push(parseInt(quants[i][1])*parseInt(menuData[j].precio)); // obtenemos el precio total del producto actual 
                }
            }
        }

    const [isOpenModal, openModal, closeModal] = useModal(false); 
 
    const validationOrder =() => {
        if (message === null) {
            alert('No has hecho un pedido')
            window.location.reload()         
        }else if (table === '' || name === ''){
            message.innerHTML= `Por favor rellene todos los campos`        
        } else {
            openModal()
        }
    }

    return (
        <>
        <section>
                <div className="infoTable">
                    <select id='selectTable' onChange= {e => handleInputChange(e)} name='table' value = {state.table}>
                        <option value='0'>Mesas</option>
                        <option value='1'>Mesa 1</option>
                        <option value='2'>Mesa 2</option>
                        <option value='3'>Mesa 3</option>
                        <option value='4'>Mesa 4</option>
                        <option value='5'>Mesa 5</option>
                        <option value='6'>Mesa 6</option>
                    </select>
                    <input 
                        className="nameUser"
                        id='nameUser'
                        name='name'
                        type="text"
                        placeholder=" Nombre del Cliente"
                        value = {state.name}
                        onChange = {e => handleInputChange(e)}
                    />
                </div>
                <p id='message' className='message'></p>
                {menuData.map((item, i) => 
                <div key={i} className='orderContainer'>
                    <h6>{item.producto}</h6>
                    <input 
                            type="number" 
                            id={item["key"] + "_id"} 
                            name={item["key"]} 
                            value={menuState[item["key"]]} 
                            step="1" 
                            min="0"
                            onChange = {on_change}
                    />
                    <p> $ {parseInt(menuState[item["key"]])*parseInt(item["precio"])}</p>
                </div>
                )}
                <div className="totalContainer">
                        <p>Total: </p>
                    <div>
                        <p>$ {prices}</p>
                    </div>
                </div>
                <div className="divBton">
                <button className="btnOrders" onClick = { () =>{ validationOrder(); } }>Enviar</button>
                </div>
        </section> 
        <Modal isOpen ={isOpenModal} closeModal={closeModal}>
                    <ModalContent
                    initialState={initialState}
                    table={table}
                    name={name}
                    quants={cant}
                    text={text}
                    subtotal={subtotal}
                    prices={prices}  
                    closeModal={closeModal}  
                    />
        </Modal>
        
        </> 
    )
}

export default Takingorders