import React, { Component } from "react";
import ListProductsComponent from './ListProductsComponent';
import axios from 'axios';
import AuthenticationService from '../Authentication/AuthenticationService';


 
class Basket extends React.Component {

  createBasicAuthToken(username, password) {
    return 'Basic ' + window.btoa(username + ":" + password)
}
proceed()
{    
  axios.post('http://localhost:8080/api/basketfromfront',{"items" : this.props.chosenItems, "user":AuthenticationService.getLoggedInUserName()},
      { headers: { authorization: AuthenticationService.getLoggedInToken() } }).then((response) => {
        this.props.setState();
        ///
        this.props.history.push('/summary')

      }).catch((ResourceNotFoundException) => {
        this.props.history.push('/')
        window.location.reload(false);
        alert("Następnym razem bądź szybszy!")
    });
}
      render() {
        const items = this.props.chosenItems;
                return (
            <div><h2>W koszyku jest:</h2>
            {items ? (
        <div>
            {items.map(item =>
              <div key={item.id}>
                {item.name}, cena jenostkowa:{item.price}zł, szt: {item.quantity}, suma: {item.quantity * item.price}
              </div>
            )}
            <button onClick={() => this.proceed()}>Przejdz dalej!</button>
        </div>) : ("Ale tu pusto")}
        </div>
        
        );
      }
    }
export default Basket;