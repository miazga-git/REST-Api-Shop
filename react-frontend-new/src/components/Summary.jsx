import React, { Component } from "react";
import ListProductsComponent from './ListProductsComponent';
import axios from 'axios';
import AuthenticationService from '../Authentication/AuthenticationService';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
}from "react-router-dom";


 
class Summary extends Component {
    constructor(props) {
        super(props)
        this.state = {
            baskets: [],
            details: [],
            city: '',
            street: '',
            zip: '',
            state: '',
            nameAndSurname: ''
        }
        this.handleChange = this.handleChange.bind(this)
    }
    async componentDidMount() {
      var basketDistinct = [];
      var basketIds = [];
      var temp;
      const url = 'http://localhost:8080/api/getalluserscarts/'+AuthenticationService.getLoggedInUserName()
      axios.get(url,{ headers: { authorization: AuthenticationService.getLoggedInToken() } })
      .then((response) => {
        console.log(response.data);
        this.setState({details: response.data});
        for (var i = 0; i < response.data.length; i++){
          temp = response.data[i].basket;
          
          if(basketIds.indexOf(temp.id) < 0)
          {
            basketDistinct.push(temp);
            basketIds.push(temp.id);
          }
        }

        for (var i = 0; i <basketDistinct.length ; i++){
          for (var j = 0; j < response.data.length; j++ ){
            for (var z = 0; z < basketDistinct[i].items.length; z++ ){
              if (basketDistinct[i].id == this.state.details[j].basket.id && basketDistinct[i].items[z].id == this.state.details[j].item.id)
              basketDistinct[i].items[z].quantity = this.state.details[j].quantity;
            }
          }
        }

        console.log(basketDistinct);
        this.setState({baskets: basketDistinct})
      });
         
 }
    
    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    pay(id)
    {
      var newBaskets = this.state.baskets;
      var token = 1;
      var state = this.state.state;
      var city = this.state.city;
      var street = this.state.street;
      var zip = this.state.zip;
      var nameAndSurname = this.state.nameAndSurname;
      const url = 'http://localhost:8080/api/payfororder/'+id+'/'+token+'/'+state+'/'+city+'/'+street+'/'+zip+'/'+nameAndSurname;
      for(var i = 0; i < this.state.baskets.length; i++)
      {
        if(id === newBaskets[i].id)
        {
          if(city.length === 0  || street.length === 0 || state.length === 0 || zip.length === 0){
            alert("Ojojoj")
            return;
          }
          else{
            axios.put(url,{ headers: { authorization: AuthenticationService.getLoggedInToken() } })
            newBaskets[i].isPaid = 1;
          token = newBaskets[i].isPaid;
          }
          
          //implementacja tokenu zwrotnego np. z PayU bedzie unikalny integer dla kazdej transkacji
          // teraz 1 znaczy ze zaplacony
        }
      }
      this.setState({baskets: newBaskets});
        console.log(newBaskets)
        

      
      
    }
    delete(id){
      const url = 'http://localhost:8080/api/deleteorder/'+id;
      axios.get(url,{ headers: { authorization: AuthenticationService.getLoggedInToken() } })
      window.location.reload(false);
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }
      render() {
        const {baskets,details} = this.state;
    
          return (
              <div>
                  <Link to="/">Go back to the store</Link>  
            <div style={{ marginTop: "10px", marginBottom: "10px" }} classNAme="container">
  
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <h3 className="text-center">Shipping Informations:</h3>

                            <div classname="card-body">
                                         <label> Name and surname: </label>
                                         <input placeholder="Name and surname" name="nameAndSurname" className="form-control" value={this.state.nameAndSurname} onChange={this.handleChange} />

                                         <label> State: </label>
                                         <input placeholder="State" name="state" className="form-control" value={this.state.state} onChange={this.handleChange} />

                                         <label> City: </label>
                                         <input placeholder="City" name="city" className="form-control" value={this.state.city} onChange={this.handleChange} />
                                    
                                    
                                         <label> Street: </label>
                                         <input placeholder="Street" name="street" className="form-control" value={this.state.street} onChange={this.handleChange} />


                                         <label> Zip: </label>
                                         <input placeholder="Zip" name="zip" className="form-control" value={this.state.zip} onChange={this.handleChange} />
    
                                   
                                
                            </div>
                        </div>
                    </div>
                </div>
 
        {baskets.map(basket => {
          if (basket.deleted === false)
          return(
            <div key={basket.id}>
            {basket.user}
                        { basket.items.map(item =>
                            <div key={item.id}>
                            {item.name} {item.price} ilosc {item.quantity}
                            </div>
                            )}{basket.isPaid == 0 ? (<button onClick={() => this.pay(basket.id)}>Opłać</button>):("Opłacono")}
                            {basket.deleted == false && basket.isPaid === 0? (<button onClick={() => this.delete(basket.id)}>Skasuj</button>):("")}
                          
              </div>
          )}
            )}
       
         
                
            </div>
        );
      }
    }
export default Summary;