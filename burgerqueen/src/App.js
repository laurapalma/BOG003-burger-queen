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

/* Declaramos una constante para llamar nuestro menu de desayunos y almuerzo/cena
   e inicializamos variables vacias para se vayan llenando con sus respectivos 
   cantidades y precios. */
const breakData = Data[0]["desayunos"]["opciones"]  
const lunchData = Data[0]["Almuerzo/cena"]["opciones"] 
let initialMenuState = {} 
const prices = {} 

/*Obtenemos el arreglo inicial de cantidades comenzando en ceros, el precio no lo 
  igualamos a cero si no colocamos el precio verdadero de breakData y lunchData, 
  cada elemento tiene su respectiva key, su precio y producto. Asi al precio se
  extran las keys y se les asigna su precio correspodiente */
for (let item of breakData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}
for (let item of lunchData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]  
}

/* Esta función nos permite calcular el total de la cuenta y se guarda el valor 
   del pedido */
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
    // Declaramos una función con dos parametros state el estado anterior y (action) para que modifique el estado
    const reducer = (state, action) => {
        switch (action.type) {
        // actionBreak permite seleccionar el botón del menu de desayuno
        case "actionBreak":
            return {...state, menuData: breakData}
        // actionLunch permite seleccionar el botón del menu de Almuerzo/cena
        case "actionLunch":
            return {...state, menuData: lunchData}
        /* changeValue permite seleccionar la cantidad del producto y asi retorna el precio del producto e 
           igualmente el total de la cuenta */
        case "changeValue":
            let newMenuState = state.menuState
            newMenuState[action.item] = action.value
            let thePrices = mult(newMenuState, prices);
            return {...state, menuState: newMenuState, totalPrices: thePrices}
        // changeInputs permite escribir el nombre del cliente en el input
        case "changeInputs":
            return {...state, [action.fields]: action.inputs}    
        // cleanInputs limpia los campos
        case "cleanInputs":
            return initialStateClean
            
        default:
        throw new Error();
        } 
    }

    // Objeto que guarda el estado inicial
    const initialStateClean = {
        
        menuData: breakData,
        menuState: initialMenuState,
        totalPrices: 0,
        name: '',
        table:'',
        comment: '',
        
    }
    /* Se crea un copia profunda con dos metodos como lo son: 'JSON.parse (toma una cadena JSON y la 
       transforma en un objeto de JavaScript)' y 'JSON.stringify (toma un objeto de JavaScript y lo 
       transforma en una cadena JSON.)' */
    const initialState = JSON.parse(JSON.stringify(initialStateClean));
    // Se inicializa el useReduce 
    const [state, dispatch] = useReducer(reducer, initialState);

    return(
        // Se realiza el routing para la pagina 
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
                                // dispatch es lo que uno quiere que haga
                                on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}//
                                // props se pasa información del app a un componente mas pequeño en este caso takingOrders
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