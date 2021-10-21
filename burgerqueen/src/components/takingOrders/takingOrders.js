import React from 'react'
import './takingOrders.scss'

const Takingorders = ({menuData, menuState, on_change}) => {
    console.log('menuState', menuState)
    return (
        <section>
            <input 
                    className="nameUser"
                    type="text"
                    placeholder="Nombre del Cliente"
                    />
        {menuData.map((item, i) => 
                <div key={i} className='orderContainer'>
                    <h6>
                    {item.producto}
                    </h6>
                    <input 
                        type="number" 
                        id={item["key"] + "_id"} 
                        name={item["key"]} 
                        value={menuState[item["key"]]} 
                        step="1" 
                        min="0"
                        onChange = {on_change}
                    />
                    <p>
                    {parseInt(menuState[item["key"]])*parseInt(item["precio"])}
                    </p>
                </div>
        )}
        </section>
        
    )
}

export default Takingorders