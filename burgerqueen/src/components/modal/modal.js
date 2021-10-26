import React from 'react'
import './modal.scss'


const Modal = ({children, isOpen, closeModal}) => {
    return(
        <article className={`modal ${isOpen && 'isOpen'}`}>
            <div className='modalContainer'>
                <button className='close' onClick={closeModal}>X</button>
                {children}
            </div>
        </article> 
    )
}

export default Modal