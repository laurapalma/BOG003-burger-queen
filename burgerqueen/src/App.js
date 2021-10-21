import React, { useReducer } from 'react';
import Header from './components/header/header';
import Menu from './components/menus/menus';
import TableStatus from './components/tableStatus/tableStatus';
import TakingOrders from './components/takingOrders/takingOrders';
import Kitchen from './components/kitchen/kitchen';
import Data from './components/menus/menus.json';
import './App.scss';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

const breakData = Data[0]["desayunos"]["opciones"]
const lunchData = Data[0]["Almuerzo/cena"]["opciones"]
let initialMenuState = []
const prices = []

for (let item of breakData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}
for (let item of lunchData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}

function App() {
    const reducer = (state, action) => {
        switch (action.type) {
        case "actionBreak":
            return {...state, menuDiv: {...state.menuDiv, menuData: breakData}}
        case "actionLunch":
            return {...state, menuDiv: {...state.menuDiv, menuData: lunchData}}
        case "changeValue":
            let newMenuState = state.menuDiv.menuState
            newMenuState[action.item] = action.value
            console.log('actionValue', action.value)
            return {...state, menuDiv: {...state.menuDiv, menuState: newMenuState}}
        default:
        throw new Error();
        } 
    }
    const initialState = {
        menuDiv: {
                    menuData: breakData,
                    menuState: initialMenuState,
                    totalValue: 0,
                }
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        <Router>
            <div>
                <Header />
                <Switch>
                    <Route path='/mesero'>
                        <div className='containerPrincipal'>
                            <Menu 
                                dispatch={dispatch}
                                actionA={"actionBreak"}
                                actionB={"actionLunch"}
                            />
                            <TakingOrders
                                menuData={state.menuDiv.menuData}
                                menuState={state.menuDiv.menuState}
                                on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}
                            />
                            <TableStatus  />
                        </div>
                    </Route>
                    <Route path='/cocina'>
                        <Kitchen />
                    </Route>
                    <Route path='/'>
                        <div className='containerPrincipal'>
                            <Menu 
                                    dispatch={dispatch}
                                    actionA={"actionBreak"}
                                    actionB={"actionLunch"}
                            />
                            <TakingOrders
                                    menuData={state.menuDiv.menuData}
                                    menuState={state.menuDiv.menuState}
                                    on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}
                            />
                            <TableStatus />
                        </div>
                    </Route>
                    
                </Switch>
            </div>
        </Router>
    )
}

export default App;