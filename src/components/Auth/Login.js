import React, { Component } from "react"; 
import {connect} from "react-redux"; 
import {login} from "../../redux/reducers/users"; 

class Login extends Component {
    constructor(props) {
        super(props)

       this.state = {
           email: "", 
           password: ""
       }
    }

    handleLogin = e => {
        e.preventDefault()
        this.props.login(this.state).then(() => {
            this.props.redirect()
        }).catch(err => {
            console.log("login error: ", err)
        })
    }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        return (
            <div className="login-container">
                <form onSubmit={this.handleLogin} className="auth-form">
                    <label htmlFor="email">email: </label>
                    <input
                        name="email"
                        type="text"
                        value={this.state.email}
                        onChange={this.handleChange}
                        placeholder="enter your email..."
                    />


                    <label htmlFor="password">password: </label>
                    <input
                        name="password"
                        type="text"
                        value={this.state.password}
                        onChange={this.handleChange}
                        placeholder="enter your password..."
                    />

                    <button>sign in</button>
                </form> 

                <p>Don't have an account?</p>
                <button onClick={this.props.toggle}>sign up</button>
            </div>
        )
    }
}

export default connect(null, {login})(Login)