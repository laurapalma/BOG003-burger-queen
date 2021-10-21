import React from 'react'
import './takingOrders.scss'

const Takingorders = ({menuData, menuState, on_change}) => {
    console.log('menuState', menuState)
    return (
        <>
        {menuData.map((item, i) => 
                <div key={i} className='orderContainer'>
                    <p>
                    {item.producto}
                    </p>
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
        </>
        
    )
}

export default Takingorders