import React from 'react'
import './takingOrders.scss'
import Modal from '../modal/modal.js'
import { useModal } from '../../hooks/useModal'
import '../modal/modal.scss'



const Takingorders = ({menuData, menuState, on_change, prices}) => {
    let table
    let name
    let quants
    let text = [];
    let subtotal = [];
    const clickEnviar = () => {
        table = document.getElementById('selectTable').value;
        name = document.getElementById('nameUser').value;
        const keys = Object.entries(menuState); // Para obtener arreglo con las propiedades
        quants = keys.filter((key)=> key[1] !== '0'); // Para obtener los productos (key) que pidió el cliente
        const letras = quants.map((e)=> e[0]);  // Para obtener solo las keys 
        for (let i=0; i < letras.length; i++){ // ciclo que recorre las keys de los productos seleccionados
            for (let j=0; j< menuData.length; j++){  // Ciclo anidado que recorre cada elemento del menú 
                if (menuData[j].key === letras[i]){  // Validar si la key actual es igual a alguna de las que tiene el menú
                    text.push(menuData[j].producto); // Si se cumple la condición anterior, extraemos el nombre de ese producto
                    subtotal.push(quants[i][1]*menuData[j].precio); // obtenemos el precio total del producto actual 
                }
            }
        }
       /* return ( <Modal 
            table={table}
            name={name}
            quants = {quants}
            text = {text}
            subtotal = {subtotal}
            total = {prices}
        />) */
    }

    const [isOpenModal, openModal, closeModal] = useModal(false); 

    return (
        <section>
                <div className="infoTable">
                    <select id='selectTable' onChange={e=> e.target.value}>
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
                        type="text"
                        placeholder=" Nombre del Cliente"
                    />
                </div>
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
                <p>Total: {prices} </p>
                <button onClick = { () =>{clickEnviar() ; openModal()}}>Enviar</button>
                <Modal isOpen ={isOpenModal} closeModal={closeModal}>
                    <h1>{name}</h1>
                    <h2>Hola</h2> 
                </Modal>
        </section>   
    )
}

export default Takingorders