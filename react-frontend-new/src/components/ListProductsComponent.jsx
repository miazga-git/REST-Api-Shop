import React, { Component } from 'react'
import ProductsService from '../Services/ProductsService'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch,
} from "react-router-dom";
import Basket from '../components/Basket'
import AuthenticatedRoute from '../Authentication/AuthenticatedRoute';


class ListProductsComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chosenItems: [], // tutaj sa wybrane przez uzytkownika
            items: [], // tutaj sa wszystkie dostepne w sklepie przedmioty
            font: 'black'
        }
    }

    componentDidMount() {
    var font = localStorage.getItem('layout')
    console.log(font);
    this.setState({font: font})
        ProductsService.getProducts().then((res) => {
            this.setState({ items: res.data });
        });

    }
    handleCallback = (childData) => {
        this.setState({ chosenItems: childData })
    }
    buyProduct(item) { //tutaj dzieje sie czarna magia
        let item_copy = {};//tworze sobie pusta zmienna
        for (let key in item) {
            item_copy[key] = item[key]; //tutaj kopiuje zawartosci wszyskich pol obiektu
        }
        item_copy.quantity = 1; // ustawiam ilosc w skopiowanej na 1
        var found = false; // zmienna pomocnicza
        for (var i = 0; i < this.state.chosenItems.length; i++) { //lece po wszystkich obiektach 
            if (item_copy.id === this.state.chosenItems[i].id) //jeli wybrany obiekt jest juz na liscie 
            {
                this.state.chosenItems[i].quantity++;
                this.setState({
                    chosenItems: [...this.state.chosenItems]
                })//zwiekszam quantity i ustawiam flage na true i wychodze z petli
                found = true;
            }
        }
        if (this.state.chosenItems.length == 0 || found == false) //jesli nie znalazlo (bo nie byl dodany jeszcze wczesniej) lub nic nie ma w tablicy
        {
            this.setState({
                chosenItems: [...this.state.chosenItems, item_copy] //to po prostu dodaje
            })
        }
    }
    setRedLayout(){
        localStorage.setItem('layout', 'red');
    }
    setBlackLayout(){
        localStorage.setItem('layout', 'black');
    }

    render() {
        const { items, chosenItems } = this.state;
        return (
            <div style={{color: this.state.font}}>
                <button style={{ marginTop: "20px", marginLeft: "-15px", marginBottom: "40px" }} className="btn btn-outline-info"> <Link to="/login">Login</Link></button>
                <button style={{ marginTop: "20px", marginLeft: "900px", marginDown: "20px", marginBottom: "40px" }} className="btn btn-outline-info"><Link to="/Summary">View your profile</Link></button>
                <button style={{ marginTop: "20px", marginLeft: "-1035px", marginDown: "20px", marginBottom: "40px" }} className="btn btn-outline-info"><Link to="/register">Register</Link></button>
                {this.state.font === 'black' ? (<button onClick={() => this.setRedLayout()} className="btn btn-info">Bad eyesight? Change layout!</button>) : (<button onClick={() => this.setBlackLayout()} className="btn btn-info">Return to black</button>)}
                
                <Router>
                    <div className="container">
                        <ul>
                            <button style={{ marginTop: "-108px", marginLeft: "825px", marginBottom: "40px" }} className="btn btn-outline-info"><Link to="/basket">Basket</Link></button>
                        </ul>
                        <AuthenticatedRoute path="/basket" render={(routeProps) => <Basket {...routeProps} chosenItems={this.state.chosenItems} setState={state => this.setState({ chosenItems: state })} history={this.props.history} />} />
                    </div>
                </Router>
                <h2 className="text-center">Product List </h2>

                <div className="row">
                    <table className="table table-striped table-bordered">

                        <thead>
                            <tr>
                                <th style={{color: this.state.font}} >Product Name</th>
                                <th style={{color: this.state.font}} >Product Price</th>
                                <th style={{color: this.state.font}} >Product Quantity</th>
                                <th style={{color: this.state.font}} >Product Image</th>
                                <th style={{color: this.state.font}} >Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                items.map(
                                    item =>
                                        <tr key={item.id}>
                                            <td style={{color: this.state.font}} >{item.name}</td>
                                            <td style={{color: this.state.font}} >{item.price}</td>
                                            <td style={{color: this.state.font}} >{item.quantity}</td>

                                            <td style={{color: this.state.font}} ><img src={item.url} className="photo" /></td>
                                            <td>
                                                <button onClick={() => this.buyProduct(item)} className="btn btn-info">Add to Cart</button>
                                            </td>
                                        </tr>
                                )
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        )
    }
}

export default ListProductsComponent;