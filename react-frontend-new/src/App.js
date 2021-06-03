import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import FooterComponent from './components/FooterComponent';
import HeaderComponent from './components/HeaderComponent';
import ListProductsComponent from './components/ListProductsComponent';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import Summary from './components/Summary';
function App() {
  return (
      <div>
          <Router>
            
              <HeaderComponent />
                  <div className="container">
                    <Switch>
                      <Route path="/" exact component={ListProductsComponent} ></Route>
                      <Route path="/iteminfo/:id" component={ListProductsComponent} ></Route>
                      <Route path="/iteminfo" component={ListProductsComponent} ></Route>
                      <Route path="/login" component={LoginComponent} ></Route>
                      <Route path="/register" component={RegisterComponent} ></Route>
                      <Route path="/summary" component={Summary} ></Route>
                      {/*<img src={logo} className="App-logo" alt="logo" />*/}

                      
                      </Switch>
                  </div>
              <FooterComponent/>
           </Router>
    </div>
  );
}

export default App;
