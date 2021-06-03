
import React, { Component } from 'react'
import axios from 'axios';
import ProductsService from '../Services/ProductsService'

class RegisterComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            font: 'black'

        }
        this.saveUser = this.saveUser.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount(){
        var font = localStorage.getItem('layout')
        console.log(font);
        this.setState({font: font})
        }
    saveUser = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/api/adduser',{"username" : this.state.username, "password" : this.state.password })
        this.props.history.push('/login');

    }
    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    
    cancel() {
        this.props.history.push('/login');
    }

    render() {
        return (
            <div>
                <div classNAme="container" style={{color: this.state.font}}>
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <h3 className="text-center">Zarejestruj sie:</h3>


                            <div classname="card-body">
                                <form>

                                    <div className="form-group">
                                        <label> Username: </label>
                                        <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.changeUsernameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.changePasswordHandler} />
                                    </div>
                                    <button className="btm btn-success" onClick={this.saveUser}>Save</button>
                                    <button className="btm btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default RegisterComponent