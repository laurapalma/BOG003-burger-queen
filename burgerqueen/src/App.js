import React from 'react';
import Header from './components/header/header';
import Menu from './components/menus/menus';
import TableStatus from './components/tableStatus/tableStatus';
import TakingOrders from './components/takingOrders/takingOrders';
import Kitchen from './components/kitchen/kitchen';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

function App() {
    return(
        <Router>
             <div>
                <Header />
                <Switch>
                    <Route path='/mesero'>
                        <Menu />
                        <TakingOrders />
                        <TableStatus />
                    </Route>
                    <Route path='/cocina'>
                        <Kitchen />
                    </Route>
                    <Route path='/'>
                        <Menu />
                        <TakingOrders />
                        <TableStatus />
                    </Route>
                </Switch>
            </div>
        </Router>
    )
}

export default App;