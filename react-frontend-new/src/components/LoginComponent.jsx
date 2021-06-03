
/*import React, { Component } from 'react'
import UserService from '../Services/UserService'

class LoginComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            username: '',
            password: '',
            fullName: '',
            street: '',
            city: ''

        }
        this.saveUser = this.saveUser.bind(this);
        this.changeUsernameHandler = this.changeUsernameHandler.bind(this);
        this.changePasswordHandler = this.changePasswordHandler.bind(this);
        this.changeFullNameHandler = this.changeFullNameHandler.bind(this);
        this.changeStreetHandler = this.changeStreetHandler.bind(this);
        this.changeCityHandler = this.changeCityHandler.bind(this);
        this.cancel = this.cancel.bind(this);
        this.goToRegistrationForm = this.goToRegistrationForm.bind(this);
    }
    componentDidMount() {

    }
    saveUser = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username, password: this.state.password, fullname: this.state.fullname,
            street: this.state.street, city: this.state.city
        };
        console.log('user=>' + JSON.stringify(user));
        return UserService.authenticateUser(user).then(res => {
            this.props.history.push('/iteminfo');
        });

    }
    changeUsernameHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    changePasswordHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    changeFullNameHandler = (event) => {
        this.setState({ fullName: event.target.value });
    }
    changeStreetHandler = (event) => {
        this.setState({ street: event.target.value });
    }
    changeCityHandler = (event) => {
        this.setState({ city: event.target.value });
    }
    cancel() {
        this.props.history.push('/iteminfo');
    }
    goToRegistrationForm() {
        this.props.history.push('/register');
    }

    render() {
        return (
            <div>
                <div classNAme="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            
                                <h3 className="text-center">Zaloguj sie:</h3>
                            

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
                                    <div className="form-group">
                                        <label> Fullname: </label>
                                        <input placeholder="FullName" name="fullName" className="form-control" value={this.state.fullName} onChange={this.changeFullNameHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Street: </label>
                                        <input placeholder="Street" name="street" className="form-control" value={this.state.street} onChange={this.changeStreetHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> City: </label>
                                        <input placeholder="City" name="city" className="form-control" value={this.state.city} onChange={this.changeCityHandler} />
                                    </div>
                                   
                                    <button className="btm btn-success" onClick={this.saveUser}>Save</button>
                                    <button className="btm btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                    <button className="btm btn-success" onClick={this.goToRegistrationForm}>Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent
*/

// nie chce usuwac, a u mnie dziala to troche inaczej

import React, { Component } from 'react'
import AuthenticationService from '../Authentication/AuthenticationService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: '',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,
            font: 'black'
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
        this.cancel = this.cancel.bind(this);
    }
    componentDidMount(){
    var font = localStorage.getItem('layout')
    console.log(font);
    this.setState({font: font})
    }
    cancel() {
        this.props.history.push('/');
    }
    handleChange(event) {
        this.setState(
            {
                [event.target.name]
                    : event.target.value
            }
        )
    }

    loginClicked() {
		AuthenticationService
		.executeBasicAuthenticationService(this.state.username, this.state.password)
		.then(() => {
			AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
			this.props.history.push('/')
		}).catch(() => {
			this.setState({ showSuccessMessage: false })
			this.setState({ hasLoginFailed: true })
		})
      }
    
    /*            <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Błędne dane logowania</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
            </div>
             //////// <button className="btm btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
*/
    render() {
        return (

            ///
            <div>
                <div classNAme="container" style={{color: this.state.font}}>
  
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">

                            <h3 className="text-center">Login:</h3>


                            <div classname="card-body">
                                

                                    
                                        {this.state.hasLoginFailed && <div className="alert alert-warning">Błędne dane logowania</div>}
                                        {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                                        <label> Username: </label>
                                        <input placeholder="Username" name="username" className="form-control" value={this.state.username} onChange={this.handleChange} />
                                    
                                    
                                        <label> Password: </label>
                                        <input placeholder="Password" name="password" className="form-control" value={this.state.password} onChange={this.handleChange} />
                                    
                                <button style={{ marginTop: "20px", marginBottom: "10px" }} className="btm btn-success" onClick={this.loginClicked}>Login</button>
                                <button className="btm btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                   
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
             /* <div>
                <h1>Login</h1>
                <div className="container">
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Błędne dane logowania</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                    Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                    <button className="btn btn-success" onClick={this.loginClicked}>Login</button>
                </div>
                 <button className="btm btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
            </div>*/
        );
    }
}

export default LoginComponent