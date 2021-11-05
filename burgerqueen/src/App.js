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
let initialMenuState = {}
const prices = {}

for (let item of breakData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}
for (let item of lunchData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}


const mult = (obj1, obj2) => {
    let sum = 0;
    const arr1 = Object.values(obj1);
    const arr2 = Object.values(obj2);

    for(let i=0; i< arr2.length; i++) {
        sum += parseInt(arr1[i])*arr2[i];
    }
    return sum
}

function App() {
    const reducer = (state, action) => {
        switch (action.type) {
        case "actionBreak":
            return {...state, menuData: breakData}
        case "actionLunch":
            return {...state, menuData: lunchData}
        case "changeValue":
            let newMenuState = state.menuState
            newMenuState[action.item] = action.value
            let thePrices = mult(newMenuState, prices);
            return {...state, menuState: newMenuState, totalPrices: thePrices}
        case "changeInputs":
            return {...state, [action.fields]: action.inputs}    
        case "cleanInputs":
            return initialStateClean
            
        default:
        throw new Error();
        } 
    }
    const initialStateClean = {
        
        menuData: breakData,
        menuState: initialMenuState,
        totalPrices: 0,
        name: '',
        table:'',
        comment: '',
        
    }

    const initialState = JSON.parse(JSON.stringify(initialStateClean));
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
                                initialState = {initialState}
                                state = {state}
                                menuData={state.menuData}
                                menuState={state.menuState}
                                on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}
                                prices = {state.totalPrices}
                                comment= {state.comment}
                                handleInputChange={e => dispatch({type: "changeInputs", fields: e.target.name, inputs: e.target.value})}
                                handleCleaner={e => dispatch ({type: 'cleanInputs'})}
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
                                    state = {state}
                                    menuData={state.menuData}
                                    menuState={state.menuState}
                                    on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}
                                    prices = {state.totalPrices}
                                    comment = {state.comment}
                                    handleInputChange={e => dispatch({type: "changeInputs", fields: e.target.name, inputs: e.target.value})}
                                    handleCleaner={e => dispatch ({type: 'cleanInputs'})}
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