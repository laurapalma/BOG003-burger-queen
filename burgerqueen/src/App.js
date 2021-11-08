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

/* Recorremos los menús para desayuno y para almuerzo/cena, 
llenamos la variable initialMenuState con tantos ceros como productos tiene el menú
Llenamos la variable prices con los precios de cada producto en el menú */
for (let item of breakData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]
}
for (let item of lunchData){
  initialMenuState[item["key"]] = "0"
  prices[item["key"]] = item["precio"]  
}

/* Esta función nos permite calcular el total de la cuenta y retorna el valor 
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
    // Declaramos el reducer con dos parametros state el estado y (action) para que modifique el estado
    const reducer = (state, action) => {
        switch (action.type) {
        // actionBreak sucede cuando se  selecciona el botón del menu de desayuno y renderiza el respectivo menú
        case "actionBreak":
            return {...state, menuData: breakData}
        // actionLunch sucede cuando se  selecciona el botón del menu de Almuerzo/cena y renderiza el respectivo menú
        case "actionLunch":
            return {...state, menuData: lunchData}
        /* changeValue sucede cuando  se cambia la cantidad de los productos y asi retorna el precio de los productos
         y calcula  el total de la cuenta */
        case "changeValue":
            let newMenuState = state.menuState
            newMenuState[action.item] = action.value
            let thePrices = mult(newMenuState, prices); // Guardamos el total de la cuenta en la variable thePrices
            return {...state, menuState: newMenuState, totalPrices: thePrices}
        /* changeInputs sucede cuando se escribe el nombre del cliente en el input,
         se selecciona la mesa o se escribe el comentario a cocina y actualiza el estado */
        case "changeInputs":
            return {...state, [action.fields]: action.inputs}    
        // cleanInputs limpia los campos retornando el estado inicial limpio
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
    /* Se crea un copia profunda del estado inicial con dos metodos como lo son: 'JSON.parse (toma una cadena JSON y la 
       transforma en un objeto de JavaScript)' y 'JSON.stringify (toma un objeto de JavaScript y lo 
       transforma en una cadena JSON.)' */
    const initialState = JSON.parse(JSON.stringify(initialStateClean));
    // Se inicializa el useReduce y se le pasa el reducer y el estado inicial que es una copia profunda del limpio
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
                                dispatch={dispatch}  // Se pasa directamente dispatch para hacer uso de él desde el componente de Menu
                                actionA={"actionBreak"}
                                actionB={"actionLunch"}
                            />
                            <TakingOrders
                                // props sirve para pasar  información de App a un componente mas pequeño en este caso takingOrders
                                initialState = {initialState}   
                                state = {state}
                                menuData={state.menuData}
                                menuState={state.menuState}
                                // dispatch se le añade a la función que toma el tipo de caso y se encarga de capturar valores
                                on_change={e => dispatch({ type: "changeValue", value: e.target.value, item: e.target.name})}//
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