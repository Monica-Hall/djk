import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom"; 
import Header from "./components/Header/Header"; 
import Auth from "./components/Auth/Auth"; 
import Dashboard from "./components/Dashboard/Dashboard"; 
import Form from "./components/Form/Form"; 
import Tip from "./components/Tip/Tip"; 

function App() {
  return (
    <div className="App">
     <Header />
     <Switch >
       <Route exact path="/" component={Auth}/>
       <Route path="/form" component={Form}/>
       <Route path="/dashboard" component={Dashboard}/> 
       <Route path="/payment" component={Tip}/>
     </Switch>
    </div>
  );
}

export default App;
